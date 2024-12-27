import { DataTable } from "@/app/_components/ui/data-table";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Layout from "@/app/_components/slide-bar";
import { financeiroColumns } from "./_colums";
import CardResumo from "@/app/(home)/_components/cards-resumo";
import SelecionarMes from "@/app/(home)/_components/selecionar-mes";
import SelecionarAno from "@/app/(home)/_components/selecionar-ano";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";

interface FinanceiroProps {
  searchParams: {
    mes: string;
  };
}

const Financeiro = async ({ searchParams: { mes } }: FinanceiroProps) => {
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

  // Chamada da API para obter os dados

  const sortedData = Array.isArray(dadosfinanceiros.data)
    ? dadosfinanceiros.data.sort(
        (
          a: { datacompetencia: string | number | Date },
          b: { datacompetencia: string | number | Date },
        ) => {
          const dateA = new Date(a.datacompetencia);
          const dateB = new Date(b.datacompetencia);
          return dateB.getTime() - dateA.getTime();
        },
      )
    : [];

  let investidoTotal = 0;
  let depositoTotal = 0;
  let gastosTotal = 0;

  dadosfinanceiros.data.map((item: { tipocobranca: string; valor: any }) => {
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
  };
  return (
    <>
      <Layout>
        <div>
          <h1
            style={{ textAlign: "center", margin: "20px 0" }}
            className="text-xl font-bold"
          >
            Movimentações Financeiras
          </h1>
          <SelecionarMes></SelecionarMes>
          <SelecionarAno mes={mes}></SelecionarAno>
          <CardResumo mes="12" {...dashboard} />
          <ScrollArea className="space-y-6">
            <DataTable
              columns={financeiroColumns} // Usando as colunas corretamente
              data={sortedData} // Passando os dados corretamente
            />
          </ScrollArea>
        </div>
      </Layout>
    </>
  );
};

export default Financeiro;
