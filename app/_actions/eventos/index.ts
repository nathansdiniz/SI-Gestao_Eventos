"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Buscar eventos
export const fetchEventos = async () => {
  return await prisma.eventosme.findMany();
};

// Adicionar evento
export const adicionarEvento = async (evento: any) => {
  const maxIdRecord = await prisma.eventosme.findFirst({
    orderBy: {
      id: "desc", // Ordena pelo id em ordem decrescente
    },
    select: {
      id: true,
    },
  });

  // Define o próximo id
  const nextId = maxIdRecord ? maxIdRecord.id + 1 : 1; // Se não houver id, começa com 1
  return await prisma.eventosme.create({ data: { ...evento, id: nextId } });
};

// Atualizar evento
export const atualizarEvento = async (evento: any) => {
  return await prisma.eventosme.update({
    where: { id: evento.id },
    data: evento,
  });
};

// Excluir evento
export const excluirEvento = async (id: number) => {
  return await prisma.eventosme.delete({ where: { id } });
};
