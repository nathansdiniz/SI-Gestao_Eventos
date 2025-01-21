import React from "react";
import CustomCalendar from "@/app/_components/ui/big-calendar";
import Layout from "../_components/slide-bar";
import BotaoVoltar from "../_components/botao-voltar";

const CalendarPage: React.FC = () => {
  return (
    <>
      <Layout>
        {" "}
        <main>
          <BotaoVoltar redirecionar="/menu"></BotaoVoltar>
          <h1 style={{ textAlign: "center", margin: "20px 0" }}>Agenda</h1>

          <CustomCalendar />
        </main>
      </Layout>
    </>
  );
};

export default CalendarPage;
