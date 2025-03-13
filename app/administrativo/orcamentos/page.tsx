import Layout from "@/app/_components/slide-bar";
import { DataTable } from "@/app/_components/ui/data-table";
import { OrcamentosColumns } from "./_columns";
import BotaoVoltar from "@/app/_components/botao-voltar";
import { db } from "@/app/_lib/prisma";
import CheckUserDialog from "@/app/_components/dialog-verificarUsuario";
import AdicionarOrcamentoButton from "./_components/add-Orcamento";
import AdicionarClienteButton from "../clientes/_components/add-Cliente";

const Clientes = async () => {
  const invoices = (await db.orcamentos.findMany()).map((invoice) => ({
    ...invoice,
    valor_orcamento: invoice.valor_orcamento
      ? Number(invoice.valor_orcamento)
      : null,
    valor_negociado: invoice.valor_negociado
      ? Number(invoice.valor_negociado)
      : null,
    valorInicial: invoice.valorInicial ? Number(invoice.valorInicial) : null,
  }));

  return (
    <>
      <Layout>
        <CheckUserDialog redirecionar="orcamentos"></CheckUserDialog>
        <div className="space-y-6 p-6">
          <BotaoVoltar redirecionar="/menu"></BotaoVoltar>
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">Orçamentos</h1>
            <div>
              <AdicionarOrcamentoButton></AdicionarOrcamentoButton>
              <AdicionarClienteButton></AdicionarClienteButton>
            </div>
          </div>
          <DataTable columns={OrcamentosColumns} data={invoices}></DataTable>
        </div>
      </Layout>
    </>
  );
};

export default Clientes;
