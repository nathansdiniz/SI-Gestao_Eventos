"use client";
import React, { useState, useEffect } from "react";
import { DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "./button";
import AddEventDialog from "./AddEventDialog";
import EventDetailsDialog from "./EditEventDialog";
import { PlusIcon } from "lucide-react";

const Calendar: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<
    EventClickArg["event"] | null
  >(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("events");
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsAddDialogOpen(true);
  };

  const handleEventClick = (event: EventClickArg) => {
    setSelectedEvent(event.event);
    setIsDialogOpen(true);
  };

  const handleAddEvent = (newEvent: {
    title: string;
    start: Date;
    end?: Date;
  }) => {
    const calendarApi = selectedDate!.view.calendar;
    calendarApi.addEvent(newEvent);
  };

  const handleUpdateEvent = (updatedEvent: EventApi) => {
    console.log("Evento atualizado:", updatedEvent);
    setIsDialogOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    console.log("Evento excluído:", eventId);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between px-10">
        <h1 className="text-2xl font-bold">Calendário de Agendamentos</h1>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary">
          <PlusIcon />
          Adicionar Evento
        </Button>
      </div>

      <div className="mt-8 px-10">
        <FullCalendar
          height="80vh"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          locale="pt-br"
          editable={true}
          selectable={true}
          dayMaxEvents={true}
          select={handleDateClick}
          eventClick={handleEventClick}
          eventsSet={(events) => setCurrentEvents(events)}
          initialEvents={[]} // Remove o acesso direto ao localStorage
        />
      </div>

      <AddEventDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddEvent={handleAddEvent}
        selectedDate={
          selectedDate || { start: new Date(), end: new Date(), allDay: true }
        }
      />

      <EventDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
        selectedEvent={selectedEvent}
      />
    </div>
  );
};

export default Calendar;
