import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalGastosPorCategoria, TransacaoPorcentagemPorTipo } from "./types";

export const obterDashboard = async (mes: string) => {
  const where = {
    date: {
      gte: new Date(`2024-${mes}/01`),
      lt: new Date(`2024-${mes}/31`),
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
  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 15,
  });
  return {
    investidoTotal,
    depositoTotal,
    gastosTotal,
    saldo,
    tiposPorcentagem,
    totalGastosPCategoria,
    lastTransactions: JSON.parse(JSON.stringify(lastTransactions)),
  };
};
