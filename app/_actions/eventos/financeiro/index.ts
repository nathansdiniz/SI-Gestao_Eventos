"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Buscar FinanceiroEvento
export const fetchFinanceiroEvento = async () => {
  return await prisma.financeiroEventos.findMany();
};
export const obterEventos = async (idEvento: number) => {
  return await prisma.eventosme.findUnique({
    where: { id: Number(idEvento) },
  });
};

export const obterFinanceiroEvento = async (idevento: string | null) => {
  return await prisma.financeiroEventos.findMany({
    where: {
      idevento: idevento,
    },
  });
};
// Adicionar Financeiroevento
export const adicionarFinanceiroEvento = async (Financeiroevento: any) => {
  const maxIdRecord = await prisma.financeiroEventos.findFirst({
    orderBy: {
      id: "desc", // Ordena pelo id em ordem decrescente
    },
    select: {
      id: true,
    },
  });

  // Define o próximo id
  const nextId = maxIdRecord ? maxIdRecord.id + 1 : 1; // Se não houver id, começa com 1
  return await prisma.financeiroEventos.create({
    data: { ...Financeiroevento, id: nextId },
  });
};

export const adicionarAtualizarFinanceiroEvento = async (
  Financeiroevento: any,
) => {
  const maxIdRecord = await prisma.financeiroEventos.findFirst({
    orderBy: {
      id: "desc", // Ordena pelo id em ordem decrescente
    },
    select: {
      id: true,
    },
  });

  // Define o próximo id
  const nextId = maxIdRecord ? maxIdRecord.id + 1 : 1; // Se não houver id, começa com 1
  return await prisma.financeiroEventos.upsert({
    where: { id: Financeiroevento.id },
    update: { ...Financeiroevento, id: Financeiroevento.id },
    create: { ...Financeiroevento, id: nextId },
  });
};

// Atualizar Financeiroevento
export const atualizarFinanceiroEvento = async (Financeiroevento: any) => {
  return await prisma.financeiroEventos.update({
    where: { id: Financeiroevento.id },
    data: Financeiroevento,
  });
};

// Excluir Financeiroevento
export const excluirFinanceiroEvento = async (id: number) => {
  return await prisma.financeiroEventos.delete({ where: { id } });
};

export async function getEventFinanceiroData(id: number) {
  const dadosEvento = await prisma.financeiroEventos.findFirst({
    where: {
      id: id,
    },
  });
  return dadosEvento;
}
