import Layout from "@/app/_components/slide-bar";
import { DataTable } from "@/app/_components/ui/data-table";
import BotaoVoltar from "@/app/_components/botao-voltar";
import { db } from "@/app/_lib/prisma";
import AdicionarFornecedorButton from "./_components/add-funcionario";
import { fornecedoresColumns } from "./_columns";
import CheckUserDialog from "@/app/_components/dialog-verificarUsuario";

const Fornecedores = async () => {
  const invoices = await db.fornecedores.findMany();

  return (
    <>
      <Layout>
        <CheckUserDialog redirecionar="fornecedores"></CheckUserDialog>
        <div className="space-y-6 p-6">
          <BotaoVoltar redirecionar="/menu"></BotaoVoltar>
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">Fornecedores</h1>
            <AdicionarFornecedorButton></AdicionarFornecedorButton>
          </div>
          <DataTable columns={fornecedoresColumns} data={invoices}></DataTable>
        </div>
      </Layout>
    </>
  );
};

export default Fornecedores;
