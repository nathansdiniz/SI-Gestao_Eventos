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
    nome: "Anderson Raimundo Baptista",
    idade: 60,
    cpf: "927.691.605-91",
    rg: "41.034.485-0",
    data_nasc: "14/08/1964",
    sexo: "Masculino",
    signo: "Leão",
    mae: "Analu Nina Aurora",
    pai: "Raul Felipe Baptista",
    email: "andersonraimundobaptista@regler.com.br",
    senha: "JAPW84mxzr",
    cep: "98804-300",
    endereco: "Rua Professor João de Castilhos",
    numero: 297,
    bairro: "Jardim das Palmeiras",
    cidade: "Santo Ângelo",
    estado: "RS",
    telefone_fixo: "(55) 3588-4568",
    celular: "(55) 99967-5536",
    altura: "1,87",
    peso: 63,
    tipo_sanguineo: "B-",
    cor: "amarelo",
  },
  {
    nome: "Márcio Edson Peixoto",
    idade: 56,
    cpf: "994.911.036-01",
    rg: "17.969.368-2",
    data_nasc: "25/02/1968",
    sexo: "Masculino",
    signo: "Peixes",
    mae: "Daiane Alice Liz",
    pai: "Emanuel Yago Joaquim Peixoto",
    email: "marcio-peixoto82@sodexo.com",
    senha: "Mezi2s5qjO",
    cep: "35170-042",
    endereco: "Rua José Maria de Magalhães",
    numero: 261,
    bairro: "Centro",
    cidade: "Coronel Fabriciano",
    estado: "MG",
    telefone_fixo: "(31) 2845-1383",
    celular: "(31) 98580-5072",
    altura: "1,92",
    peso: 110,
    tipo_sanguineo: "AB-",
    cor: "preto",
  },
  {
    nome: "Hadassa Milena da Mota",
    idade: 52,
    cpf: "799.591.103-38",
    rg: "50.961.080-8",
    data_nasc: "19/04/1972",
    sexo: "Feminino",
    signo: "Áries",
    mae: "Rosângela Sara Tânia",
    pai: "Diego Gael da Mota",
    email: "hadassa_milena_damota@gamil.com",
    senha: "YmnXalyHTS",
    cep: "68903-882",
    endereco: "Travessa A",
    numero: 872,
    bairro: "Araxá",
    cidade: "Macapá",
    estado: "AP",
    telefone_fixo: "(96) 3504-8598",
    celular: "(96) 99416-6325",
    altura: "1,57",
    peso: 55,
    tipo_sanguineo: "AB-",
    cor: "amarelo",
  },
  {
    nome: "Débora Allana Novaes",
    idade: 73,
    cpf: "951.408.896-41",
    rg: "11.948.801-2",
    data_nasc: "09/06/1951",
    sexo: "Feminino",
    signo: "Gêmeos",
    mae: "Clarice Eloá",
    pai: "Benedito Calebe Severino Novaes",
    email: "debora.allana.novaes@unicohost.com.br",
    senha: "5yDtbgI1Nf",
    cep: "69314-388",
    endereco: "Rua Joaquim Honorato de Souza",
    numero: 115,
    bairro: "Nova Canaã",
    cidade: "Boa Vista",
    estado: "RR",
    telefone_fixo: "(95) 2632-9769",
    celular: "(95) 99724-3522",
    altura: "1,61",
    peso: 79,
    tipo_sanguineo: "A-",
    cor: "preto",
  },
  {
    nome: "Matheus Jorge Nathan Caldeira",
    idade: 29,
    cpf: "038.713.893-58",
    rg: "10.444.513-0",
    data_nasc: "10/03/1995",
    sexo: "Masculino",
    signo: "Peixes",
    mae: "Julia Betina",
    pai: "Eduardo Danilo Caldeira",
    email: "matheus-caldeira94@fedato.com.br",
    senha: "nbQC6EyDzQ",
    cep: "77430-680",
    endereco: "Rua 106",
    numero: 627,
    bairro: "Residencial Jardim dos Buritis",
    cidade: "Gurupi",
    estado: "TO",
    telefone_fixo: "(63) 2943-6318",
    celular: "(63) 98180-8922",
    altura: "1,61",
    peso: 86,
    tipo_sanguineo: "A+",
    cor: "roxo",
  },
  {
    nome: "Cláudio Augusto César Cavalcanti",
    idade: 37,
    cpf: "308.082.251-03",
    rg: "44.223.582-3",
    data_nasc: "12/01/1987",
    sexo: "Masculino",
    signo: "Capricórnio",
    mae: "Gabriela Luana",
    pai: "Ruan Anthony Cavalcanti",
    email: "claudio-cavalcanti94@camarasjc.sp.gov.br",
    senha: "t6lZew0dMc",
    cep: "69099-230",
    endereco: "Rua 46",
    numero: 166,
    bairro: "Novo Aleixo",
    cidade: "Manaus",
    estado: "AM",
    telefone_fixo: "(92) 3643-7522",
    celular: "(92) 99409-5296",
    altura: "1,83",
    peso: 110,
    tipo_sanguineo: "B+",
    cor: "vermelho",
  },
  {
    nome: "Isis Rebeca Rosa Viana",
    idade: 78,
    cpf: "640.393.924-69",
    rg: "13.612.257-7",
    data_nasc: "24/07/1946",
    sexo: "Feminino",
    signo: "Leão",
    mae: "Maitê Tereza",
    pai: "Caleb Erick Viana",
    email: "isis.rebeca.viana@tursi.com.br",
    senha: "x0eQPRx5Qs",
    cep: "26584-211",
    endereco: "Rua Magno de Carvalho",
    numero: 123,
    bairro: "Edson Passos",
    cidade: "Mesquita",
    estado: "RJ",
    telefone_fixo: "(21) 3510-0945",
    celular: "(21) 98481-5557",
    altura: "1,53",
    peso: 62,
    tipo_sanguineo: "A-",
    cor: "preto",
  },
  {
    nome: "Mário Bento Manuel Assis",
    idade: 43,
    cpf: "078.338.367-37",
    rg: "45.742.436-9",
    data_nasc: "26/11/1981",
    sexo: "Masculino",
    signo: "Sagitário",
    mae: "Fátima Carolina",
    pai: "Noah Marcos Vinicius Iago Assis",
    email: "mario-assis92@amoreencantos.com",
    senha: "Wa3CGcxBaS",
    cep: "66630-440",
    endereco: "Passagem Rosa Maria",
    numero: 282,
    bairro: "Bengui",
    cidade: "Belém",
    estado: "PA",
    telefone_fixo: "(91) 2735-6088",
    celular: "(91) 98899-1997",
    altura: "1,93",
    peso: 56,
    tipo_sanguineo: "B+",
    cor: "preto",
  },
  {
    nome: "Bento Antonio Pedro Rodrigues",
    idade: 34,
    cpf: "994.108.423-87",
    rg: "27.498.732-6",
    data_nasc: "22/03/1990",
    sexo: "Masculino",
    signo: "Áries",
    mae: "Nicole Isabela",
    pai: "Martin Ruan Kevin Rodrigues",
    email: "bentoantoniorodrigues@diebold.com",
    senha: "72dAZkpwl9",
    cep: "29177-380",
    endereco: "Rua Treze",
    numero: 855,
    bairro: "Jardim Bela Vista",
    cidade: "Serra",
    estado: "ES",
    telefone_fixo: "(27) 2962-6190",
    celular: "(27) 98760-8964",
    altura: "1,73",
    peso: 102,
    tipo_sanguineo: "O-",
    cor: "amarelo",
  },
  {
    nome: "Luís Benjamin Nathan Monteiro",
    idade: 51,
    cpf: "000.884.406-21",
    rg: "32.052.068-7",
    data_nasc: "05/08/1973",
    sexo: "Masculino",
    signo: "Leão",
    mae: "Carla Natália",
    pai: "Leonardo Vitor Monteiro",
    email: "luis_benjamin_monteiro@mabeitex.com.br",
    senha: "5QPDAzX304",
    cep: "57302-190",
    endereco: "Rua Júlio Rafael",
    numero: 301,
    bairro: "Canafístula",
    cidade: "Arapiraca",
    estado: "AL",
    telefone_fixo: "(82) 3691-6041",
    celular: "(82) 98998-1067",
    altura: "1,69",
    peso: 101,
    tipo_sanguineo: "B+",
    cor: "laranja",
  },
  {
    nome: "Manuela Eliane Almeida",
    idade: 18,
    cpf: "047.990.805-20",
    rg: "17.226.323-2",
    data_nasc: "11/11/2006",
    sexo: "Feminino",
    signo: "Escorpião",
    mae: "Bárbara Jaqueline",
    pai: "Pedro Pedro Henrique Almeida",
    email: "manuela.eliane.almeida@bmalaw.com.br",
    senha: "rNxgeZzpnJ",
    cep: "55602-381",
    endereco: "Travessa Jardim Betânia",
    numero: 413,
    bairro: "Livramento",
    cidade: "Vitória de Santo Antão",
    estado: "PE",
    telefone_fixo: "(81) 2871-0539",
    celular: "(81) 99950-5563",
    altura: "1,80",
    peso: 48,
    tipo_sanguineo: "A+",
    cor: "vermelho",
  },
  {
    nome: "Jéssica Jennifer Analu da Rosa",
    idade: 40,
    cpf: "071.880.048-62",
    rg: "37.843.613-2",
    data_nasc: "02/09/1984",
    sexo: "Feminino",
    signo: "Virgem",
    mae: "Daniela Débora",
    pai: "Thales Martin da Rosa",
    email: "jessica_jennifer_darosa@idesc.com.br",
    senha: "P8ckJxWp6l",
    cep: "68909-817",
    endereco: "Avenida Alexandre Ferreira da Silva",
    numero: 124,
    bairro: "Novo Horizonte",
    cidade: "Macapá",
    estado: "AP",
    telefone_fixo: "(96) 2895-2532",
    celular: "(96) 99124-2007",
    altura: "1,53",
    peso: 48,
    tipo_sanguineo: "B-",
    cor: "laranja",
  },
  {
    nome: "Francisco Gabriel Lopes",
    idade: 61,
    cpf: "345.864.840-20",
    rg: "43.191.430-8",
    data_nasc: "16/08/1963",
    sexo: "Masculino",
    signo: "Leão",
    mae: "Andrea Daiane Stefany",
    pai: "Leandro Sebastião Lopes",
    email: "francisco_lopes@novaes.me",
    senha: "UoWx0YOB45",
    cep: "68909-855",
    endereco: "Rua Oitava",
    numero: 805,
    bairro: "Marabaixo",
    cidade: "Macapá",
    estado: "AP",
    telefone_fixo: "(96) 3956-5498",
    celular: "(96) 98381-5847",
    altura: "1,85",
    peso: 85,
    tipo_sanguineo: "B-",
    cor: "vermelho",
  },
  {
    nome: "Teresinha Beatriz Almada",
    idade: 50,
    cpf: "399.636.429-69",
    rg: "25.159.416-6",
    data_nasc: "01/03/1974",
    sexo: "Feminino",
    signo: "Peixes",
    mae: "Louise Aline Fernanda",
    pai: "Thales Diego Matheus Almada",
    email: "teresinha_beatriz_almada@moppe.com.br",
    senha: "4zNLKHegIG",
    cep: "59133-327",
    endereco: "Rua Vinte de Novembro",
    numero: 979,
    bairro: "Pajuçara",
    cidade: "Natal",
    estado: "RN",
    telefone_fixo: "(84) 3595-0768",
    celular: "(84) 99399-1247",
    altura: "1,62",
    peso: 80,
    tipo_sanguineo: "AB-",
    cor: "amarelo",
  },
];

export function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Sexo</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead className="text-right">E-mail</TableHead>
          <TableHead>Celular</TableHead>
          <TableHead>Endereço</TableHead>
          <TableHead>Cidade</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>CEP</TableHead>
          <TableHead>Data Nascimento</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.cpf}>
            <TableCell className="font-medium">{invoice.nome}</TableCell>
            <TableCell>{invoice.sexo}</TableCell>
            <TableCell>{invoice.cpf}</TableCell>
            <TableCell className="text-right">{invoice.email}</TableCell>
            <TableCell>{invoice.celular}</TableCell>
            <TableCell>{invoice.endereco}</TableCell>
            <TableCell>{invoice.cidade}</TableCell>
            <TableCell>{invoice.estado}</TableCell>
            <TableCell>{invoice.cep}</TableCell>
            <TableCell>{invoice.data_nasc}</TableCell>
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
            <h1 className="text-4xl font-bold">Funcionários</h1>
            <Button className="font-bold text-white">
              <Diff></Diff>
              Adicionar Funcionario
            </Button>
          </div>
          <TableDemo></TableDemo>
        </div>
      </Layout>
    </>
  );
};

export default Funcionarios;