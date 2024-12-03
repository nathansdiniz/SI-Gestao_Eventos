"use client";
import Layout from "../_components/slide-bar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { useState } from "react";

const Eventos = () => {
  const [events] = useState([
    { title: "event 1", id: "1" },
    { title: "event 2", id: "2" },
    { title: "event 3", id: "3" },
    { title: "event 4", id: "4" },
    { title: "event 5", id: "5" },
  ]);
  return (
    <>
      <Layout>
        {" "}
        <main>
          <h1 style={{ textAlign: "center", margin: "20px 0" }}>Eventos</h1>

          <div>
            <FullCalendar
              plugins={[
                resourceTimelinePlugin,
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "resourceTimelineWeek,dayGridMonth,timeGridWeek",
              }}
              locale="pt-br" // Define o idioma para português
              initialView="dayGridMonth"
              nowIndicator={true}
              editable={true}
              selectable={true}
              selectMirror={true}
            ></FullCalendar>
          </div>

          <div
            id="draggable-el"
            className="ml-8 mt-16 w-full rounded-md border-2 bg-violet-50 p-2 lg:h-1/2"
          >
            <h1 className="text-center text-lg font-bold">Drag Event</h1>
            {events.map((event) => (
              <div
                className="fc-event m-2 ml-auto w-full rounded-md border-2 bg-white p-1 text-center"
                title={event.title}
                key={event.id}
              >
                {event.title}
              </div>
            ))}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Eventos;
