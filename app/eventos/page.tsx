"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
<<<<<<< HEAD
import interactionPlugin, {
  Draggable,
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
=======
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
>>>>>>> f95ba52fe8c03ab8629510c9b2543e3f945f887c
import timeGridPlugin from "@fullcalendar/timegrid";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Layout from "../_components/slide-bar";
import { Button } from "../_components/ui/button";
import { CalendarPlus, CalendarX2Icon } from "lucide-react";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";

interface Evento {
  titulo: string;
  inicio: Date | string | null;
  diaTodo: boolean;
  descricao: string;
  status: string;
  cor: string;
  id: number;
  fim: Date | string;
}

export default function Home() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [, setMostrarModalExcluir] = useState(false);
  const [, setIdParaExcluir] = useState<number | null>(null);
  const [novoEvento, setNovoEvento] = useState<Evento>({
    titulo: "",
    inicio: "",
    diaTodo: false,
    descricao: "",
    status: "Pendente",
    cor: "#3788d8",
    id: 0,
    fim: "",
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
      inicio: arg.date,
      diaTodo: arg.allDay,
      id: new Date().getTime(),
    });
    setMostrarModal(true);
  }

  function adicionarEvento(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEventos([...eventos, novoEvento]);
    setMostrarModal(false);
    setNovoEvento({
      titulo: "",
      inicio: "",
      diaTodo: false,
      descricao: "",
      status: "Pendente",
      cor: "#3788d8",
      id: 0,
      fim: "",
    });
  }

  function fecharModal() {
    setMostrarModal(false);
    setMostrarModalExcluir(false);
    setIdParaExcluir(null);
  }

  function aoClicarEvento(info: EventClickArg) {
    const eventoClicado = eventos.find(
      (evento) => evento.titulo === info.event.title,
    );
    if (eventoClicado) {
      setNovoEvento(eventoClicado);
      setMostrarModal(true);
    }
  }
  function aoRedimensionarEvento(info: EventResizeDoneArg) {
    const eventoAtualizado = eventos.map((evento) => {
      if (evento.id.toString() === info.event.id) {
        // Usando 'id' ao invés de 'titulo'
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
      if (evento.titulo === info.event.title) {
        return {
          ...evento,
          inicio: info.event.start, // Nova data de início
        };
      }
      return evento;
    });
    setEventos(eventoAtualizado);
  }

  function alterarNovoEvento(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setNovoEvento({
      ...novoEvento,
      [name]: value,
    });
  }

  const [, setDialogIsOpen] = useState(false);
  return (
    <>
      <Layout>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-gray-100">
          <h1 className="mb-4 text-3xl font-bold">Calendário de Eventos</h1>
          <div className="flex w-full justify-end px-40">
            {" "}
            {/* Aplique o justify-end para alinhar os botões à direita */}
            <Button
              className="mr-2 w-40 rounded-xl bg-lime-800 font-bold text-white" // Adicionei "mr-2" para dar um espaçamento entre os botões
              onClick={() => aoClicarData}
            >
              <CalendarPlus />
              Adicionar Eventos
            </Button>
            <Button
              className="w-40 rounded-xl bg-red-900 font-bold text-white"
              onClick={() => setDialogIsOpen(true)}
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
                right: "dayGridMonth,timeGridWeek",
              }}
              locale="pt-br"
              events={eventos.map((e) => ({
                titulo: e.titulo,
                inicio: e.inicio,
                cor: e.cor,
                descricao: e.descricao,
                fim: e.fim,
              }))}
              dateClick={aoClicarData}
              eventClick={aoClicarEvento}
              editable={true} // Permite arrastar eventos
              droppable={true} // Permite soltar eventos
              eventDrop={aoArrastarEvento} // Função para lidar com mudanças de data
              eventResize={aoRedimensionarEvento} // Função para lidar com mudanças de duração
            />
          </div>

          <Transition.Root show={mostrarModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={fecharModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg sm:p-6">
                    <form onSubmit={adicionarEvento}>
                      <h3 className="text-lg font-medium text-gray-900">
                        Novo Evento
                      </h3>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="titulo"
                          className="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Título"
                          value={novoEvento.titulo}
                          onChange={alterarNovoEvento}
                          required
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="datetime-local"
                          name="inicio"
                          className="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={`${novoEvento.inicio}`}
                          onChange={alterarNovoEvento}
                          required
                        />
                      </div>
                      <div className="mt-2">
                        <textarea
                          name="descricao"
                          className="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Descrição"
                          value={novoEvento.descricao}
                          onChange={alterarNovoEvento}
                        />
                      </div>
                      <div className="mt-2">
                        <select
                          name="status"
                          className="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={novoEvento.status}
                          onChange={alterarNovoEvento}
                        >
                          <option value="Pendente">Pendente</option>
                          <option value="Confirmado">Confirmado</option>
                          <option value="Cancelado">Cancelado</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <input
                          type="color"
                          name="cor"
                          className="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={novoEvento.cor}
                          onChange={alterarNovoEvento}
                        />
                      </div>
                      <div className="mt-5 sm:mt-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Adicionar
                        </button>
                        <button
                          type="button"
                          className="ml-2 inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                          onClick={fecharModal}
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </main>
      </Layout>
    </>
  );
}
