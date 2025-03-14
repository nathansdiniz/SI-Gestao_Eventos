"use server";
import { db } from "@/app/_lib/prisma";
import { Agenda } from "@/app/agenda/layout-agenda";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

interface Evento {
  idAgendaGeral?: number;
  titulo_agenda: string;
  datahora_inicial: string;
  datahora_final: string;
  localizacao?: string;
  informacoes_extras?: string;
  status_compromisso?: string;
  userID?: string;
  id_empresa?: number;
  responsavel_agenda?: string;
}
const { userId } = auth();
if (!userId) {
  throw new Error("Unauthorized");
}
const user = await clerkClient.users.getUser(userId);
const publicMetadata = user?.publicMetadata;
const idEmpresa = Number(publicMetadata?.idEmpresa) || null;

export const dadosAgenda = async () => {
  if (publicMetadata) {
    const where = { id_empresa: idEmpresa !== 1 ? idEmpresa : undefined };
    const dados = await db.agendaGeral.findMany({ where: where });
    return dados;
  }
  const dados = await db.agendaGeral.findMany();
  return dados;
};

export const adicionarEvento = async (evento: Evento) => {
  const maxIdRecord = await db.agendaGeral.findFirst({
    orderBy: {
      idAgendaGeral: "desc", // Ordena pelo id em ordem decrescente
    },
    select: {
      idAgendaGeral: true,
    },
  });

  // Define o próximo id
  const nextId = maxIdRecord ? maxIdRecord.idAgendaGeral + 1 : 1; // Se não houver id, começa com 1

  return await prisma.agendaGeral.create({
    data: {
      idAgendaGeral: nextId,
      titulo_agenda: evento.titulo_agenda,
      datahora_inicial: new Date(evento.datahora_inicial),
      datahora_final: new Date(evento.datahora_final),
      localizacao: evento.localizacao,
      informacoes_extras: evento.informacoes_extras,
      status_compromisso: evento.status_compromisso,
      userID: userId,
      id_empresa: 1,
      data_criacao: new Date(),
      responsavel_agenda: evento.responsavel_agenda,
      data_atualizacao: new Date(),
    },
  });
};

export const atualizarEvento = async (evento: Evento) => {
  return await prisma.agendaGeral.update({
    where: { idAgendaGeral: evento.idAgendaGeral },
    data: {
      titulo_agenda: evento.titulo_agenda,
      datahora_inicial: new Date(evento.datahora_inicial),
      datahora_final: new Date(evento.datahora_final),
      localizacao: evento.localizacao,
      informacoes_extras: evento.informacoes_extras,
      userID: userId,
      id_empresa: 1,
      data_atualizacao: new Date(),
      responsavel_agenda: evento.responsavel_agenda,
      status_compromisso: evento.status_compromisso,
    },
  });
};
export const excluirAgenda = async (idAgendaGeral: number) => {
  try {
    await db.agendaGeral.delete({
      where: { idAgendaGeral: idAgendaGeral },
    });

    revalidatePath("/agenda"); // Atualiza a página após a exclusão
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir agenda:", error);
    return { success: false, error: "Erro ao excluir agenda" };
  }
};

export const excluirEvento = async (id: number) => {
  return await prisma.agendaGeral.delete({
    where: { idAgendaGeral: id },
  });
};

export const atualizarAgenda = async (evento: Agenda) => {
  return await prisma.agendaGeral.update({
    where: { idAgendaGeral: evento.idAgendaGeral },
    data: {
      ...evento,
      titulo_agenda: evento.titulo_agenda,
      datahora_inicial: new Date(evento.datahora_inicial ?? ""),
      datahora_final: new Date(evento.datahora_final ?? ""),
      localizacao: evento.localizacao,
      informacoes_extras: evento.informacoes_extras,
      userID: userId,
      id_empresa: 1,
      data_atualizacao: new Date(),
      responsavel_agenda: evento.responsavel_agenda,
      status_compromisso: evento.status_compromisso,
    },
  });
};
