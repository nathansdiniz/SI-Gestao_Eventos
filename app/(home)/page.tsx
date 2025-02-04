import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Layout from "@/app/_components/slide-bar";
import CardResumo from "./_components/cards-resumo";
import SelecionarMes from "./_components/selecionar-mes";
import { isMatch } from "date-fns";
import GraficoPizza from "./_components/grafico-pizza";
import { obterDashboard } from "../_data/obter-dados-dashboard";
import GastosCategoria from "./_components/tabelaGastos";
import UltimasTransacoes from "./_components/ultimas-transacoes";
import BotaoVoltar from "../_components/botao-voltar";

interface HomeProps {
  searchParams: {
    mes: string;
  };
}

const Home = async ({ searchParams: { mes } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const mesInvalido = !mes || !isMatch(mes, "MM");
  if (mesInvalido) redirect(`?mes=${new Date().getMonth() + 1}`);

  const dashboard = await obterDashboard(mes);

  return (
    <>
      <Layout>
        <div className="space-y-6 p-6">
          <BotaoVoltar redirecionar="/menu" />
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <SelecionarMes />
          </div>

          {/* Gráfico de Pizza ao lado dos Cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 flex flex-col gap-6">
              <CardResumo mes={mes} {...dashboard} />
            </div>
            <GraficoPizza {...dashboard} />
          </div>

          {/* Tabelas ocupando duas colunas de forma igual */}
          <div className="grid grid-cols-2 gap-6">
            <div className="h-full p-4">
              <GastosCategoria
                gastosPorCategoria={dashboard.totalGastosPCategoria.filter(
                  (item) => item.percentageOfTotal > 0,
                )}
              />
            </div>
            <div className="h-full p-4">
              <UltimasTransacoes
                ultimasTransacoes={dashboard.ultimasTransacoes}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
