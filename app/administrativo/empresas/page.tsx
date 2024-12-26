import Layout from "@/app/_components/slide-bar";
import { Button } from "@/app/_components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Diff } from "lucide-react";

const invoices = [
  {
    Nome: "Elaine e Henrique Pizzaria Delivery Ltda",
    CNPJ: "12.114.158/0001-71",
    "Inscrição Estadual": "07589845001-42",
    "Data de Abertura": "01/10/2019",
    Site: "www.elaineehenriquepizzariadelivery.com.br",
    "E-Mail": "atendimento@elaineehenriquepizzariadelivery.com.br",
    CEP: "72319-554",
    Endereço: "Quadra QS 403 Conjunto D",
    Numero: 759,
    Bairro: "Samambaia Norte (Samambaia)",
    Cidade: "Brasília",
    Estado: "DF",
    Telefone: "(61) 3508-2447",
    Celular: "(61) 98533-8849",
  },
];

export function TableDemo() {
  return (
    <Table>
      <TableCaption>Lista das empresas mais recentes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Empresa</TableHead>
          <TableHead>CNPJ</TableHead>
          <TableHead>Data Abertura</TableHead>
          <TableHead>Inscrição Estadual</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Site</TableHead>
          <TableHead>Endereço</TableHead>
          <TableHead>Cidade</TableHead>
          <TableHead>Bairro</TableHead>
          <TableHead>CEP</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.CNPJ}>
            <TableCell className="font-medium">{invoice.Nome}</TableCell>
            <TableCell>{invoice.CNPJ}</TableCell>
            <TableCell>{invoice["Data de Abertura"]}</TableCell>
            <TableCell>{invoice["Inscrição Estadual"]}</TableCell>
            <TableCell className="text-right">{invoice.Site}</TableCell>
            <TableCell>{invoice["E-Mail"]}</TableCell>
            <TableCell>{invoice.Endereço}</TableCell>
            <TableCell>{invoice.Cidade}</TableCell>
            <TableCell>{invoice.Bairro}</TableCell>
            <TableCell>{invoice.CEP}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={9}>Total</TableCell>
          <TableCell className="text-right">{invoices.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

const Funcionarios = () => {
  return (
    <>
      <Layout>
        <div className="space-y-6 p-6">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">Empresas</h1>
            <Button className="font-bold text-white">
              <Diff></Diff>
              Adicionar Empresa
            </Button>
          </div>
          <div className="flex justify-center">
            <TableDemo></TableDemo>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Funcionarios;
