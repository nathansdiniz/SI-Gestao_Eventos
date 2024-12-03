import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Layout from "../_components/slide-bar";

const TransactionsPage = async () => {
  try {
    const transactions = await db.transaction.findMany({});
    return (
      <>
        <Layout>
          {" "}
          <>
            <div className="space-y-6 p-6">
              {/* TÍTULO E BOTÃO */}
              <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl font-bold">Transações</h1>
                <AddTransactionButton />
              </div>
              <DataTable columns={transactionColumns} data={transactions} />
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
