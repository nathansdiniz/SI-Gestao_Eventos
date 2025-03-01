"use server";
import { db } from "@/app/_lib/prisma";

export const obterFinanceiroEventos = async () => {
  return await db.financeiroME.findMany();
};
export const obterFinanceiroGeral = async () => {
  return await db.financeiroME.findMany();
};

// Create the functions to get the data.
export const obterEventos = async () => {
  return await db.eventosme.findMany();
};

export const obterClientes = async () => {
  return await db.clientes.findMany();
};

export const obterFornecedores = async () => {
  return await db.fornecedores.findMany();
};
