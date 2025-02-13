"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { Button } from "../_components/ui/button";
import { CalendarPlus, CalendarX2Icon, CircleCheckBigIcon } from "lucide-react";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import BotaoVoltar from "../_components/botao-voltar";
import { DeleteEventDialog } from "./_components/excluir-eventos";
import { AddEventDialog } from "./_components/add-editarEvento"; // Importe o AddEventDialog
import {
  adicionarEvento,
  atualizarEvento,
  excluirEvento,
  dadosAgenda,
} from "@/app/_actions/agenda";
import { toast } from "sonner";

interface Evento {
  idAgendaGeral: number;
  titulo_agenda: string | null;
  tipo_agenda: number | null;
  responsavel_agenda: string | null;
  datahora_inicial: string | null;
  datahora_final: string | null;
  localizacao: string | null;
  informacoes_extras: string | null;
  userID: string | null;
  data_criacao: string | null;
  data_atualizacao: string | null;
  status_compromisso: string | null;
  id_empresa: number | null;
  diaTodo?: boolean;
}

export default function Layout_Eventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para controlar o modal de adição
  const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
  const [novoEvento, setNovoEvento] = useState<Evento>({
    idAgendaGeral: 0,
    titulo_agenda: "",
    tipo_agenda: 0,
    responsavel_agenda: "",
    datahora_inicial: "",
    datahora_final: "",
    localizacao: "",
    informacoes_extras: "",
    userID: "",
    data_criacao: "",
    data_atualizacao: "",
    status_compromisso: "",
    id_empresa: 1,
  });

  // Carrega os eventos do banco de dados
  useEffect(() => {
    async function fetchData() {
      const eventos = await dadosAgenda();
      setEventos(
        eventos.map((evento) => ({
          ...evento,
          datahora_inicial: evento.datahora_inicial
            ? new Date(evento.datahora_inicial).toISOString()
            : null,
          datahora_final: evento.datahora_final
            ? new Date(evento.datahora_final).toISOString()
            : null,
          data_criacao: evento.data_criacao
            ? new Date(evento.data_criacao).toISOString()
            : null,
          data_atualizacao: evento.data_atualizacao
            ? new Date(evento.data_atualizacao).toISOString()
            : null,
        })),
      );
    }
    fetchData();

    const elementoArrastavel = document.getElementById("draggable-el");
    if (elementoArrastavel) {
      new Draggable(elementoArrastavel, {
        itemSelector: ".fc-event",
        eventData: (elemento) => ({
          title: elemento.getAttribute("title"),
          id: elemento.getAttribute("data-id"),
        }),
      });
    }
  }, []);

  // Função para lidar com o clique em uma data no calendário
  function aoClicarData(arg: { date: Date; allDay: boolean }) {
    setNovoEvento({
      ...novoEvento,
      datahora_inicial: new Date(arg.date).toString(),
      diaTodo: arg.allDay,
      idAgendaGeral: new Date().getTime(),
    });
    setMostrarModal(true); // Abre o modal de adição
  }

  // Função para lidar com o clique em um evento no calendário
  function aoClicarEvento(info: EventClickArg) {
    const eventoClicado = eventos.find(
      (evento) => evento.idAgendaGeral.toString() === info.event.id,
    );
    if (eventoClicado) {
      setNovoEvento(eventoClicado);
      setMostrarModal(true); // Abre o modal de edição
    }
  }

  // Função para lidar com o redimensionamento de um evento
  function aoRedimensionarEvento(info: EventResizeDoneArg) {
    const eventoAtualizado = eventos.map((evento) => {
      if (evento.idAgendaGeral.toString() === info.event.id) {
        return {
          ...evento,
          datahora_inicial: info.event.start
            ? info.event.start.toISOString()
            : null,
          datahora_final: info.event.end ? info.event.end.toISOString() : null,
        };
      }
      return evento;
    });
    setEventos(eventoAtualizado);
    atualizarEvento({
      idAgendaGeral: Number(info.event.id),
      datahora_inicial: info.event.start ? info.event.start.toISOString() : "",
      datahora_final: info.event.end ? info.event.end.toISOString() : "",
      titulo_agenda: info.event.title,
    });
  }

  // Função para lidar com o arrastar e soltar de um evento
  async function aoArrastarEvento(info: EventDropArg) {
    const eventoAtualizado = eventos.map((evento) => {
      if (evento.idAgendaGeral.toString() === info.event.id) {
        return {
          ...evento,
          datahora_inicial: info.event.start
            ? info.event.start.toISOString()
            : null,
          datahora_final: info.event.end ? info.event.end.toISOString() : null,
        };
      }
      return evento;
    });
    setEventos(eventoAtualizado);
    await atualizarEvento({
      idAgendaGeral: Number(info.event.id),
      datahora_inicial: info.event.start ? info.event.start.toISOString() : "",
      datahora_final: info.event.end ? info.event.end.toISOString() : "",
      titulo_agenda: info.event.title,
    });
    toast("agenda salvo com sucesso!", {
      description: (
        <div className="flex items-center">
          <CircleCheckBigIcon className="mr-2 text-white" />
          <span>{`${info.event.title} atualizado em ${new Date().toLocaleString()}`}</span>
        </div>
      ),
      style: {
        background: "#007300",
        color: "#fff",
      },
    });
  }

  // Função para adicionar ou atualizar um evento
  const handleAdicionarEvento = async (evento: Evento) => {
    try {
      const novoEventoAdicionado = await adicionarEvento({
        idAgendaGeral: Number(evento.idAgendaGeral),
        datahora_inicial: evento.datahora_inicial
          ? new Date(evento.datahora_inicial).toISOString()
          : "",
        datahora_final: evento.datahora_final
          ? new Date(evento.datahora_final).toISOString()
          : "",
        titulo_agenda: evento.titulo_agenda ?? "",
      });
      setEventos([
        {
          idAgendaGeral: Number(evento.idAgendaGeral),
          datahora_inicial: evento.datahora_inicial
            ? new Date(evento.datahora_inicial).toISOString()
            : "",
          datahora_final: evento.datahora_final
            ? new Date(evento.datahora_final).toISOString()
            : "",
          titulo_agenda: evento.titulo_agenda ?? "",
          tipo_agenda: evento.tipo_agenda,
          responsavel_agenda: evento.responsavel_agenda,
          localizacao: evento.localizacao,
          informacoes_extras: evento.informacoes_extras,
          userID: evento.userID,
          data_criacao: evento.data_criacao,
          data_atualizacao: evento.data_atualizacao,
          status_compromisso: evento.status_compromisso,
          id_empresa: evento.id_empresa,
        },
        {
          ...novoEventoAdicionado,
          datahora_inicial: novoEventoAdicionado.datahora_inicial
            ? new Date(novoEventoAdicionado.datahora_inicial).toISOString()
            : "",
          datahora_final: novoEventoAdicionado.datahora_final
            ? new Date(novoEventoAdicionado.datahora_final).toISOString()
            : "",
          data_criacao: novoEventoAdicionado.data_criacao
            ? new Date(novoEventoAdicionado.data_criacao).toISOString()
            : null,
          data_atualizacao: novoEventoAdicionado.data_atualizacao
            ? new Date(novoEventoAdicionado.data_atualizacao).toISOString()
            : null,
        },
      ]); // Atualiza a lista de eventos
      setMostrarModal(false); // Fecha o modal
    } catch (error) {
      console.error("Erro ao adicionar evento:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-gray-100">
      <BotaoVoltar redirecionar="/menu"></BotaoVoltar>
      <h1 className="mb-4 text-3xl font-bold">Calendário Agenda</h1>
      <div className="flex w-full justify-end px-40">
        <Button
          className="mr-2 w-40 rounded-xl bg-lime-800 font-bold text-white"
          onClick={() => setMostrarModal(true)}
        >
          <CalendarPlus />
          Adicionar Agenda
        </Button>
        <Button
          className="w-40 rounded-xl bg-red-900 font-bold text-white"
          onClick={() => setMostrarModalExcluir(true)}
        >
          <CalendarX2Icon />
          Excluir Agenda
        </Button>
      </div>

      <div className="w-full">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          locale="pt-br"
          events={eventos
            .filter((e) => e.datahora_inicial)
            .map((e) => ({
              id: e.idAgendaGeral.toString(),
              title: e.titulo_agenda || undefined,
              start: e.datahora_inicial || undefined,
              end: e.datahora_final || undefined,
              backgroundColor: e.tipo_agenda === 1 ? "blue" : "green", // Exemplo de cor baseado no tipo_agenda
              extendedProps: {
                responsavel_agenda: e.responsavel_agenda,
                localizacao: e.localizacao,
                informacoes_extras: e.informacoes_extras,
                status_compromisso: e.status_compromisso,
              },
            }))}
          dateClick={aoClicarData}
          eventClick={aoClicarEvento}
          editable={true}
          droppable={true}
          eventDrop={aoArrastarEvento}
          eventResize={aoRedimensionarEvento}
        />
      </div>

      {/* Modal de Adicionar Evento */}
      <AddEventDialog
        isOpen={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onSubmit={(data) => {
          const evento: Evento = {
            idAgendaGeral: novoEvento.idAgendaGeral,
            titulo_agenda: data.titulo,
            tipo_agenda: novoEvento.tipo_agenda,
            responsavel_agenda: data.nomeCliente,
            datahora_inicial: data.inicio,
            datahora_final: data.fim,
            localizacao: data.localEvento,
            informacoes_extras: data.descricao ?? "",
            userID: novoEvento.userID,
            data_criacao: novoEvento.data_criacao,
            data_atualizacao: novoEvento.data_atualizacao,
            status_compromisso: novoEvento.status_compromisso,
            id_empresa: novoEvento.id_empresa,
            diaTodo: novoEvento.diaTodo,
          };
          handleAdicionarEvento(evento);
        }}
        defaultValues={{
          titulo: novoEvento.titulo_agenda || "",
          inicio: novoEvento.datahora_inicial || "",
          fim: novoEvento.datahora_final || "",
          nomeCliente: novoEvento.responsavel_agenda || "",
          localEvento: novoEvento.localizacao || "",
          descricao: novoEvento.informacoes_extras || "",
        }}
      />

      {/* Modal de Excluir Evento */}
      <DeleteEventDialog
        isOpen={mostrarModalExcluir}
        onClose={() => setMostrarModalExcluir(false)}
        onConfirm={() => {}}
      />
    </main>
  );
}
