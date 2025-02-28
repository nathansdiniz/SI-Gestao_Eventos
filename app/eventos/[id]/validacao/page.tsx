"use server";
import Layout from "@/app/_components/slide-bar";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import TabelaFinanceira from "./_components/tabelaFinanceiro";
import BotaoVoltar from "@/app/_components/botao-voltar";
import BotaoRedirecionar from "@/app/_components/ui/botao-redirecionar";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { FinancasdoEvento } from "@/app/_actions/criar-atualizarFinanceiro";

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

  // Chamada da API para obter os dados
  const dadosfinanceiros = await FinancasdoEvento();

  return (
    <>
      <Layout>
        <div className="space-y-6 p-6">
          {/* Botão Voltar */}
          <div>
            <BotaoVoltar redirecionar={`/eventos/${operacaoId}`} />
          </div>
          <h1 className="text-center text-2xl font-bold">
            Validações Financeiras
          </h1>
          <BotaoRedirecionar
            titulo="A Pagar e A Receber"
            icone={
              <SquareArrowOutUpRightIcon size={34}></SquareArrowOutUpRightIcon>
            }
            redirecionar={`/eventos/${operacaoId}/financeiro/pagar-receber`}
          ></BotaoRedirecionar>

          {/* Filtros: Mês e Ano */}

          {/* Card de Resumo */}

          {/* Tabela Financeira */}
          <div>
            <TabelaFinanceira dadosfinanceiros={dadosfinanceiros} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Financeiro;
