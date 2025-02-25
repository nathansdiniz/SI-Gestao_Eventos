import Layout from "@/app/_components/slide-bar";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import TabelaFinanceira from "./_components/tabelaFinanceiro";
import BotaoVoltar from "@/app/_components/botao-voltar";
import { db } from "@/app/_lib/prisma";
import BotaoRedirecionar from "@/app/_components/ui/botao-redirecionar";
import { SquareArrowOutUpRightIcon } from "lucide-react";

const Financeiro = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }

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

  const dadosConvertidos = dadosfinanceiros.map((dado) => ({
    ...dado,
    valor: dado.valor ? Number(dado.valor.toString()) : null,
    juros: dado.juros ? Number(dado.juros.toString()) : null,
    multa: dado.multa ? Number(dado.multa.toString()) : null,
    desconto: dado.desconto ? Number(dado.desconto.toString()) : null,
    documentos_anexados:
      typeof dado.documentos_anexados === "string"
        ? JSON.parse(dado.documentos_anexados)
        : dado.documentos_anexados,
    parcelas:
      dado.parcelas === 1
        ? 1
        : dado.parcelas &&
            typeof dado.parcelas === "string" &&
            dado.parcelas.trim() !== ""
          ? JSON.parse(dado.parcelas)
          : dado.parcelas,
    recorrencia:
      (dado.recorrencia as "Nenhuma" | "Semanal" | "Mensal" | undefined) ||
      "Nenhuma",
  }));
  return (
    <>
      <Layout>
        <div className="space-y-6 p-6">
          {/* Botão Voltar */}
          <div>
            <BotaoVoltar redirecionar="/administrativo" />
          </div>

          {/* Título */}
          <h1 className="text-center text-2xl font-bold">
            Movimentações Financeiras
          </h1>
          <BotaoRedirecionar
            titulo="A Pagar e A Receber"
            icone={
              <SquareArrowOutUpRightIcon size={34}></SquareArrowOutUpRightIcon>
            }
            redirecionar="/administrativo/financeiro/pagar-receber"
          ></BotaoRedirecionar>

          {/* Filtros: Mês e Ano */}

          {/* Card de Resumo */}

          {/* Tabela Financeira */}
          <div>
            <TabelaFinanceira dadosfinanceiros={dadosConvertidos} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Financeiro;
