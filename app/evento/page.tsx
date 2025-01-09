import React from "react";
import CustomCalendar from "@/app/_components/ui/big-calendar";
import Layout from "../_components/slide-bar";

const CalendarPage: React.FC = () => {
  return (
    <>
      <Layout>
        {" "}
        <main>
          <h1 style={{ textAlign: "center", margin: "20px 0" }}>
            Calendário de Eventos
          </h1>

          <CustomCalendar />
        </main>
      </Layout>
    </>
  );
};

export default CalendarPage;
