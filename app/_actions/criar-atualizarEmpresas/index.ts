"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Novo_UP_historicoLogs } from "../historicosLogs";

interface ParametrosEmpresas {
  id?: number; // Deixa como opcional, pois pode ser um novo registro
  email: string;
  empresa: string;
  cnpj: string;
  ramo_empresa: string;
  localizacao_empresa: string;
  data_created?: Date;
  data_updated?: Date;
  gestor_responsavel: string;
  site: string;
  telefone: string;
  dataAbertura: Date;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  userID?: string; // Isso será adicionado automaticamente
}

export const addUpdateEmpresas = async (params: ParametrosEmpresas) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  console.log(params.id);
  const maxIdRecord = await db.empresas.findFirst({
    orderBy: {
      id: "desc", // Ordena pelo id em ordem decrescente
    },
    select: {
      id: true,
    },
  });
  const nextId = maxIdRecord ? maxIdRecord.id + 1 : 1; // Se não houver id, começa com 1

  // Preenchendo os campos obrigatórios
  const dataToSave = {
    ...params,
    userID: userId,
    data_created: params.data_created || new Date(),
    data_updated: new Date(),
    id: params.id,
  };

  if (params.id) {
    // Atualizar ou inserir se o ID existir
    await db.empresas.upsert({
      where: {
        id: params.id,
      },
      update: dataToSave,
      create: { ...dataToSave, id: nextId },
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Atualizar Empresa",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Atualizar Empresa ID: ${dataToSave.id} e Empresa:  ${dataToSave.empresa}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  } else {
    const maxIdRecord = await db.empresas.findFirst({
      orderBy: {
        id: "desc", // Ordena pelo id em ordem decrescente
      },
      select: {
        id: true,
      },
    });

    // Define o próximo id
    const nextId = maxIdRecord ? maxIdRecord.id + 1 : 1; // Se não houver id, começa com 1
    // Criar novo registro se o ID não existir
    await db.empresas.create({
      data: { ...dataToSave, id: nextId },
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Criar Empresa",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Criar Empresa ID: ${dataToSave.id} e Empresa:  ${dataToSave.empresa}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  }

  revalidatePath("/administrativo/empresas");
};

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getEmpresas() {
  return await prisma.empresas.findMany();
}

export const deleteEmpresa = async (id: number) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    console.log(id);
    await db.empresas.delete({
      where: { id: id },
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Excluir Empresa",
      dados_acao: { id },
      datahora_alteracao: new Date(),
      Descricao: `Excluir Empresa ID: ${id}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
    revalidatePath("/administrativo/empresas");
    return { success: true };
  } catch (error) {
    await Novo_UP_historicoLogs({
      acao_realizada: "Erro ao Excluir Empresa",
      dados_acao: { id },
      datahora_alteracao: new Date(),
      Descricao: `Erro ao Excluir Empresa ID: ${id} Erro ${error}`,
      HistoricoLogscol: "",
      status: "Falha",
    });
    return { success: false, error: "Erro ao excluir empresa" };
  }
};
