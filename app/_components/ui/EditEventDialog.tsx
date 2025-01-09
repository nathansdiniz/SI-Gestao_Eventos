import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "./button";

interface EventDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateEvent: (updatedEvent: any) => void;
  onDeleteEvent: (eventId: string) => void;
  selectedEvent: any; // Evento selecionado
}

const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({
  isOpen,
  onClose,
  onUpdateEvent,
  onDeleteEvent,
  selectedEvent,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Estado local para edição do evento
  const [eventTitle, setEventTitle] = useState<string>(
    selectedEvent?.title || "",
  );
  const [eventDescription, setEventDescription] = useState<string>(
    selectedEvent?.description || "",
  );
  const [eventColor, setEventColor] = useState<string>(
    selectedEvent?.backgroundColor || "#000000",
  );
  const [eventStatus, setEventStatus] = useState<string>(
    selectedEvent?.status || "Pendente",
  );
  const [eventStartDate, setEventStartDate] = useState<string>(
    selectedEvent?.start || "",
  );
  const [eventEndDate, setEventEndDate] = useState<string>(
    selectedEvent?.end || "",
  );
  console.log(selectedEvent);

  // Atualiza o estado do evento quando selectedEvent mudar
  useEffect(() => {
    if (selectedEvent) {
      setEventTitle(selectedEvent.title || "");
      setEventDescription(selectedEvent.description || "");
      setEventColor(selectedEvent.backgroundColor || "#000000");
      setEventStatus(selectedEvent.status || "Pendente");
      setEventStartDate(selectedEvent.start || "");
      setEventEndDate(selectedEvent.end || "");
    }
  }, [selectedEvent]);

  const handleUpdate = () => {
    const updatedEvent = {
      ...selectedEvent,
      title: eventTitle,
      description: eventDescription,
      backgroundColor: eventColor,
      status: eventStatus,
      start: eventStartDate,
      end: eventEndDate,
    };
    onUpdateEvent(updatedEvent);
    setIsEditing(false);
    onClose();
  };

  const handleDelete = () => {
    onDeleteEvent(selectedEvent.id);
    onClose();
  };
  console.log(selectedEvent);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEditing ? "Editar Evento" : "Detalhes do Evento"}
          </DialogTitle>
        </DialogHeader>

        {!isEditing ? (
          // Visualização do Evento
          <div className="p-5">
            <p>
              <strong>Título:</strong> {selectedEvent?.title}
            </p>
            <p>
              <strong>Descrição:</strong>{" "}
              {selectedEvent?.description || "Sem descrição"}
            </p>
            <p>
              <strong>Status:</strong> {selectedEvent?.status}
            </p>
            <p>
              <strong>Data Início:</strong>{" "}
              {selectedEvent?.start?.toString() || "Não definido"}
            </p>
            <p>
              <strong>Data Fim:</strong>{" "}
              {selectedEvent?.end?.toString() || "Não definido"}
            </p>
            <p>
              <strong>Cor:</strong>{" "}
              <span
                style={{
                  backgroundColor: selectedEvent?.backgroundColor,
                  display: "inline-block",
                  width: "20px",
                  height: "20px",
                }}
              />
            </p>

            <div className="mt-5 flex justify-between">
              <Button
                type="button"
                className="bg-yellow-500"
                onClick={() => setIsEditing(true)}
              >
                Editar
              </Button>
              <Button
                type="button"
                className="bg-red-700"
                onClick={handleDelete}
              >
                Excluir
              </Button>
            </div>
          </div>
        ) : (
          // Edição do Evento
          <form className="p-5">
            <label>Título:</label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="mb-3 w-full rounded-md border p-2 text-black"
              required
            />

            <label>Descrição:</label>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="mb-3 w-full rounded-md border p-2 text-black"
            />

            <label>Data Início:</label>
            <input
              type="datetime-local"
              value={eventStartDate}
              onChange={(e) => setEventStartDate(e.target.value)}
              className="mb-3 w-full rounded-md border p-2 text-black"
            />

            <label>Data Fim:</label>
            <input
              type="datetime-local"
              value={eventEndDate}
              onChange={(e) => setEventEndDate(e.target.value)}
              className="mb-3 w-full rounded-md border p-2 text-black"
            />

            <label>Status:</label>
            <select
              value={eventStatus}
              onChange={(e) => setEventStatus(e.target.value)}
              className="mb-3 w-full rounded-md border p-2 text-black"
            >
              <option value="Pendente">Pendente</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Cancelado">Cancelado</option>
            </select>

            <label>Cor:</label>
            <input
              type="color"
              value={eventColor}
              onChange={(e) => setEventColor(e.target.value)}
              className="mb-3"
            />

            <div className="mt-5 flex justify-between">
              <Button
                type="button"
                className="bg-green-500"
                onClick={handleUpdate}
              >
                Salvar
              </Button>
              <Button
                type="button"
                className="bg-gray-500"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsDialog;
