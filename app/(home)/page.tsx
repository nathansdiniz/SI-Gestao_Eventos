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
    src: string;
  };
}

const Home = async ({ searchParams: { mes, src } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const mesInvalido = !mes || !isMatch(mes, "yyyy-MM");
  if (mesInvalido)
    redirect(`?mes=${new Date().getFullYear()}-${new Date().getMonth() + 1}`);

  if (!src) {
    redirect(`/?mes=${mes}&src=01`); // Substitua "defaultEmpresaId" pelo ID da src padrão
  }

  const dashboard = await obterDashboard(mes, src);

  return (
    <>
      <Layout>
        <div className="space-y-6 p-6">
          <BotaoVoltar redirecionar="/menu" />

          {/* Cabeçalho */}
          <div className="flex flex-col justify-between md:flex-row">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <div className="mt-2 flex gap-4 md:mt-0">
              <SelecionarMes />
            </div>
          </div>

          {/* Gráfico de Pizza ao lado dos Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Cards Resumo */}
            <div className="flex flex-col gap-6 md:col-span-2">
              <CardResumo mes={mes} {...dashboard} />
            </div>

            {/* Gráfico de Pizza */}
            <GraficoPizza {...dashboard} />
          </div>

          {/* Tabelas Responsivas */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
