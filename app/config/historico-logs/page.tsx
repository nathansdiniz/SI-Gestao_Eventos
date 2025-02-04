import Layout from "@/app/_components/slide-bar";
import HistoricoLogsPage from "./_components/historico-layout";
import BotaoVoltar from "@/app/_components/botao-voltar";
import { ConsultaHistoricoLogs } from "@/app/_actions/historicosLogs";

// Definição do tipo retornado pela consulta
interface HistoricoLogsAPIResponse {
  userID: string | null;
  idHistoricoLogs: number;
  Descricao: string | null;
  datahora_alteracao: Date | null;
  HistoricoLogscol: string | null;
  status: string | null;
  acao_realizada: string | null;
}

// Função assíncrona da página
const PaginaHistoricoLogs = async () => {
  const dados: HistoricoLogsAPIResponse[] = await ConsultaHistoricoLogs();
  console.log(dados);
  // Mapear os dados para o tipo esperado pelo componente
  const historicoLogsData = dados.map((item) => ({
    userID: item.userID ?? "", // Preenchendo valores nulos, se necessário
    idHistoricoLogs: item.idHistoricoLogs,
    descricao: item.Descricao ?? "Sem descrição", // Transformando 'Descricao' em 'descricao'
    datahora_alteracao:
      item.datahora_alteracao?.toISOString() ?? new Date().toISOString(),
    HistoricoLogscol: item.HistoricoLogscol ?? "",
    status: item.status ?? "Desconhecido", // Adicionando status caso não exista
    acao_realizada: item.acao_realizada ?? "Ação não especificada", // Preenchendo valor padrão
    dados_acao: {}, // Pode ser ajustado conforme a estrutura dos dados
  }));

  return (
    <Layout>
      <BotaoVoltar redirecionar="/config"></BotaoVoltar>
      <HistoricoLogsPage data={historicoLogsData}></HistoricoLogsPage>
    </Layout>
  );
};

export default PaginaHistoricoLogs;
