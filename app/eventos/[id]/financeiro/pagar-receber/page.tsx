import Layout from "@/app/_components/slide-bar";
import CardResumo from "@/app/(home)/_components/cards-resumo";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import TabelaContas from "../_components/tabelaContas";
import { db } from "@/app/_lib/prisma";
import BotaoVoltar from "@/app/_components/botao-voltar";

const Financeiro = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  /* const baseURL = "https://app1.meeventos.com.br/inmidialed";
  const apiKey = process.env.TOKEN_ME_EVENTOS;
  const res = await fetch(
    `${baseURL}/api/v1/financial?field_sort=datacompetencia&sort=desc`,
    {
      method: "GET", // ou POST, PUT, DELETE, etc.
      headers: {
        Authorization: `${apiKey}`, // Inclua o token no cabeçalho
        "Content-Type": "application/json", // Se você estiver enviando JSON
        // outros headers, se necessário
      },
      // body: JSON.stringify(dados), // Se for uma requisição POST com dados
    },
  );

  const dadosfinanceiros = await res.json(); // o*/
  const ano = new Date().getFullYear();
  const dadosfinanceiros = await db.financeiroME.findMany({
    where: {
      datacompetencia: {
        gte: new Date(`${ano - 1}-06-01`).toISOString(), // Data inicial do mês
        lt: new Date(`${ano}-12-01`).toISOString(), // Data do próximo mês (exclusivo)
      },
    },
  });
  // Chamada da API para obter os dados

  let investidoTotal = 0;
  let depositoTotal = 0;
  let gastosTotal = 0;
  let saldo_previstoEntradas = 0;
  let saldo_previstoSaidas = 0;
  let saldo_previsto = 0;

  dadosfinanceiros.map(
    (item: {
      tipocobranca: string | null;
      valor: any;
      pago: string | null;
    }) => {
      item.valor = Number(item.valor);
      if (item.tipocobranca === "Investimento")
        investidoTotal += Number(item.valor);
      else if (item.tipocobranca === "Receita")
        depositoTotal += Number(item.valor);
      else gastosTotal += Number(item.valor);
      if (item.pago === "nao") {
        saldo_previsto += Number(item.valor);
        switch (item.tipocobranca) {
          case "Despesa":
            saldo_previstoSaidas += Number(item.valor);
            break;
          case "Receita":
            saldo_previstoEntradas += Number(item.valor);
            break;
        }
      }
    },
  );
  const dashboard = {
    investidoTotal: investidoTotal,
    depositoTotal: depositoTotal,
    saldo: depositoTotal - gastosTotal - investidoTotal,
    gastosTotal: gastosTotal,
    saldo_previsto: saldo_previsto,
    saldo_previstoEntradas: saldo_previstoEntradas,
    saldo_previstoSaidas: saldo_previstoSaidas,
  };
  const dadosConvertidos = dadosfinanceiros.map((dado) => ({
    ...dado,
    valor: dado.valor ? Number(dado.valor.toString()) : null,
    juros: dado.juros ? Number(dado.juros.toString()) : null,
    multa: dado.multa ? Number(dado.multa.toString()) : null,
    desconto: dado.desconto ? Number(dado.desconto.toString()) : null,
    parcelas:
      typeof dado.parcelas === "string"
        ? JSON.parse(dado.parcelas)
        : dado.parcelas,
  }));
  return (
    <>
      <Layout>
        <div>
          <BotaoVoltar redirecionar="/administrativo/financeiro"></BotaoVoltar>
          <h1
            style={{ textAlign: "center", margin: "20px 0" }}
            className="text-xl font-bold"
          >
            Contas A Pagar e A Receber
          </h1>
          <CardResumo mes="12" {...dashboard} />
          <div className="flex space-x-6">
            <TabelaContas
              titulo="A Receber"
              dadosfinanceiros={dadosConvertidos.filter(
                (item: {
                  tipocobranca: string | null;
                  pago: string | null;
                }) => {
                  return item.tipocobranca === "Receita" && item.pago == "nao";
                },
              )}
              key={"A Receber"}
              cor={"green"}
            ></TabelaContas>
            <TabelaContas
              titulo="A Pagar"
              dadosfinanceiros={dadosConvertidos.filter(
                (item: {
                  tipocobranca: string | null;
                  pago: string | null;
                }) => {
                  return item.tipocobranca === "Despesa" && item.pago == "nao";
                },
              )}
              key={"A Pagar"}
              cor={"yellow"}
            ></TabelaContas>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Financeiro;
