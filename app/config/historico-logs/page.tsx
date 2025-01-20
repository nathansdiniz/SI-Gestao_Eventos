import Layout from "@/app/_components/slide-bar";
import HistoricoLogsPage from "./_components/historico-layout";
import BotaoVoltar from "@/app/_components/botao-voltar";

const PaginaHistoricoLogs = () => {
  return (
    <Layout>
      <BotaoVoltar redirecionar="/config"></BotaoVoltar>
      <HistoricoLogsPage></HistoricoLogsPage>
    </Layout>
  );
};

export default PaginaHistoricoLogs;
