"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Novo_UP_historicoLogs } from "../historicosLogs";

interface ParametrosFuncionarios {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  data_nascimento: Date;
  sexo: string;
  funcao: string;
  id_empresa: number;
  endereco: string;
  status: boolean;
  email: string;
  telefone: string;
  celular: string;
  data_start_funcao: Date;
  data_end_funcao: Date | null;
  data_updated_funcao: Date;
  data_created: Date;
  data_updated: Date;
  userID?: string | null; // Isso será adicionado automaticamente
}

export const addUpdateFuncionarios = async (params: ParametrosFuncionarios) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Consultar o maior id existente na tabela
  const maxIdRecord = await db.funcionarios.findFirst({
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
    data_created: new Date(),
    data_updated: new Date(),
    id: id ?? nextId, // Se o id não for passado, usa o próximo id
  };

  if (id) {
    // Atualizar ou inserir se o ID existir
    await db.funcionarios.upsert({
      where: { id },
      update: dataToSave,
      create: {
        ...rest,
        userID: userId,
        data_created: new Date(),
        data_updated: new Date(),
        id: nextId, // Se o id não for passado, usa o próximo id
      }, // Inclui 'id' ao criar
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Atualizar Funcionário ",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Atualizar Funcionario ID: ${dataToSave.id} e Nome:  ${dataToSave.nome}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  } else {
    // Criar novo registro se o ID não existir
    await db.funcionarios.create({
      data: {
        ...rest,
        userID: userId,
        data_created: new Date(),
        data_updated: new Date(),
        id: nextId, // Se o id não for passado, usa o próximo id
      }, // Inclui 'id' como numérico, agora garantido
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Criar Funcionário ",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Criar Funcionario ID: ${dataToSave.id} e Nome:  ${dataToSave.nome}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  }

  revalidatePath("/administrativo/funcionarios");
};
