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

interface FinanceiroProps {
  searchParams: {
    mes: string;
    ano: string;
  };
}

const Financeiro = async ({ searchParams: { mes, ano } }: FinanceiroProps) => {
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

  dadosfinanceiros.data.map((item) => {
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
              data={sortedData.filter((item) => {
                return (
                  new Date(item.datacompetencia).getFullYear() ===
                    Number(ano) &&
                  new Date(item.datacompetencia).getMonth() + 1 === Number(mes)
                );
              })} // Passando os dados corretamente
            />
          </ScrollArea>
        </div>
      </Layout>
    </>
  );
};

export default Financeiro;
