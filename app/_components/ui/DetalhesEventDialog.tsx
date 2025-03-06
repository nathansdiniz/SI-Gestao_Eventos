"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "./button";
import AddEventDialog from "./AddEventDialog";
import { ListPlusIcon } from "lucide-react";
import Link from "next/link";
import { Evento } from "@/app/_props";

interface EventDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteEvent: (eventId: string) => void;
  onEditEvent: (eventData: Evento) => void; // Passa os dados do evento para edição
  selectedEvent: any; // Evento selecionado
}

const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({
  isOpen,
  onClose,
  onDeleteEvent,
  onEditEvent,
  selectedEvent,
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  const handleEditEvent = () => {
    setIsAddDialogOpen(true);
  };

  const formatSelectedEvent = (event: any): Evento => {
    if (!event) {
      return {
        id: 0,
        tipoEvento: "",
        dataDeCadastro: new Date(),
        idOrcamento: null,
        idCliente: null,
        nomeCliente: "",
        dataEvento: null,
        horaEvento: "",
        localEvento: "",
        nomeEvento: "",
        idLocalEvento: null,
        endereco: "",
        numero: null,
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
        status: "",
        horarioInicio: "", // Inicializando
        horarioFim: "", // Inicializando
        id_empresa: 1,
        userID: null,
        diaTodo: false,
      };
    }

    return {
      id: Number(event.id),
      tipoEvento: event.extendedProps.tipoEvento,
      dataDeCadastro: new Date(),
      idOrcamento: event.extendedProps.idOrcamento || null,
      idCliente: event.extendedProps.idCliente || null,
      nomeCliente: event.extendedProps.nomeCliente,
      dataEvento: event.start ? new Date(event.start) : null,
      horaEvento: event.start ? new Date(event.start).toTimeString() : "",
      localEvento: event.extendedProps.localEvento,
      nomeEvento: event.title,
      idLocalEvento: event.extendedProps.idLocalEvento || null,
      endereco: event.extendedProps.endereco || "",
      numero: event.extendedProps.numero || null,
      complemento: event.extendedProps.complemento || "",
      cep: event.extendedProps.cep || "",
      bairro: event.extendedProps.bairro || "",
      cidade: event.extendedProps.cidade || "",
      estado: event.extendedProps.estado || "",
      informacoes: event.extendedProps.informacoes,
      observacao: event.extendedProps.observacao,
      codigoInterno: "",
      convidados: event.extendedProps.convidados || 0,
      datasAdicionais: event.extendedProps.datasAdicionais || "",
      status: event.extendedProps.status,
      horarioInicio: event.extendedProps.horarioInicio || "", // Inicializando
      horarioFim: event.extendedProps.horarioFim || "", // Inicializando
      id_empresa: event.id_empresa || 1, // Defina o ID da empresa conforme necessário
      userID: null,
      diaTodo: event.allDay || false,
    };
  };

  return (
    <>
      <AddEventDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        defaultValues={formatSelectedEvent(selectedEvent)}
        selectedDate={
          selectedEvent || { start: new Date(), end: new Date(), allDay: true }
        }
        onSave={(eventData: Evento) => {
          onEditEvent(eventData);
          setIsAddDialogOpen(false);
        }}
      />

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Detalhes do Evento
            </DialogTitle>
          </DialogHeader>

          {/* Visualização do Evento */}
          <div className="grid grid-cols-2 gap-4 p-5">
            <div>
              <p>
                <strong className="text-sm">Título:</strong>{" "}
                <span className="text-sm">{selectedEvent?.title}</span>
              </p>
              <p>
                <strong className="text-sm">Descrição:</strong>{" "}
                <span className="text-sm">
                  {selectedEvent?.extendedProps?.informacoes || "Sem descrição"}
                </span>
              </p>
              <p>
                <strong className="text-sm">Status:</strong>{" "}
                <span className="text-sm">
                  {selectedEvent?.extendedProps?.status}
                </span>
              </p>
              <p>
                <strong className="text-sm">Data e Hora:</strong>{" "}
                <span className="text-sm">
                  {selectedEvent?.start
                    ? new Date(selectedEvent.start).toLocaleString()
                    : "Não definido"}
                </span>
              </p>
              <p>
                <strong className="text-sm">Horário de Início:</strong>{" "}
                <span className="text-sm">
                  {selectedEvent?.extendedProps?.horarioInicio ||
                    "Não definido"}
                </span>
              </p>
              <p>
                <strong className="text-sm">Horário de Fim:</strong>{" "}
                <span className="text-sm">
                  {selectedEvent?.extendedProps?.horarioFim || "Não definido"}
                </span>
              </p>
              <p>
                <strong className="text-sm">Local:</strong>{" "}
                <span className="text-sm">
                  {selectedEvent?.extendedProps?.localEvento || "Não definido"}
                </span>
              </p>
              <p>
                <strong className="text-sm">Cliente:</strong>{" "}
                <span className="text-sm">
                  {selectedEvent?.extendedProps?.nomeCliente || "Não definido"}
                </span>
              </p>
              <p>
                <strong className="text-sm">Convidados:</strong>{" "}
                <span className="text-sm">
                  {selectedEvent?.extendedProps?.convidados || 0}
                </span>
              </p>
              <p>
                <strong className="text-sm">Observação:</strong>{" "}
                <span className="text-sm">
                  {selectedEvent?.extendedProps?.observacao || "Nenhuma"}
                </span>
              </p>
            </div>
            <div>
              <p>
                <strong className="text-sm">Tipo de Evento:</strong>{" "}
                <span className="text-sm">
                  {selectedEvent?.extendedProps?.tipoEvento || "Não definido"}
                </span>
              </p>
              <p>
                <strong className="text-sm">Endereço:</strong>{" "}
                <span className="text-sm">
                  {selectedEvent?.extendedProps?.endereco || "Não definido"}
                </span>
              </p>
              <p>
                <strong className="text-sm">Número:</strong>{" "}
                <span className="text-sm">
                  {selectedEvent?.extendedProps?.numero || "Não definido"}
                </span>
              </p>
              <p>
                <strong className="text-sm">Complemento:</strong>{" "}
                <span className="text-sm">
                  {selectedEvent?.extendedProps?.complemento || "Não definido"}
                </span>
              </p>
              <p>
                <strong className="text-sm">CEP:</strong>{" "}
                <span className="text-sm">
                  {selectedEvent?.extendedProps?.cep || "Não definido"}
                </span>
              </p>
              <p>
                <strong className="text-sm">Bairro:</strong>{" "}
                <span className="text-sm">
                  {selectedEvent?.extendedProps?.bairro || "Não definido"}
                </span>
              </p>
              <p>
                <strong className="text-sm">Cidade:</strong>{" "}
                {selectedEvent?.extendedProps?.cidade || "Não definido"}
              </p>
              <p>
                <strong className="text-sm">Estado:</strong>{" "}
                {selectedEvent?.extendedProps?.estado || "Não definido"}
              </p>
            </div>
            <div className="col-span-2 mt-5 flex justify-between">
              {selectedEvent ? (
                <Link href={`/eventos/${selectedEvent.id}/`}>
                  <ListPlusIcon />
                  Ver Detalhes
                </Link>
              ) : (
                <span>Ver Detalhes</span>
              )}
              <Button
                type="button"
                className="bg-yellow-500"
                onClick={handleEditEvent} // Abre o AddEventDialog
              >
                Editar
              </Button>
              <Button
                type="button"
                className="bg-red-700"
                onClick={() => onDeleteEvent(selectedEvent?.id)}
              >
                Excluir
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventDetailsDialog;
