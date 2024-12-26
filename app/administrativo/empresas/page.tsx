import Layout from "@/app/_components/slide-bar";
import { Button } from "@/app/_components/ui/button";
import { DataTable } from "@/app/_components/ui/data-table";
import { empresasColumns } from "./_colums/index.tsx";

// Dados fictícios
const invoices = [
  {
    id: "1561",
    nome: "Elaine e Henrique Pizzaria Delivery Ltda",
    cnpj: "12.114.158/0001-71",
    inscricaoEstadual: "07589845001-42",
    dataAbertura: "01/10/2019",
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
    dataAbertura: "01/10/2019",
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

const Funcionarios = () => {
  return (
    <Layout>
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Empresas</h1>
          <Button className="font-bold text-white">Adicionar Empresa</Button>
        </div>
        <div className="flex justify-center">
          <DataTable columns={empresasColumns} data={invoices} />
        </div>
      </div>
    </Layout>
  );
};

export default Funcionarios;
