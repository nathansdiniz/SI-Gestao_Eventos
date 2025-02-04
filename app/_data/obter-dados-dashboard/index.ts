import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalGastosPorCategoria, TransacaoPorcentagemPorTipo } from "./types";
import { auth } from "@clerk/nextjs/server";

export const obterDashboard = async (mes: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Não autorizado.");
  }
  const ano =
    Number(mes) === new Date().getMonth() + 1
      ? new Date().getFullYear()
      : new Date().getFullYear() - 1;
  const where = {
    datacompetencia: {
      gte: new Date(`${ano}-${mes}/01`),
      lt: new Date(`${ano}-${mes}/31`),
    },
  };

  const investidoTotal = Number(
    (
      await db.financeiroME.aggregate({
        where: { ...where, tipocobranca: "INVESTMENT" },
        _sum: { valor: true },
      })
    )?._sum?.valor,
  );
  const depositoTotal = Number(
    (
      await db.financeiroME.aggregate({
        where: { ...where, tipocobranca: "Receita" },
        _sum: { valor: true },
      })
    )?._sum?.valor,
  );
  const gastosTotal = Number(
    (
      await db.financeiroME.aggregate({
        where: { ...where, tipocobranca: "Despesa" },
        _sum: { valor: true },
      })
    )?._sum?.valor,
  );
  const saldo = depositoTotal - investidoTotal - gastosTotal;
  const transactionsTotal = Number(
    (
      await db.financeiroME.aggregate({
        where,
        _sum: { valor: true },
      })
    )._sum.valor,
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
    await db.financeiroME.groupBy({
      by: ["categoria"],
      where: {
        ...where,
        tipocobranca: "Despesa",
      },
      _sum: {
        valor: true,
      },
    })
  ).map((category) => ({
    category: category.categoria, // Ajustado para corresponder ao tipo esperado
    totalAmount: Number(category._sum.valor), // Ajustado para corresponder ao tipo esperado
    percentageOfTotal: Math.round(
      (Number(category._sum.valor) / Number(gastosTotal)) * 100,
    ),
  }));

  const ultimasTransacoes = await db.financeiroME.findMany({
    where,
    orderBy: { datacompetencia: "desc" },
    take: 15,
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
