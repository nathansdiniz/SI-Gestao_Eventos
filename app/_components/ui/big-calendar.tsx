"use client";
import React, { useState, useEffect } from "react";
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "./button";
import AddEventDialog from "./AddEventDialog";
import EventDetailsDialog from "./EditEventDialog";
import { PlusIcon } from "lucide-react";

const Calendar: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<
    EventClickArg["event"] | null
  >(null);

  // Novos estados para os campos do evento
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [newEventDescription, setNewEventDescription] = useState<string>("");
  const [newEventColor, setNewEventColor] = useState<string>("#000000");
  const [newEventStatus, setNewEventStatus] = useState<string>("Pendente");
  const [newEventEndDate, setNewEventEndDate] = useState<string>("");
  const [newEventAllDay, setNewEventAllDay] = useState<boolean>(true);

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) setCurrentEvents(JSON.parse(savedEvents));
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(currentEvents));
  }, [currentEvents]);

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsAddDialogOpen(true);
  };

  const handleEventClick = (event: EventClickArg) => {
    console.log("Evento selecionado:", event.event); // Verifique a estrutura do evento aqui
    setSelectedEvent(event.event); // Acesse o evento via `event.event`
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setNewEventTitle("");
    setNewEventDescription("");
    setNewEventColor("#000000");
    setNewEventStatus("Pendente");
    setNewEventEndDate("");
    setNewEventAllDay(true);
  };

  const handleAddEvent = (newEvent: any) => {
    const calendarApi = selectedDate!.view.calendar;
    calendarApi.addEvent(newEvent);
  };

  const handleEditEvent = () => {
    if (selectedEvent) {
      selectedEvent.setProp("title", newEventTitle || selectedEvent.title);
      selectedEvent.setProp("backgroundColor", newEventColor);
      selectedEvent.setExtendedProp("description", newEventDescription);
      selectedEvent.setExtendedProp("status", newEventStatus);
      handleCloseDialog();
    }
  };

  const handleUpdateEvent = (updatedEvent: any) => {
    // Lógica para atualizar o evento
    console.log("Evento atualizado:", updatedEvent);
    setIsDialogOpen(false); // Fechar o diálogo
  };

  const handleDeleteEvent = (eventId: string) => {
    // Lógica para excluir o evento
    console.log("Evento excluído:", eventId);
    setIsDialogOpen(false); // Fechar o diálogo
  };

  return (
    <div>
      <div className="flex items-center justify-between px-10">
        <h1 className="text-2xl font-bold">Calendário de Eventos</h1>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary">
          <PlusIcon></PlusIcon>
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
          initialEvents={
            typeof window !== "undefined"
              ? JSON.parse(localStorage.getItem("events") || "[]")
              : []
          }
        />
      </div>

      {/* Diálogo para Adicionar Novo Evento */}
      <AddEventDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddEvent={handleAddEvent}
        selectedDate={selectedDate}
      />

      {/* Diálogo para Editar/Excluir Evento */}
      {/* Dialog de Adição/Edição/Visualização */}
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
