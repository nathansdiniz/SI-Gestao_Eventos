"use server";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";
import { Prisma } from "@prisma/client";
import { db } from "@/app/_lib/prisma";

interface DataProps {
  mes: string;
}

export const Financeiro = async ({ mes }: DataProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const mesInvalido = !mes || !isMatch(mes, "MM");
  if (mesInvalido)
    redirect(
      `?mes=${new Date().getMonth() + 1}&ano=${new Date().getFullYear()}`,
    );

  const baseURL = "https://app1.meeventos.com.br/inmidialed";
  const apiKey = process.env.TOKEN_ME_EVENTOS;
  const res = await fetch(`${baseURL}/api/v1/financial`, {
    method: "GET", // ou POST, PUT, DELETE, etc.
    headers: {
      Authorization: `${apiKey}`, // Inclua o token no cabeçalho
      "Content-Type": "application/json", // Se você estiver enviando JSON
      // outros headers, se necessário
    },
    // body: JSON.stringify(dados), // Se for uma requisição POST com dados
  });
  const dadosfinanceiros = await res.json(); // o

  const sortedData = dadosfinanceiros.data.sort(
    (
      a: { datacompetencia: string | number | Date },
      b: { datacompetencia: string | number | Date },
    ) => {
      const dateA = new Date(a.datacompetencia);
      const dateB = new Date(b.datacompetencia);
      return dateB.getTime() - dateA.getTime(); // Ordem decrescente
    },
  );

  let investidoTotal = 0;
  let depositoTotal = 0;
  let gastosTotal = 0;

  sortedData.map((item: { tipocobranca: string; valor: any }) => {
    if (item.tipocobranca === "Investimento")
      investidoTotal += Number(item.valor);
    else if (item.tipocobranca === "Receita")
      depositoTotal += Number(item.valor);
    else gastosTotal += Number(item.valor);
  });
  const dashboard = {
    investidoTotal: investidoTotal,
    depositoTotal: depositoTotal,
    saldo: depositoTotal - gastosTotal - investidoTotal,
    gastosTotal: gastosTotal,
    dadosfinanceiros: sortedData,
  };

  return dashboard;
};

export const AddFinanceiro = async (params: Prisma.SaidasCreateInput) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Ação não autorizada.");
  }
  db.saidas.create({
    data: params,
  });
};
