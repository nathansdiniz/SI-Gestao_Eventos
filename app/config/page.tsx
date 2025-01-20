import Layout from "@/app/_components/slide-bar";
import {
  BellRingIcon,
  Building2Icon,
  HistoryIcon,
  Receipt,
  Users,
} from "lucide-react";
import CardMenu from "@/app/_components/cards-menu";
import BotaoVoltar from "../_components/botao-voltar";

const ConfiguracoesPage = () => {
  return (
    <Layout>
      <div className="relative w-full space-y-6 p-6">
        <BotaoVoltar redirecionar="/menu"></BotaoVoltar>
        <div className="flex justify-center p-10">
          <h1 className="text-4xl font-bold">Configurações do Sistema</h1>
        </div>
        <div className="flex justify-center space-x-6 p-10">
          <CardMenu
            title="Histórico de Logs"
            icon={<HistoryIcon size={84}></HistoryIcon>}
            descricao="Gerencie todas os logs do sistema."
            redirecionar="/config/historico-logs"
            size="large"
          ></CardMenu>
          <CardMenu
            title="Usuários"
            icon={<Users size={84} />}
            descricao="Gerencie todos os usuários."
            redirecionar="/config/"
            size="large"
          ></CardMenu>
          <CardMenu
            title="Notificações"
            icon={<BellRingIcon size={84} />}
            descricao="Gerencie todas as notificações do sistema."
            redirecionar="/config"
            size="large"
          ></CardMenu>
        </div>
      </div>
    </Layout>
  );
};

export default ConfiguracoesPage;
