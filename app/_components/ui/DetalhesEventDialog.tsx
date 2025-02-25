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

interface EventDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteEvent: (eventId: string) => void;
  onEditEvent: (eventData: Evento) => void; // Passa os dados do evento para edição
  selectedEvent: any; // Evento selecionado
}

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
      id_empresa: 1, // Defina o ID da empresa conforme necessário
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
          <div className="p-5">
            <p>
              <strong>Título:</strong> {selectedEvent?.title}
            </p>
            <p>
              <strong>Descrição:</strong>{" "}
              {selectedEvent?.extendedProps?.informacoes || "Sem descrição"}
            </p>
            <p>
              <strong>Status:</strong> {selectedEvent?.extendedProps?.status}
            </p>
            <p>
              <strong>Data e Hora:</strong>{" "}
              {selectedEvent?.start
                ? new Date(selectedEvent.start).toLocaleString()
                : "Não definido"}
            </p>
            <p>
              <strong>Local:</strong>{" "}
              {selectedEvent?.extendedProps?.localEvento || "Não definido"}
            </p>
            <p>
              <strong>Cliente:</strong>{" "}
              {selectedEvent?.extendedProps?.nomeCliente || "Não definido"}
            </p>
            <p>
              <strong>Convidados:</strong>{" "}
              {selectedEvent?.extendedProps?.convidados || 0}
            </p>
            <p>
              <strong>Observação:</strong>{" "}
              {selectedEvent?.extendedProps?.observacao || "Nenhuma"}
            </p>

            <div className="mt-5 flex justify-between">
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
