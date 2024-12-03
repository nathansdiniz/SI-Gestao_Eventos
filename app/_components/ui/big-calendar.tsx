"use client";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import Modal from "@/app/_components/Modal";
import { ptBR } from "date-fns/locale";

const locales = {
  "pt-BR": ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

const CalendarComponent = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Reunião com Cliente",
      start: new Date(2024, 10, 26, 10, 0),
      end: new Date(2024, 10, 26, 12, 0),
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    const newEvent = {
      id: events.length + 1,
      title: "Novo Evento",
      start: slotInfo.start,
      end: slotInfo.end,
    };
    setEvents([...events, newEvent]);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId));
    setModalOpen(false);
  };

  return (
    <div>
      <div style={{ height: "80vh" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot} // Adicionar novos eventos
          onSelectEvent={handleSelectEvent} // Ver detalhes do evento
          style={{ height: "100%" }}
        />
      </div>
      {isModalOpen && selectedEvent && (
        <Modal
          event={selectedEvent}
          onClose={() => setModalOpen(false)}
          onDelete={() => handleDeleteEvent(selectedEvent.id)}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
