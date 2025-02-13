"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Novo_UP_historicoLogs } from "../historicosLogs";

interface FornecedoresProps {
  idfornecedores: number;
  nome_fornecedor: string | null;
  cnpj_fornecedor: string;
  tipo_fornecedor: string | null;
  representante_responsavel: string | null;
  localizacao_fornecedor: string | null;
  telefone_fornecedor: string | null;
  email_fornecedor: string | null;
  data_contratada: Date | null;
  data_termino: Date | null;
  data_criacao: Date | null;
  data_atualizacao: Date | null;
  userID: string | null;
}

export const addUpdateFornecedores = async (params: FornecedoresProps) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Consultar o maior id existente na tabela
  const maxIdRecord = await db.fornecedores.findFirst({
    orderBy: {
      idfornecedores: "desc", // Ordena pelo idfornecedores em ordem decrescente
    },
    select: {
      idfornecedores: true,
    },
  });

  // Define o próximo id
  const nextId = maxIdRecord ? maxIdRecord.idfornecedores + 1 : 1; // Se não houver id, começa com 1

  // Preenchendo os campos obrigatórios
  const { idfornecedores, ...rest } = params;
  const dataToSave = {
    ...rest,
    userID: userId,
    data_criacao: new Date(),
    data_atualizacao: new Date(),
    idfornecedores: idfornecedores ?? nextId, // Se o idfornecedores não for passado, usa o próximo id
  };

  if (idfornecedores) {
    // Atualizar ou inserir se o ID existir
    await db.fornecedores.upsert({
      where: { idfornecedores },
      update: dataToSave,
      create: {
        ...rest,
        userID: userId,
        data_criacao: new Date(),
        idfornecedores: nextId, // Se o idfornecedores não for passado, usa o próximo id
      }, // Inclui 'idfornecedores' ao criar
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Atualizar Fornecedor",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Atualizar Fornecedor ID: ${dataToSave.idfornecedores} e Nome: ${dataToSave.nome_fornecedor}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  } else {
    // Criar novo registro se o ID não existir
    await db.fornecedores.create({
      data: {
        ...rest,
        userID: userId,
        data_criacao: new Date(),
        idfornecedores: nextId, // Se o idfornecedores não for passado, usa o próximo id
      }, // Inclui 'idfornecedores' como numérico, agora garantido
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Cadastro de Fornecedor",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Criar Fornecedor ID: ${dataToSave.idfornecedores} e Nome: ${dataToSave.nome_fornecedor}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  }

  revalidatePath("/administrativo/Fornecedores");
};
