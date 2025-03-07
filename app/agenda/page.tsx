import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import CheckUserDialog from "../_components/dialog-verificarUsuario";
import Layout from "../_components/slide-bar";
import BotaoRedirecionar from "../_components/ui/botao-redirecionar";
import Layout_Agenda from "./layout-agenda";

const PaginaAgenda = async () => {
  return (
    <Layout>
      <CheckUserDialog redirecionar="agenda"></CheckUserDialog>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <BotaoRedirecionar
          icone={<ArrowBigLeft />}
          titulo="Compromissos Anteriores"
          redirecionar="/agenda/anteriores"
        ></BotaoRedirecionar>
        <BotaoRedirecionar
          icone={<ArrowBigRight></ArrowBigRight>}
          titulo="Próximos Compromissos"
          redirecionar="/agenda/proximos"
        ></BotaoRedirecionar>
      </div>
      <>
        <Layout_Agenda></Layout_Agenda>
      </>
    </Layout>
  );
};

export default PaginaAgenda;
