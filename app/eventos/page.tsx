import React from "react";
import CustomCalendar from "@/app/_components/ui/big-calendar";
import Layout from "../_components/slide-bar";
import BotaoVoltar from "../_components/botao-voltar";
import CheckUserDialog from "../_components/dialog-verificarUsuario";
import BotaoRedirecionar from "../_components/ui/botao-redirecionar";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const CalendarPage: React.FC = () => {
  return (
    <>
      <Layout>
        {" "}
        <CheckUserDialog redirecionar="eventos"></CheckUserDialog>
        <main>
          <BotaoVoltar redirecionar="/menu"></BotaoVoltar>

          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <BotaoRedirecionar
              icone={<ArrowBigLeft />}
              titulo="Eventos Anteriores"
              redirecionar="/eventos/eventos-anteriores"
            ></BotaoRedirecionar>
            <BotaoRedirecionar
              icone={<ArrowBigRight></ArrowBigRight>}
              titulo="Próximos Eventos"
              redirecionar="/eventos/proximos-eventos"
            ></BotaoRedirecionar>
          </div>

          <CustomCalendar />
        </main>
      </Layout>
    </>
  );
};

export default CalendarPage;
