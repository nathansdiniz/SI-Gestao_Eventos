import { DataTable } from "../_components/ui/data-table";
import AddTransactionButton from "../_components/add-transaction-button";
import Layout from "../_components/slide-bar";
import { ScrollArea } from "../_components/ui/scroll-area";
import { financeiroColumns } from "../transacoes/_colums";
import minhasTransações from "../_actions/criar-atualizarFinanceiro";

const TransactionsPage = async () => {
  try {
    const transactions = await minhasTransações();
    return (
      <>
        <Layout>
          {" "}
          <>
            <div className="space-y-6 overflow-hidden p-6">
              {/* TÍTULO E BOTÃO */}
              <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl font-bold">Transações</h1>
                <AddTransactionButton />
              </div>
              <ScrollArea>
                <DataTable columns={financeiroColumns} data={transactions} />
              </ScrollArea>
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
