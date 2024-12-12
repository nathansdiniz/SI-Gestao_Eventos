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
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <SelecionarMes />
          </div>
          <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
            <div className="flex flex-col gap-6 overflow-hidden">
              <CardResumo mes={mes} {...dashboard} />
              <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
                <GraficoPizza {...dashboard} />
                <GastosCategoria
                  gastosPorCategoria={dashboard.totalGastosPCategoria}
                />
              </div>
            </div>
            <UltimasTransacoes
              ultimasTransacoes={dashboard.ultimasTransacoes}
            ></UltimasTransacoes>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
