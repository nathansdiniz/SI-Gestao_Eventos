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
import { CalendarPlus, CircleCheckBigIcon } from "lucide-react";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import BotaoVoltar from "../_components/botao-voltar";
import { AddEventDialog } from "./_components/add-editarAgenda"; // Importe o AddEventDialog
import {
  adicionarEvento,
  atualizarEvento,
  dadosAgenda,
} from "@/app/_actions/agenda";
import { toast } from "sonner";
import { EditEventDialog } from "./_components/Detalhesdialog";

export interface Agenda {
  idAgendaGeral: number;
  titulo_agenda: string | null;
  tipo_agenda: number | null; // Corrigido para string | null
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

export default function Layout_Agenda() {
  const [eventos, setEventos] = useState<Agenda[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para controlar o modal de adição
  const [mostrarModalDetalhes, setMostrarModalDetalhes] = useState(false); // Estado para controlar o modal de adição
  const [idAgendaGeral, setIdAgendaGeral] = useState<number>(0);

  console.log(idAgendaGeral);
  const [novoEvento, setNovoEvento] = useState<Agenda>({
    idAgendaGeral: 0,
    titulo_agenda: "",
    tipo_agenda: 0,
    responsavel_agenda: "",
    datahora_inicial: new Date().toISOString(),
    datahora_final: new Date().toISOString(),
    localizacao: "",
    informacoes_extras: "",
    userID: "",
    data_criacao: new Date().toISOString(),
    data_atualizacao: new Date().toISOString(),
    status_compromisso: "Pendente",
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
  /* function aoClicarData(arg: { date: Date; allDay: boolean }) {
    setNovoEvento({
      ...novoEvento,
      datahora_inicial: new Date(arg.date).toString(),
      diaTodo: arg.allDay,
      idAgendaGeral: new Date().getTime(),
    });
    setMostrarModal(true); // Abre o modal de adição
  }*/

  // Função para lidar com o clique em um evento no calendário
  function aoClicarEvento(info: EventClickArg) {
    const eventoClicado = eventos.find(
      (evento) => evento.idAgendaGeral.toString() === info.event.id,
    );

    if (eventoClicado) {
      console.log("Evento Clicado:", eventoClicado);
      setNovoEvento(eventoClicado);
      setIdAgendaGeral(eventoClicado.idAgendaGeral);
      setMostrarModalDetalhes(true); // Abre o modal de detalhes
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
      localizacao: info.event.extendedProps.localizacao,
      informacoes_extras: info.event.extendedProps.informacoes_extras,
      status_compromisso: info.event.extendedProps.status_compromisso ?? "",
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
      localizacao: info.event.extendedProps.localizacao,
      informacoes_extras: info.event.extendedProps.informacoes_extras,
      status_compromisso: info.event.extendedProps.status_compromisso ?? "",
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
  const handleAdicionarEvento = async (evento: Agenda) => {
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
        responsavel_agenda: evento.responsavel_agenda ?? "",
        localizacao: evento.localizacao ?? "",
        informacoes_extras: evento.informacoes_extras ?? "",
        status_compromisso: evento.status_compromisso ?? "",
      });
      setEventos([
        ...eventos,
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
              color: (() => {
                switch (e.status_compromisso) {
                  case "Pendente":
                    return "yellow";
                  case "Confirmado":
                    return "green";
                  case "Concluido":
                    return "green";
                  case "Cancelado":
                    return "red";
                  default:
                    return "#007300"; // Cor padrão
                }
              })(),
              extendedProps: {
                responsavel_agenda: e.responsavel_agenda,
                localizacao: e.localizacao,
                informacoes_extras: e.informacoes_extras,
                status_compromisso: e.status_compromisso,
              },
            }))}
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
          const evento: Agenda = {
            idAgendaGeral: novoEvento.idAgendaGeral,
            titulo_agenda: data.titulo_agenda,
            tipo_agenda: novoEvento.tipo_agenda,
            responsavel_agenda: data.responsavel_agenda,
            datahora_inicial: data.datahora_inicial
              ? data.datahora_inicial.toString()
              : new Date().toISOString(),
            datahora_final: data.datahora_final
              ? data.datahora_final.toString()
              : new Date().toISOString(),
            localizacao: data.localEvento ?? "",
            informacoes_extras: data.informacoes_extras ?? "",
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
          ...novoEvento,
        }}
      />
      <EditEventDialog
        isOpen={mostrarModalDetalhes}
        onClose={() => setMostrarModalDetalhes(false)}
        evento={novoEvento}
        onConfirm={(idAgendaGeral) => {
          setEventos(
            eventos.filter((evento) => evento.idAgendaGeral !== idAgendaGeral),
          );
          setMostrarModalDetalhes(false);
        }}
      />

      {/* Modal de Excluir Evento */}
    </main>
  );
}
