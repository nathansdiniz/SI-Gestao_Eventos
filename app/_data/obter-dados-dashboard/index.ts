import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalGastosPorCategoria, TransacaoPorcentagemPorTipo } from "./types";
import { auth } from "@clerk/nextjs/server";

export const obterDashboard = async (mes: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Não autorizado.");
  }
  const where = {
    userId,
    date: {
      gte: new Date(`2025-${mes}/01`),
      lt: new Date(`2025-${mes}/31`),
    },
  };

  const investidoTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const depositoTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const gastosTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const saldo = depositoTotal - investidoTotal - gastosTotal;
  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );
  const tiposPorcentagem: TransacaoPorcentagemPorTipo = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositoTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(gastosTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investidoTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };
  const totalGastosPCategoria: TotalGastosPorCategoria[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(gastosTotal)) * 100,
    ),
  }));
  const ultimasTransacoes = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 30,
  });
  return {
    investidoTotal,
    depositoTotal,
    gastosTotal,
    saldo,
    tiposPorcentagem,
    totalGastosPCategoria,
    ultimasTransacoes: JSON.parse(JSON.stringify(ultimasTransacoes)),
  };
};
