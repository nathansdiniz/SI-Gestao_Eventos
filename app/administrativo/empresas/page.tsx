import Layout from "@/app/_components/slide-bar";
import { DataTable } from "@/app/_components/ui/data-table";
import { empresasColumns } from "./_colums/index.tsx";
import AdicionarEmpresasButton from "./_components/add-empresas";
import BotaoVoltar from "@/app/_components/botao-voltar";

// Dados fictícios
const invoices = [
  {
    id: "1561",
    nome: "Elaine e Henrique Pizzaria Delivery Ltda",
    cnpj: "12.114.158/0001-71",
    inscricaoEstadual: "07589845001-42",
    dataAbertura: new Date("01/10/2019"),
    site: "www.elaineehenriquepizzariadelivery.com.br",
    email: "atendimento@elaineehenriquepizzariadelivery.com.br",
    cep: "72319-554",
    endereco: "Quadra QS 403 Conjunto D",
    numero: 759,
    bairro: "Samambaia Norte (Samambaia)",
    cidade: "Brasília",
    estado: "DF",
    telefone: "(61) 3508-2447",
    celular: "(61) 98533-8849",
  },
  {
    id: "28616",
    nome: "Elaine e Henrique Pizzaria Delivery Ltda",
    cnpj: "12.114.158/0001-78",
    inscricaoEstadual: "07589845001-42",
    dataAbertura: new Date("01/10/2019"),
    site: "www.elaineehenriquepizzariadelivery.com.br",
    email: "atendimento@elaineehenriquepizzariadelivery.com.br",
    cep: "72319-554",
    endereco: "Quadra QS 403 Conjunto D",
    numero: 759,
    bairro: "Samambaia Norte (Samambaia)",
    cidade: "Brasília",
    estado: "DF",
    telefone: "(61) 3508-2447",
    celular: "(61) 98533-8849",
  },
];

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
