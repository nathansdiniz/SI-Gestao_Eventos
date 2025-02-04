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
  userID?: string; // Isso será adicionado automaticamente
}

export const addUpdateEmpresas = async (params: ParametrosEmpresas) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

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
      create: dataToSave,
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
    // Criar novo registro se o ID não existir
    await db.empresas.create({
      data: dataToSave,
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
