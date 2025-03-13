import Layout from "@/app/_components/slide-bar";
import {
  Building2Icon,
  ListChecksIcon,
  Receipt,
  ReceiptTextIcon,
  User2Icon,
  Users,
} from "lucide-react";
import CardMenu from "./_components/cards-menu";
import BotaoVoltar from "../_components/botao-voltar";
import CheckUserDialog from "../_components/dialog-verificarUsuario";

const MenuAdministrativo = () => {
  return (
    <Layout>
      <CheckUserDialog redirecionar="menuAdministrativo" />
      <div className="relative w-full space-y-6 p-6">
        <BotaoVoltar redirecionar="/menu"></BotaoVoltar>
        <div className="flex justify-center p-10">
          <h1 className="text-4xl font-bold">Area Administrativa</h1>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 items-center justify-center gap-6 p-10 md:grid-cols-2 lg:grid-cols-3">
            <CardMenu
              title="Empresas"
              icon={<Building2Icon size={84}></Building2Icon>}
              descricao="Gerencie todas as empresas."
              redirecionar="/administrativo/empresas"
              size="large"
            ></CardMenu>
            <CardMenu
              title="Financeiro"
              icon={<Receipt size={84} />}
              descricao="Gerencie todas os funcionários."
              redirecionar="/administrativo/financeiro"
              size="large"
            ></CardMenu>
            <CardMenu
              title="Funcionários"
              icon={<Users size={84} />}
              descricao="Gerencie todas os funcionários."
              redirecionar="/administrativo/funcionarios"
              size="large"
            ></CardMenu>
            <CardMenu
              title="Orcamentos"
              icon={<ReceiptTextIcon size={84} />}
              descricao="Gerencie todas os Orcamentos."
              redirecionar="/administrativo/orcamentos"
              size="large"
            ></CardMenu>
            <CardMenu
              title="Validação"
              icon={
                <ListChecksIcon size={84} className="rounded-sm bg-green-800" />
              }
              descricao="Gerencie todas as validações do Financeiro Geral."
              redirecionar="/administrativo/validacao"
              size="large"
            ></CardMenu>
            <CardMenu
              title="Clientes"
              icon={<User2Icon size={84} />}
              descricao="Gerencie todas os clientes."
              redirecionar="/administrativo/clientes"
              size="large"
            ></CardMenu>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MenuAdministrativo;
