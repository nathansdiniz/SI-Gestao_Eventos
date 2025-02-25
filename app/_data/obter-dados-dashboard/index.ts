import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalGastosPorCategoria, TransacaoPorcentagemPorTipo } from "./types";
import { auth } from "@clerk/nextjs/server";

export const obterDashboard = async (mes: string, empresa: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Não autorizado.");
  }
  const where = {
    datacompetencia: {
      gte: new Date(`${mes}/01`),
      lt: new Date(`${mes}/31`),
    },
    id_empresa: Number(empresa),
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
    take: 10,
  });
  const saldo_previstoSaidas = Number(
    (
      await db.financeiroME.aggregate({
        where: { ...where, tipocobranca: "Despesa", pago: "nao" },
        _sum: { valor: true },
      })
    )?._sum?.valor,
  );
  const saldo_previstoEntradas = Number(
    (
      await db.financeiroME.aggregate({
        where: { ...where, tipocobranca: "Receita", pago: "nao" },
        _sum: { valor: true },
      })
    )?._sum?.valor,
  );
  const saldo_previsto = Number(
    (
      await db.financeiroME.aggregate({
        where: { ...where, pago: "nao" },
        _sum: { valor: true },
      })
    )?._sum?.valor,
  );
  return {
    investidoTotal,
    depositoTotal,
    gastosTotal,
    saldo,
    tiposPorcentagem,
    totalGastosPCategoria,
    saldo_previsto,
    saldo_previstoEntradas,
    saldo_previstoSaidas,
    ultimasTransacoes: JSON.parse(JSON.stringify(ultimasTransacoes)),
  };
};
