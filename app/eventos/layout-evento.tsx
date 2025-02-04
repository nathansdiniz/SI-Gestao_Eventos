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
import { CalendarPlus, CalendarX2Icon } from "lucide-react";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import BotaoVoltar from "../_components/botao-voltar";
import { DeleteEventDialog } from "./_components/excluir-eventos";

interface Evento {
  diaTodo: boolean;
  descricao: string | undefined;
  status: string;
  cor: string;
  id: number;
  tipoEvento: string | undefined;
  dataDeCadastro: string | undefined;
  idOrcamento: number | undefined;
  idCliente: number | undefined;
  nomeCliente: string | undefined;
  dataEvento: string | undefined;
  horaEvento: string | undefined;
  localEvento: string | undefined;
  nomeEvento: string | undefined;
  idLocalEvento: number | undefined;
  endereco: string | undefined;
  numero: string | undefined;
  complemento: string | undefined;
  cep: string | undefined;
  bairro: string | undefined;
  cidade: string | undefined;
  estado: string | undefined;
  informacoes: string | undefined;
  observacao: string | undefined;
  codigoInterno: string | undefined;
  convidados: number | undefined;
  datasAdicionais: string | undefined;
}

export default function Layout_Eventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [, setMostrarModal] = useState(false);
  const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false);
  const [novoEvento, setNovoEvento] = useState<Evento>({
    diaTodo: false,
    descricao: "",
    status: "",
    cor: "",
    id: 0,
    tipoEvento: "",
    dataDeCadastro: "",
    idOrcamento: 0,
    idCliente: 0,
    nomeCliente: "",
    dataEvento: "",
    horaEvento: "",
    localEvento: "",
    nomeEvento: "",
    idLocalEvento: 0,
    endereco: "",
    numero: "",
    complemento: "",
    cep: "",
    bairro: "",
    cidade: "",
    estado: "",
    informacoes: "",
    observacao: "",
    codigoInterno: "",
    convidados: 0,
    datasAdicionais: "",
  });

  useEffect(() => {
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

  function aoClicarData(arg: { date: Date; allDay: boolean }) {
    setNovoEvento({
      ...novoEvento,
      dataEvento: new Date(arg.date).toISOString(),
      diaTodo: arg.allDay,
      id: new Date().getTime(),
    });
    setMostrarModal(true);
  }

  function aoClicarEvento(info: EventClickArg) {
    const eventoClicado = eventos.find(
      (evento) => evento.id.toString() === info.event.id,
    );
    if (eventoClicado) {
      setNovoEvento(eventoClicado);
      setMostrarModal(true);
    }
  }

  function aoRedimensionarEvento(info: EventResizeDoneArg) {
    const eventoAtualizado = eventos.map((evento) => {
      if (evento.id.toString() === info.event.id) {
        return {
          ...evento,
          start: info.event.start,
        };
      }
      return evento;
    });
    setEventos(eventoAtualizado);
  }

  function aoArrastarEvento(info: EventDropArg) {
    const eventoAtualizado = eventos.map((evento) => {
      if (evento.nomeEvento === info.event.title) {
        return {
          ...evento,
          inicio: info.event.start,
        };
      }
      return evento;
    });
    setEventos(eventoAtualizado);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-gray-100">
      <BotaoVoltar redirecionar="/menu"></BotaoVoltar>
      <h1 className="mb-4 text-3xl font-bold">Calendário de Eventos</h1>
      <div className="flex w-full justify-end px-40">
        <Button
          className="mr-2 w-40 rounded-xl bg-lime-800 font-bold text-white"
          onClick={() => setMostrarModal(true)}
        >
          <CalendarPlus />
          Adicionar Eventos
        </Button>
        <Button
          className="w-40 rounded-xl bg-red-900 font-bold text-white"
          onClick={() => setMostrarModalExcluir(true)}
        >
          <CalendarX2Icon />
          Excluir Eventos
        </Button>
      </div>

      <div className="w-full max-w-6xl">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          locale="pt-br"
          events={eventos
            .filter((e) => e.dataEvento)
            .map((e) => ({
              id: e.id.toString(),
              title: e.nomeEvento,
              start: e.dataEvento
                ? new Date(e.dataEvento).toISOString()
                : undefined,
              backgroundColor: e.cor,
              extendedProps: {
                descricao: e.descricao,
                tipoEvento: e.tipoEvento,
                nomeCliente: e.nomeCliente,
                convidados: e.convidados,
                localEvento: e.localEvento,
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

      <DeleteEventDialog
        isOpen={mostrarModalExcluir}
        onClose={() => setMostrarModalExcluir(false)}
        onConfirm={() => {}}
      />
    </main>
  );
}
