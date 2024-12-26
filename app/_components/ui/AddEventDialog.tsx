"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { Button } from "./button";

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (eventData: any) => void;
  selectedDate: any;
}

const AddEventDialog: React.FC<AddEventDialogProps> = ({
  isOpen,
  onClose,
  onAddEvent,
  selectedDate,
}) => {
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [newEventDescription, setNewEventDescription] = useState<string>("");
  const [newEventColor, setNewEventColor] = useState<string>("#000000");
  const [newEventStatus, setNewEventStatus] = useState<string>("Pendente");
  const [newEventStartDate, setNewEventStartDate] = useState<string>("");
  const [newEventEndDate, setNewEventEndDate] = useState<string>("");
  const [newEventAllDay, setNewEventAllDay] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent = {
      id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
      title: newEventTitle,
      description: newEventDescription,
      backgroundColor: newEventColor,
      status: newEventStatus,
      start: newEventStartDate || selectedDate.start,
      end: newEventEndDate || selectedDate.end,
      allDay: newEventAllDay,
    };

    onAddEvent(newEvent);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Adicionar Novo Evento
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-7">
          <label>Título:</label>
          <input
            type="text"
            placeholder="Título do Evento"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            required
            className="mb-3 w-full rounded-md border bg-black p-3 text-white"
          />

          <label>Descrição:</label>
          <textarea
            placeholder="Descrição"
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
            className="mb-3 w-full rounded-md border bg-black p-3 text-white"
          />

          <label>Data Início</label>
          <input
            type="datetime-local"
            value={newEventStartDate}
            onChange={(e) => setNewEventStartDate(e.target.value)}
            className="mb-3 w-full rounded-md border bg-black p-3 text-white"
          />
          <label>Data Fim:</label>
          <input
            type="datetime-local"
            value={newEventEndDate}
            onChange={(e) => setNewEventEndDate(e.target.value)}
            className="mb-3 w-full rounded-md border bg-black p-3 text-white"
          />

          <label>Status:</label>
          <select
            value={newEventStatus}
            onChange={(e) => setNewEventStatus(e.target.value)}
            className="mb-3 w-full rounded-md border bg-black p-3 text-white"
          >
            <option value="Pendente">Pendente</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <label>Cor:</label>
          <input
            type="color"
            value={newEventColor}
            onChange={(e) => setNewEventColor(e.target.value)}
            className="mb-3"
          />

          <div className="mb-3">
            <label>
              <input
                type="checkbox"
                checked={newEventAllDay}
                onChange={() => setNewEventAllDay(!newEventAllDay)}
              />
              Dia Todo
            </label>
          </div>

          <div className="flex justify-between">
            <Button type="submit" className="bg-green-500">
              Adicionar
            </Button>
            <DialogClose asChild>
              <Button type="button" className="bg-red-700">
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
