import Layout from "@/app/_components/slide-bar";
import { DataTable } from "@/app/_components/ui/data-table";
import { empresasColumns } from "./_colums/index.tsx";
import AdicionarEmpresasButton from "./_components/add-empresas";
import BotaoVoltar from "@/app/_components/botao-voltar";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const invoices = await db.empresas.findMany();
console.log(invoices);

const Empresas = () => {
  return (
    <Layout>
      <div className="relative w-full space-y-6 p-6">
        <BotaoVoltar redirecionar="/administrativo"></BotaoVoltar>
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Empresas</h1>
          <AdicionarEmpresasButton />
        </div>
        <div className="flex justify-center">
          <DataTable columns={empresasColumns} data={invoices} />
        </div>
      </div>
    </Layout>
  );
};

export default Empresas;
