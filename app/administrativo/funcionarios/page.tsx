import Layout from "@/app/_components/slide-bar";
import { DataTable } from "@/app/_components/ui/data-table";
import { funcionariosColumns } from "./_columns";
import AdicionarFuncionarioButton from "./_components/add-funcionario";
import BotaoVoltar from "@/app/_components/botao-voltar";
import { db } from "@/app/_lib/prisma";
import CheckUserDialog from "@/app/_components/dialog-verificarUsuario";

const Funcionarios = async () => {
  const invoices = await db.funcionarios.findMany();

  return (
    <>
      <Layout>
        <CheckUserDialog redirecionar="orcamentos"></CheckUserDialog>
        <div className="space-y-6 p-6">
          <BotaoVoltar redirecionar="/menu"></BotaoVoltar>
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">Funcionários</h1>
            <AdicionarFuncionarioButton></AdicionarFuncionarioButton>
          </div>
          <DataTable columns={funcionariosColumns} data={invoices}></DataTable>
        </div>
      </Layout>
    </>
  );
};

export default Funcionarios;
