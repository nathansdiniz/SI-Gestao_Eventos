import Layout from "@/app/_components/slide-bar";
import { DataTable } from "@/app/_components/ui/data-table";
import { ClientesColumns } from "./_columns";
import BotaoVoltar from "@/app/_components/botao-voltar";
import { db } from "@/app/_lib/prisma";
import AdicionarClienteButton from "./_components/add-Cliente";

const Clientes = async () => {
  const invoices = await db.clientes.findMany();

  return (
    <>
      <Layout>
        <div className="space-y-6 p-6">
          <BotaoVoltar redirecionar="/menu"></BotaoVoltar>
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">Clientes</h1>
            <AdicionarClienteButton></AdicionarClienteButton>
          </div>
          <DataTable columns={ClientesColumns} data={invoices}></DataTable>
        </div>
      </Layout>
    </>
  );
};

export default Clientes;
