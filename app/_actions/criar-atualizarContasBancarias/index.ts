"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Novo_UP_historicoLogs } from "../historicosLogs";

interface ContasBancariasProps {
  id: number;
  nomeConta: string;
  banco: string;
  tipo_conta: string;
  agencia: string;
  conta: string;
  saldoBancario: number | null;
  totalEntradas: number | null;
  totalSaidas: number | null;
  ultima_atualizacao_saldo: Date;
  data_criacao: Date;
  data_atualizacao: Date;
  userID: string | null;
  id_empresa: number;
}

export const addUpdateContasBancarias = async (
  params: ContasBancariasProps,
) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Consultar o maior id existente na tabela
  const maxIdRecord = await db.contasBancarias.findFirst({
    orderBy: {
      id: "desc", // Ordena pelo id em ordem decrescente
    },
    select: {
      id: true,
    },
  });

  // Define o próximo id
  const nextId = maxIdRecord ? maxIdRecord.id + 1 : 1; // Se não houver id, começa com 1

  // Preenchendo os campos obrigatórios
  const { id, ...rest } = params;
  const dataToSave = {
    ...rest,
    userID: userId,
    data_criacao: new Date(),
    data_atualizacao: new Date(),
    ultima_atualizacao_saldo: new Date(),
    id: id ?? nextId, // Se o id não for passado, usa o próximo id
  };

  if (id > 0) {
    // Atualizar ou inserir se o ID existir
    await db.contasBancarias.upsert({
      where: { id },
      update: dataToSave,
      create: {
        ...rest,
        userID: userId,
        data_atualizacao: new Date(),
        ultima_atualizacao_saldo: new Date(),
        id: nextId, // Se o id não for passado, usa o próximo id
      }, // Inclui 'id' ao criar
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Atualizar Registro Financeiro",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Atualizar Registro Financeiro ID: ${dataToSave.id} e Conta:  ${dataToSave.nomeConta}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  } else {
    // Criar novo registro se o ID não existir
    await db.contasBancarias.create({
      data: {
        ...rest,
        userID: userId,
        data_atualizacao: new Date(),
        ultima_atualizacao_saldo: new Date(),
        id: nextId, // Se o id não for passado, usa o próximo id
      }, // Inclui 'id' como numérico, agora garantido
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Criar Registro Financeiro",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Criar Registro Financeiro ID: ${dataToSave.id} e Conta:  ${dataToSave.nomeConta}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  }

  revalidatePath("/administrativo/financeiro/contas-bancarias");
};
