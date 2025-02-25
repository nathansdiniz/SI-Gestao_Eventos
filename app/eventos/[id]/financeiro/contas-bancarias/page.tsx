import Layout from "@/app/_components/slide-bar";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";
import BotaoVoltar from "@/app/_components/botao-voltar";
import TabelaContasBancarias from "../_components/tabelaContasBancarias";

const Financeiro = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const dadosfinanceiros = await db.contasBancarias.findMany({});
  // Chamada da API para obter os dados
  const dadosConvertidos = dadosfinanceiros.map((dado) => ({
    ...dado,
    saldoBancario: dado.saldoBancario
      ? Number(dado.saldoBancario.toString())
      : null,
    totalEntradas: dado.totalEntradas
      ? Number(dado.totalEntradas.toString())
      : null,
    totalSaidas: dado.totalSaidas ? Number(dado.totalSaidas.toString()) : null,
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
            Contas Bancárias
          </h1>
          <div className="flex space-x-6">
            <TabelaContasBancarias
              dadosContasBancarias={dadosConvertidos}
              cor="blue"
              titulo="Contas Bancárias"
            ></TabelaContasBancarias>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Financeiro;
