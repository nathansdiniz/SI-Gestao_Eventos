"use client";
import React, { useState, useEffect, useRef } from "react";
import { DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "./button";
import AddEventDialog from "./AddEventDialog";
import EventDetailsDialog from "./EditEventDialog";
import { PlusIcon } from "lucide-react";
import {
  fetchEventos,
  adicionarEvento,
  atualizarEvento,
  excluirEvento,
} from "@/app/_actions/eventos";

// Interface correspondente ao modelo do Prisma
interface Evento {
  id: number;
  tipoEvento: string;
  dataDeCadastro: Date;
  idOrcamento?: number | null;
  idCliente?: number | null;
  nomeCliente: string;
  dataEvento?: Date | null;
  horaEvento: string;
  localEvento?: string | null;
  nomeEvento?: string | null | undefined;
  idLocalEvento?: number | null;
  endereco?: string | null;
  numero?: number | null;
  complemento?: string | null;
  cep?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  estado?: string | null;
  informacoes?: string | null;
  observacao?: string | null;
  codigoInterno?: string | null;
  convidados: number;
  datasAdicionais: string | null;
  status: string | null;
  id_empresa: number;
  userID?: string | null;
  diaTodo: boolean;
}

const Calendar: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<
    EventClickArg["event"] | null
  >(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1,
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const calendarRef = useRef<any>(null);

  // Carrega os eventos do banco de dados
  useEffect(() => {
    const loadEventos = async () => {
      const eventos = await fetchEventos();
      const formattedEvents = eventos.map((evento: Evento) => ({
        id: evento.id.toString(),
        title: evento.nomeEvento ?? "Sem título",
        start: evento.dataEvento
          ? new Date(evento.dataEvento).toISOString()
          : new Date().toISOString(),
        end: evento.dataEvento
          ? new Date(evento.dataEvento).toISOString()
          : new Date().toISOString(),
        extendedProps: {
          tipoEvento: evento.tipoEvento,
          nomeCliente: evento.nomeCliente,
          localEvento: evento.localEvento,
          status: evento.status,
          diaTodo: evento.diaTodo,
        },
      }));
      setCurrentEvents(formattedEvents as unknown as EventApi[]);
    };

    loadEventos();
  }, []);

  // Função para adicionar um evento
  const handleAddEvent = async (newEvent: {
    title: string;
    start: Date;
    end?: Date;
  }) => {
    const evento: Evento = {
      id: 0, // ID será gerado pelo banco de dados
      tipoEvento: "Evento",
      dataDeCadastro: new Date(),
      nomeCliente: "Cliente Padrão",
      horaEvento: newEvent.start.toISOString(),
      dataEvento: newEvent.start,
      localEvento: "Local Padrão",
      nomeEvento: newEvent.title,
      convidados: 0,
      datasAdicionais: "",
      status: "Pendente",
      id_empresa: 1, // Defina o ID da empresa
      diaTodo: false,
    };

    try {
      const eventoAdicionado = await adicionarEvento(evento);
      const calendarApi = selectedDate!.view.calendar;
      calendarApi.addEvent({
        id: eventoAdicionado.id.toString(),
        title: eventoAdicionado.nomeEvento || "Sem título",
        start: eventoAdicionado.dataEvento?.toISOString(),
        end: eventoAdicionado.dataEvento?.toISOString(),
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar evento:", error);
    }
  };

  // Função para atualizar um evento
  const handleUpdateEvent = async (updatedEvent: EventApi) => {
    const evento: Evento = {
      id: Number(updatedEvent.id),
      tipoEvento: updatedEvent.extendedProps.tipoEvento,
      dataDeCadastro: new Date(),
      nomeCliente: updatedEvent.extendedProps.nomeCliente,
      horaEvento: updatedEvent.start?.toString() || "",
      dataEvento: updatedEvent.start ? new Date(updatedEvent.start) : undefined,
      localEvento: updatedEvent.extendedProps.localEvento,
      nomeEvento: updatedEvent.title,
      convidados: 0,
      datasAdicionais: "",
      status: updatedEvent.extendedProps.status,
      id_empresa: 1, // Defina o ID da empresa
      diaTodo: false,
    };

    try {
      await atualizarEvento(evento);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
    }
  };

  // Função para excluir um evento
  const handleDeleteEvent = async (eventId: string) => {
    try {
      await excluirEvento(Number(eventId));
      setCurrentEvents(currentEvents.filter((event) => event.id !== eventId));
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
    }
  };

  // Função para navegar para o mês e ano selecionados
  const navigateToMonthYear = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(new Date(selectedYear, selectedMonth - 1, 1));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-10">
        <h1 className="text-2xl font-bold">Calendário de Eventos</h1>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary">
          <PlusIcon />
          Adicionar Evento
        </Button>
      </div>

      {/* Componente de seleção de mês e ano */}
      <div className="mt-4 flex items-center gap-4 px-10">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="rounded-md border p-2 dark:bg-gray-950"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {new Date(0, month - 1).toLocaleString("pt-BR", {
                month: "long",
              })}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="rounded-md border p-2 dark:bg-gray-950"
        >
          {Array.from(
            { length: 10 },
            (_, i) => new Date().getFullYear() + i,
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <Button onClick={navigateToMonthYear} className="bg-blue-500">
          Ir para
        </Button>
      </div>

      <div className="mt-8 px-10">
        <FullCalendar
          ref={calendarRef}
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
          select={(selected) => {
            setSelectedDate(selected);
            setIsAddDialogOpen(true);
          }}
          eventClick={(event) => {
            setSelectedEvent(event.event);
            setIsDialogOpen(true);
          }}
          events={currentEvents}
          buttonText={{
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
            list: "Lista",
          }}
        />
      </div>

      <AddEventDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        selectedDate={
          selectedDate || { start: new Date(), end: new Date(), allDay: true }
        }
        onSave={function (eventData: Evento): void {
          throw new Error("Function not implemented.");
        }}
      />

      <EventDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onEditEvent={() => setIsAddDialogOpen(true)}
        onDeleteEvent={handleDeleteEvent}
        selectedEvent={selectedEvent}
      />
    </div>
  );
};

export default Calendar;
