"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Layout from "../_components/slide-bar";
import { Button } from "../_components/ui/button";
import { CalendarPlus, CalendarX2Icon } from "lucide-react";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import BotaoVoltar from "../_components/botao-voltar";

interface Evento {
  titulo: string;
  inicio: Date | string | null;
  fim: Date | string;
  diaTodo: boolean;
  descricao: string;
  status: string;
  cor: string;
  id: number;
  tipoEvento: string;
  dataDeCadastro: string;
  idOrcamento: number;
  idCliente: number;
  nomeCliente: string;
  dataEvento: string;
  horaEvento: string;
  localEvento: string;
  nomeEvento: string;
  idLocalEvento: number;
  endereco: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
  informacoes: string;
  observacao: string;
  codigoInterno: string;
  convidados: number;
  datasAdicionais: string[];
}

export default function Home() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [, setMostrarModalExcluir] = useState(false);
  const [, setIdParaExcluir] = useState<number | null>(null);
  const [novoEvento, setNovoEvento] = useState<Evento>({
    titulo: "",
    inicio: "",
    fim: "",
    diaTodo: false,
    descricao: "",
    status: "Pendente",
    cor: "#3788d8",
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
    datasAdicionais: [],
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
    setEventos([
      ...eventos,
      {
        ...novoEvento,
        inicio: novoEvento.inicio
          ? new Date(novoEvento.inicio).toISOString()
          : new Date().toISOString(),
        fim: novoEvento.fim
          ? new Date(novoEvento.fim).toISOString()
          : new Date().toISOString(),
      },
    ]);
    setMostrarModal(false);
    resetNovoEvento();
  }

  function resetNovoEvento() {
    setNovoEvento({
      titulo: "",
      inicio: "",
      fim: "",
      diaTodo: false,
      descricao: "",
      status: "Pendente",
      cor: "#3788d8",
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
      datasAdicionais: [],
    });
  }

  function fecharModal() {
    setMostrarModal(false);
    setMostrarModalExcluir(false);
    setIdParaExcluir(null);
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
          <BotaoVoltar redirecionar="/menu"></BotaoVoltar>
          <h1 className="mb-4 text-3xl font-bold">Calendário de Eventos</h1>
          <div className="flex w-full justify-end px-40">
            {" "}
            {/* Aplique o justify-end para alinhar os botões à direita */}
            <Button
              className="mr-2 w-40 rounded-xl bg-lime-800 font-bold text-white" // Adicionei "mr-2" para dar um espaçamento entre os botões
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
                .filter((e) => e.inicio && e.fim) // Filtra eventos com datas válidas
                .map((e) => ({
                  id: e.id.toString(), // Converte o ID para string
                  title: e.titulo,
                  start: e.inicio
                    ? new Date(e.inicio).toISOString()
                    : undefined, // Garante o formato ISO
                  end: e.fim ? new Date(e.fim).toISOString() : undefined, // Garante o formato ISO
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
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-6">
                  <Dialog.Panel className="relative w-full max-w-4xl transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:p-8">
                    <form onSubmit={adicionarEvento}>
                      <h3 className="text-lg font-medium text-gray-900">
                        Novo Evento
                      </h3>
                      <div className="mt-2">
                        <label>Título</label>
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
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="datetime-local"
                            name="inicio"
                            className="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={
                              novoEvento.inicio
                                ? novoEvento.inicio.toString()
                                : ""
                            }
                            onChange={alterarNovoEvento}
                            required
                          />
                        </div>
                        <div>
                          <input
                            type="datetime-local"
                            name="fim"
                            className="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={
                              novoEvento.fim ? novoEvento.fim.toString() : ""
                            }
                            onChange={alterarNovoEvento}
                            required
                          />
                        </div>
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
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            name="nomeCliente"
                            className="block w-full rounded-md border-gray-300 text-black shadow-sm sm:text-sm"
                            placeholder="Nome do Cliente"
                            value={novoEvento.nomeCliente}
                            onChange={alterarNovoEvento}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="localEvento"
                            className="block w-full rounded-md border-gray-300 text-black shadow-sm sm:text-sm"
                            placeholder="Local do Evento"
                            value={novoEvento.localEvento}
                            onChange={alterarNovoEvento}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="cidade"
                            className="block w-full rounded-md border-gray-300 text-black shadow-sm sm:text-sm"
                            placeholder="Cidade"
                            value={novoEvento.cidade}
                            onChange={alterarNovoEvento}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="estado"
                            className="block w-full rounded-md border-gray-300 text-black shadow-sm sm:text-sm"
                            placeholder="Estado"
                            value={novoEvento.estado}
                            onChange={alterarNovoEvento}
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <textarea
                          name="observacao"
                          className="block w-full rounded-md border-gray-300 text-black shadow-sm sm:text-sm"
                          placeholder="Observação"
                          value={novoEvento.observacao}
                          onChange={alterarNovoEvento}
                        />
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          className="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                          onClick={fecharModal}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                        >
                          Salvar
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
