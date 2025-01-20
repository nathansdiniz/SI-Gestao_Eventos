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

interface EventData {
  id: string;
  title: string;
  description: string;
  backgroundColor: string;
  status: string;
  start: Date;
  end: Date;
  allDay: boolean;
  tipoEvento: string;
  datadecadastro: Date;
  idorcamento: number;
  idcliente: number;
  nomeCliente: string;
  dataevento: Date;
  localevento: string;
  nomeevento: string;
  idlocalevento: number;
  endereco: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
  informacoes: string;
  observacao: string;
  codigointerno: string;
  convidados: number;
  datasAdicionais: {};
}

interface SelectedDate {
  start: Date;
  end: Date;
  allDay: boolean;
}

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (eventData: EventData) => void;
  selectedDate: SelectedDate;
}

const AddEventDialog: React.FC<AddEventDialogProps> = ({
  isOpen,
  onClose,
  onAddEvent,
  selectedDate,
}) => {
  const [formData, setFormData] = useState<EventData>({
    id: "",
    title: "",
    description: "",
    backgroundColor: "#000000",
    status: "Pendente",
    start: selectedDate.start,
    end: selectedDate.end,
    allDay: selectedDate.allDay,
    tipoEvento: "",
    datadecadastro: new Date(),
    idorcamento: 0,
    idcliente: 0,
    nomeCliente: "",
    dataevento: selectedDate.start,
    localevento: "",
    nomeevento: "",
    idlocalevento: 0,
    endereco: "",
    numero: "",
    complemento: "",
    cep: "",
    bairro: "",
    cidade: "",
    estado: "",
    informacoes: "",
    observacao: "",
    codigointerno: "",
    convidados: 0,
    datasAdicionais: {},
  });

  const handleChange = (field: keyof EventData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent({ ...formData, id: `${formData.start}-${formData.title}` });
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
          {/* Campos Básicos */}
          <label>Título:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
            className="mb-3 w-full rounded-md border bg-black p-3 text-white"
          />

          <label>Descrição:</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="mb-3 w-full rounded-md border bg-black p-3 text-white"
          />

          <label>Cor:</label>
          <input
            type="color"
            value={formData.backgroundColor}
            onChange={(e) => handleChange("backgroundColor", e.target.value)}
            className="mb-3"
          />

          {/* Datas e Status */}
          <label>Data Início:</label>
          <input
            type="datetime-local"
            value={formData.start.toISOString().slice(0, 16)}
            onChange={(e) => handleChange("start", new Date(e.target.value))}
            className="mb-3 w-full rounded-md border bg-white p-3 text-black"
          />

          <label>Data Fim:</label>
          <input
            type="datetime-local"
            value={formData.end.toISOString().slice(0, 16)}
            onChange={(e) => handleChange("end", new Date(e.target.value))}
            className="mb-3 w-full rounded-md border bg-white p-3 text-black"
          />

          <label>Status:</label>
          <select
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="mb-3 w-full rounded-md border bg-black p-3 text-white"
          >
            <option value="Pendente">Pendente</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <label>Nome do Cliente:</label>
          <input
            type="text"
            value={formData.nomeCliente}
            onChange={(e) => handleChange("nomeCliente", e.target.value)}
            className="mb-3 w-full rounded-md border bg-black p-3 text-white"
          />

          {/* Outros Campos */}
          <label>Local do Evento:</label>
          <input
            type="text"
            value={formData.localevento}
            onChange={(e) => handleChange("localevento", e.target.value)}
            className="mb-3 w-full rounded-md border bg-black p-3 text-white"
          />

          {/* Adicione outros campos conforme necessário */}
          <label>Convidados:</label>
          <input
            type="number"
            value={formData.convidados}
            onChange={(e) => handleChange("convidados", Number(e.target.value))}
            className="mb-3 w-full rounded-md border bg-black p-3 text-white"
          />

          {/* Botões */}
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
