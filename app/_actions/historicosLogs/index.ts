"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface HistoricoLogsProps {
  idHistoricoLogs?: number; // Opcional para diferenciar criação/atualização
  Descricao: string;
  status: string;
  acao_realizada: string;
  dados_acao: any;
  datahora_alteracao: Date;
  HistoricoLogscol: string;
  userID?: string; // Será preenchido com o ID do usuário autenticado
}

export const Novo_UP_historicoLogs = async (params: HistoricoLogsProps) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { idHistoricoLogs, ...rest } = params;
  const maxIdRecord = await db.historicoLogs.findFirst({
    orderBy: {
      idHistoricoLogs: "desc", // Ordena pelo id em ordem decrescente
    },
    select: {
      idHistoricoLogs: true,
    },
  });
  const nextId = maxIdRecord ? maxIdRecord.idHistoricoLogs + 1 : 1; // Se não houver id, começa com 1

  if (idHistoricoLogs) {
    // Atualizar registro existente
    await db.historicoLogs.upsert({
      where: {
        idHistoricoLogs,
      },
      update: {
        ...rest,
        userID: userId,
      },
      create: {
        ...rest,
        idHistoricoLogs: nextId,
        userID: userId,
      },
    });
  } else {
    // Criar novo registro (sem idHistoricoLogs)
    await db.historicoLogs.create({
      data: {
        ...rest,
        idHistoricoLogs: nextId,
        userID: userId,
      },
    });
  }

  revalidatePath("config/historico-logs");
};

export const ConsultaHistoricoLogs = async () => {
  const dados = await db.historicoLogs.findMany();
  console.log(dados);
  return dados;
};
