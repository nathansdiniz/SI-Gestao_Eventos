"use server";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";
const MeEventos = require("@meeventos/api");

interface FinanceiroPropos {
  id: string;
  evento: string;
  datapagamento: string;
  datacompetencia: string;
  tipocobranca: string;
  idrecebidode: string;
  recebidode: string;
  informede: string;
  descricao: string;
  valor: string;
  juros: string;
  multa: string;
  desconto: string;
  pago: string;
  idconta: string;
  conta: string;
  idcategoria: string | number;
  categoria: string | null;
  idcentrodecusto: string;
  centrodecusto: string;
  mododepagamento: string;
  parcelas: null;
  idevento: string;
}

interface Dadosfinanceiros {
  data: FinanceiroPropos[];
}

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

  const baseURL = "https://app1.meeventos.com.br/inmidialed/";
  const apiKey = process.env.TOKEN_ME_EVENTOS;
  const Api = new MeEventos(baseURL, apiKey);

  // Chamada da API para obter os dados
  const dadosfinanceiros: Dadosfinanceiros = await Api.financial.list();

  const sortedData = dadosfinanceiros.data.sort((a, b) => {
    const dateA = new Date(a.datacompetencia);
    const dateB = new Date(b.datacompetencia);
    return dateB.getTime() - dateA.getTime(); // Ordem decrescente
  });

  let investidoTotal = 0;
  let depositoTotal = 0;
  let gastosTotal = 0;

  sortedData.map((item) => {
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
