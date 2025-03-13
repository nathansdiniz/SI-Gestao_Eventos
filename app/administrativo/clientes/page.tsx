import Layout from "@/app/_components/slide-bar";
import BotaoVoltar from "@/app/_components/botao-voltar";
import AdicionarClienteButton from "./_components/add-Cliente";
import CheckUserDialog from "@/app/_components/dialog-verificarUsuario";
import { getClientes } from "@/app/_actions/clientes";
import ClientesClient from "./_components/clientes-client";

export interface Cliente {
  id: number;
  tipoCadastro: string | null;
  cliente: string;
  cpf_cnpj_cliente: string | null;
  razaoSocial: string | null;
  nomeFantasia: string | null;
  inscricaoMunicipal: string | null;
  inscricaoEstadual: string | null;
  sexo: string | null;
  data_nasc: Date | null;
  estadoCivil: string | null;
  email: string | null;
  telefone: string | null;
  endereco: string | null;
  cep: string | null;
  complemento: string | null;
  cidade: string | null;
  estado: string | null;
  pais: string | null;
  pontoReferencia: string | null;
  anotacoes: string | null;
  dataCadastro: Date;
  ddiTelefone: string | null;
  ddiTelefone2: string | null;
  telefone2: string | null;
  ddiCelular: string | null;
  celular: string | null;
  redeSocial: string | null;
  id_empresa: number | null;
  userID: string | null;
}

const Clientes = async () => {
  const invoices = await getClientes();

  return (
    <>
      <Layout>
        <CheckUserDialog redirecionar="clientes"></CheckUserDialog>
        <div className="space-y-6 p-6">
          <BotaoVoltar redirecionar="/menu"></BotaoVoltar>
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">Clientes</h1>
            <AdicionarClienteButton></AdicionarClienteButton>
          </div>
          <ClientesClient allClientes={invoices}></ClientesClient>
        </div>
      </Layout>
    </>
  );
};

export default Clientes;
