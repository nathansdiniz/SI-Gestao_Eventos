import AddTransactionButton from "../_components/add-transaction-button";
import Layout from "../_components/slide-bar";
import minhasTransações from "../_actions/criar-atualizarFinanceiro";
import TabelaFinanceira from "../_components/tabelaFinanceiro";
import CheckUserDialog from "../_components/dialog-verificarUsuario";

const TransactionsPage = async () => {
  try {
    const transactions = await minhasTransações();
    return (
      <>
        <Layout>
          <CheckUserDialog redirecionar="transacoes"></CheckUserDialog>{" "}
          <>
            <div className="space-y-6 overflow-hidden p-6">
              {/* TÍTULO E BOTÃO */}
              <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl font-bold">Transações</h1>
                <AddTransactionButton />
              </div>
              <TabelaFinanceira
                dadosfinanceiros={transactions}
              ></TabelaFinanceira>
            </div>
          </>
        </Layout>
      </>
    );
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return <p>Erro ao carregar transações.</p>;
  }
};

export default TransactionsPage;
