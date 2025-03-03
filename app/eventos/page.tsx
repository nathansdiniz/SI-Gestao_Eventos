import React from "react";
import CustomCalendar from "@/app/_components/ui/big-calendar";
import Layout from "../_components/slide-bar";
import BotaoVoltar from "../_components/botao-voltar";
import CheckUserDialog from "../_components/dialog-verificarUsuario";

const CalendarPage: React.FC = () => {
  return (
    <>
      <Layout>
        {" "}
        <CheckUserDialog redirecionar="eventos"></CheckUserDialog>
        <main>
          <BotaoVoltar redirecionar="/menu"></BotaoVoltar>
          <h1 style={{ textAlign: "center", margin: "20px 0" }}>Eventos</h1>

          <CustomCalendar />
        </main>
      </Layout>
    </>
  );
};

export default CalendarPage;
