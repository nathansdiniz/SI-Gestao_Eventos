import Layout from "@/app/_components/slide-bar";
import { Building2Icon, Receipt, Users } from "lucide-react";
import CardMenu from "./_components/cards-menu";
import BotaoVoltar from "../_components/botao-voltar";

const Empresas = () => {
  return (
    <Layout>
      <div className="relative w-full space-y-6 p-6">
        <BotaoVoltar redirecionar="/menu"></BotaoVoltar>
        <div className="flex justify-center p-10">
          <h1 className="text-4xl font-bold">Area Administrativa</h1>
        </div>
        <div className="flex justify-center space-x-6 p-10">
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
        </div>
      </div>
    </Layout>
  );
};

export default Empresas;
