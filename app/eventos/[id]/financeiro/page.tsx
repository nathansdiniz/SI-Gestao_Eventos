import Layout from "@/app/_components/slide-bar";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import TabelaFinanceira from "./_components/tabelaFinanceiro";

const Financeiro = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <Layout>
        {/* Filtros: Mês e Ano */}

        {/* Card de Resumo */}

        {/* Tabela Financeira */}
        <div>
          <TabelaFinanceira />
        </div>
      </Layout>
    </>
  );
};

export default Financeiro;
