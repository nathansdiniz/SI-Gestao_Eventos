"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Buscar eventos
export const fetchEventoInforGerais = async () => {
  return await prisma.eventosInforGerais.findMany();
};

// Adicionar InforGerais
export const adicionarInforGerais = async (InforGerais: any) => {
  const maxIdRecord = await prisma.eventosInforGerais.findFirst({
    orderBy: {
      id: "desc", // Ordena pelo id em ordem decrescente
    },
    select: {
      id: true,
    },
  });

  // Define o próximo id
  const nextId = maxIdRecord ? maxIdRecord.id + 1 : 1; // Se não houver id, começa com 1
  return await prisma.eventosme.create({
    data: { ...InforGerais, id: nextId },
  });
};

// Atualizar InforGerais
export const criar_atualizarEventoInforGerais = async (InforGerais: any) => {
  return await prisma.eventosInforGerais.upsert({
    where: { id: InforGerais.id },
    update: InforGerais,
    create: InforGerais,
  });
};

// Excluir InforGerais
export const excluirEvento = async (id: number) => {
  return await prisma.eventosInforGerais.delete({ where: { id } });
};

export async function dadosInforGerais(id: number) {
  const dadosEvento = await prisma.eventosInforGerais.findFirst({
    where: {
      id_eventos: Number(id),
    },
  });
  return dadosEvento;
}
