import Layout from "@/app/_components/slide-bar";
import HistoricoLogsPage from "./_components/historico-layout";
import BotaoVoltar from "@/app/_components/botao-voltar";
import { ConsultaHistoricoLogs } from "@/app/_actions/historicosLogs";
import { clerkClient } from "@clerk/nextjs/server";

interface HistoricoLogsAPIResponse {
  userID: string | null;
  idHistoricoLogs: number;
  Descricao: string | null;
  datahora_alteracao: Date | null;
  HistoricoLogscol: string | null;
  status: string | null;
  acao_realizada: string | null;
}

const PaginaHistoricoLogs = async () => {
  const dados: HistoricoLogsAPIResponse[] = await ConsultaHistoricoLogs();

  const userNamesMap: Record<string, string> = {};

  const uniqueUserIds = [
    ...new Set(
      dados
        .map((item) => item.userID)
        .filter((id): id is string => id !== null),
    ),
  ];

  if (uniqueUserIds.length > 0) {
    const users = await clerkClient.users.getUserList({
      userId: uniqueUserIds,
    });

    // Acessar users.data para iterar corretamente
    users.data.forEach((user: any) => {
      userNamesMap[user.id] = user.firstName ?? "Usuário Desconhecido";
    });
  }

  const historicoLogsData = dados.map((item) => ({
    userID: userNamesMap[item.userID ?? ""] ?? "Usuário não encontrado",
    idHistoricoLogs: item.idHistoricoLogs,
    descricao: item.Descricao ?? "Sem descrição",
    datahora_alteracao:
      item.datahora_alteracao?.toISOString() ?? new Date().toISOString(),
    HistoricoLogscol: item.HistoricoLogscol ?? "",
    status: item.status ?? "Desconhecido",
    acao_realizada: item.acao_realizada ?? "Ação não especificada",
    dados_acao: {},
  }));

  return (
    <Layout>
      <BotaoVoltar redirecionar="/config"></BotaoVoltar>
      <HistoricoLogsPage data={historicoLogsData}></HistoricoLogsPage>
    </Layout>
  );
};

export default PaginaHistoricoLogs;
