import React from "react";
import Layout from "../_components/slide-bar";

import EmitirRelatoriosPage from "./_components/emissao-relatorios";
import BotaoVoltar from "../_components/botao-voltar";
import CheckUserDialog from "../_components/dialog-verificarUsuario";

const ReportPage: React.FC = () => {
  return (
    <Layout>
      <CheckUserDialog redirecionar="relatorios"></CheckUserDialog>
      <BotaoVoltar redirecionar="/menu"></BotaoVoltar>
      <EmitirRelatoriosPage></EmitirRelatoriosPage>
    </Layout>
  );
};

export default ReportPage;
