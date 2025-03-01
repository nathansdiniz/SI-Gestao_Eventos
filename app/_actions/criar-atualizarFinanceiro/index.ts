"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Novo_UP_historicoLogs } from "../historicosLogs";
import { FinanceiroPropos } from "@/app/_props";

export const addUpdateFinanceiro = async (params: FinanceiroPropos) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Consultar o maior id existente na tabela
  const maxIdRecord = await db.financeiroME.findFirst({
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
    data_update: new Date(),
    id: id ?? nextId, // Se o id não for passado, usa o próximo id
    parcelas: rest.parcelas ? rest.parcelas : undefined,
    documentos_anexados: rest.documentos_anexados ?? undefined,
  };

  if (id) {
    // Atualizar ou inserir se o ID existir
    await db.financeiroME.upsert({
      where: { id },
      update: dataToSave,
      create: {
        ...rest,
        userID: userId,
        data_criacao: new Date(),
        data_update: new Date(),
        id: nextId, // Se o id não for passado, usa o próximo id
        parcelas: rest.parcelas ? rest.parcelas : undefined,
        documentos_anexados: rest.documentos_anexados ?? undefined,
      }, // Inclui 'id' ao criar
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Atualizar Registro Financeiro",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Atualizar Registro Financeiro ID: ${dataToSave.id} e Descrição:  ${dataToSave.descricao}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  } else {
    // Criar novo registro se o ID não existir
    await db.financeiroME.create({
      data: {
        ...rest,
        userID: userId,
        data_criacao: new Date(),
        data_update: new Date(),
        id: nextId, // Se o id não for passado, usa o próximo id
        parcelas: rest.parcelas ? rest.parcelas : undefined,
        documentos_anexados: rest.documentos_anexados ?? undefined,
      }, // Inclui 'id' como numérico, agora garantido
    });
    await Novo_UP_historicoLogs({
      acao_realizada: "Criar Registro Financeiro",
      dados_acao: dataToSave,
      datahora_alteracao: new Date(),
      Descricao: `Criar Registro Financeiro ID: ${dataToSave.id} e Descrição:  ${dataToSave.descricao}`,
      HistoricoLogscol: "",
      status: "Sucesso",
    });
  }

  revalidatePath("/administrativo/financeiro");
};

const minhasTransações = async () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const transactions = await db.financeiroME.findMany({
    where: { userID: userId },
    orderBy: { datacompetencia: "desc" },
  });
  const dadosConvertidos = transactions.map((dado) => ({
    ...dado,
    valor: dado.valor ? Number(dado.valor.toString()) : null,
    juros: dado.juros ? Number(dado.juros.toString()) : null,
    multa: dado.multa ? Number(dado.multa.toString()) : null,
    desconto: dado.desconto ? Number(dado.desconto.toString()) : null,
    documentos_anexados:
      typeof dado.documentos_anexados === "string"
        ? JSON.parse(dado.documentos_anexados)
        : dado.documentos_anexados,
    parcelas:
      dado.parcelas === 1
        ? 1
        : dado.parcelas &&
            typeof dado.parcelas === "string" &&
            dado.parcelas.trim() !== ""
          ? JSON.parse(dado.parcelas)
          : dado.parcelas,
    recorrencia:
      (dado.recorrencia as
        | "Nenhuma"
        | "Semanal"
        | "Mensal"
        | "Diaria"
        | "Quinzenal"
        | undefined) || "Nenhuma",
  }));
  return dadosConvertidos;
};

export const obterdados1Financeiro = async (id: number | null) => {
  console.log(id, "aquiiiiii");
  return await db.financeiroME.findMany({
    where: {
      id: Number(id),
    },
  });
};

export const FinancasEventoPagarReceber = async () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const ano = new Date().getFullYear();
  const transactions = await db.financeiroEventos.findMany({
    where: {
      datacompetencia: {
        gte: new Date(`${ano - 1}-06-01`).toISOString(), // Data inicial do mês
        lt: new Date(`${ano}-12-01`).toISOString(), // Data do próximo mês (exclusivo)
      },
      pago: "nao",
    },
    orderBy: { datacompetencia: "desc" },
  });
  const dadosConvertidos = transactions.map((dado) => ({
    ...dado,
    valor: dado.valor ? Number(dado.valor.toString()) : null,
    juros: dado.juros ? Number(dado.juros.toString()) : null,
    multa: dado.multa ? Number(dado.multa.toString()) : null,
    desconto: dado.desconto ? Number(dado.desconto.toString()) : null,
    documentos_anexados:
      typeof dado.documentos_anexados === "string"
        ? JSON.parse(dado.documentos_anexados)
        : dado.documentos_anexados,
    parcelas:
      dado.parcelas === 1
        ? 1
        : dado.parcelas &&
            typeof dado.parcelas === "string" &&
            dado.parcelas.trim() !== ""
          ? JSON.parse(dado.parcelas)
          : dado.parcelas,
    recorrencia:
      (dado.recorrencia as
        | "Nenhuma"
        | "Semanal"
        | "Mensal"
        | "Diaria"
        | "Quinzenal"
        | undefined) || "Nenhuma",
  }));
  return dadosConvertidos;
};
export const FinancasdoEvento = async () => {
  const transactions = await db.financeiroEventos.findMany({
    orderBy: { datacompetencia: "desc" },
  });
  const dadosConvertidos = transactions.map((dado) => ({
    ...dado,
    valor: dado.valor ? Number(dado.valor.toString()) : null,
    juros: dado.juros ? Number(dado.juros.toString()) : null,
    multa: dado.multa ? Number(dado.multa.toString()) : null,
    desconto: dado.desconto ? Number(dado.desconto.toString()) : null,
    documentos_anexados:
      typeof dado.documentos_anexados === "string"
        ? JSON.parse(dado.documentos_anexados)
        : dado.documentos_anexados,
    parcelas:
      dado.parcelas === 1
        ? 1
        : dado.parcelas &&
            typeof dado.parcelas === "string" &&
            dado.parcelas.trim() !== ""
          ? JSON.parse(dado.parcelas)
          : dado.parcelas,
    recorrencia:
      (dado.recorrencia as
        | "Nenhuma"
        | "Semanal"
        | "Mensal"
        | "Diaria"
        | "Quinzenal"
        | undefined) || "Nenhuma",
  }));
  return dadosConvertidos;
};

export default minhasTransações;
