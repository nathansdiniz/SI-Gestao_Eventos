import Layout from "@/app/_components/slide-bar";
import CardResumo from "@/app/(home)/_components/cards-resumo";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import TabelaContas from "../_components/tabelaContas";
import BotaoVoltar from "@/app/_components/botao-voltar";
import { FinancasEventoPagarReceber } from "@/app/_actions/criar-atualizarFinanceiro";

interface Props {
  params: {
    id: string; // Ou 'number', dependendo do tipo esperado para 'id'
  };
}
const Financeiro = async ({ params: { id } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const operacaoId = Number(id);
  console.log(operacaoId, "id aqui");

  const dadosfinanceiros = await FinancasEventoPagarReceber();
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TabelaContas
              titulo="A Receber"
              dadosfinanceiros={dadosfinanceiros.filter(
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
              dadosfinanceiros={dadosfinanceiros.filter(
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
