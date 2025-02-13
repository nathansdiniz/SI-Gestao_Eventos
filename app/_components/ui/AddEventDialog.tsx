"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { Button } from "./button";
import { adicionarEvento, atualizarEvento } from "@/app/_actions/eventos";

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

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: Evento) => void;
  selectedDate: { start: Date; end: Date; allDay: boolean };
  defaultValues?: Evento;
}

const AddEventDialog: React.FC<AddEventDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  defaultValues,
}) => {
  const [formData, setFormData] = useState<Evento>({
    id: 0,
    tipoEvento: "",
    dataDeCadastro: new Date(),
    idOrcamento: null,
    idCliente: null,
    nomeCliente: "",
    dataEvento: selectedDate.start,
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
    status: "Pendente",
    id_empresa: 1, // Defina o ID da empresa conforme necessário
    userID: null,
    diaTodo: selectedDate.allDay,
  });

  // Atualiza o formData quando defaultValues muda
  useEffect(() => {
    if (defaultValues) {
      setFormData({
        ...defaultValues,
        dataEvento: defaultValues.dataEvento || selectedDate.start,
        diaTodo: defaultValues.diaTodo || selectedDate.allDay,
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        dataEvento: selectedDate.start,
        diaTodo: selectedDate.allDay,
      }));
    }
  }, [defaultValues, selectedDate]);

  const handleChange = (field: keyof Evento, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Salvando evento:", formData);
      if (formData.id === 0) {
        // Adicionar novo evento
        const novoEvento = await adicionarEvento(formData);
        onSave(novoEvento);
      } else {
        // Atualizar evento existente
        const eventoAtualizado = await atualizarEvento(formData);
        onSave(eventoAtualizado);
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[1200px] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            {defaultValues ? "Editar Evento" : "Adicionar Novo Evento"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Nome do Evento */}
          <div className="flex flex-col">
            <label className="font-medium">Nome do Evento:</label>
            <input
              type="text"
              value={formData.nomeEvento || ""}
              onChange={(e) => handleChange("nomeEvento", e.target.value)}
              className="input-field"
            />
          </div>

          {/* Tipo de Evento */}
          <div className="flex flex-col">
            <label className="font-medium">Tipo de Evento:</label>
            <input
              type="text"
              value={formData.tipoEvento}
              onChange={(e) => handleChange("tipoEvento", e.target.value)}
              required
              className="input-field"
            />
          </div>

          {/* Nome do Cliente */}
          <div className="flex flex-col">
            <label className="font-medium">Nome do Cliente:</label>
            <input
              type="text"
              value={formData.nomeCliente}
              onChange={(e) => handleChange("nomeCliente", e.target.value)}
              required
              className="input-field"
            />
          </div>

          {/* Data e Hora do Evento */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium">Data do Evento:</label>
              <input
                type="datetime-local"
                value={formData.dataEvento?.toISOString().slice(0, 16) || ""}
                onChange={(e) =>
                  handleChange("dataEvento", new Date(e.target.value))
                }
                className="input-field bg-white text-black"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Hora do Evento:</label>
              <input
                type="time"
                value={formData.horaEvento}
                onChange={(e) => handleChange("horaEvento", e.target.value)}
                className="input-field bg-white text-black"
              />
            </div>
          </div>

          {/* Local e Endereço */}
          <div className="flex flex-col">
            <label className="font-medium">Local do Evento:</label>
            <input
              type="text"
              value={formData.localEvento || ""}
              onChange={(e) => handleChange("localEvento", e.target.value)}
              className="input-field"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Endereço:</label>
            <input
              type="text"
              value={formData.endereco || ""}
              onChange={(e) => handleChange("endereco", e.target.value)}
              className="input-field"
            />
          </div>

          {/* Número e CEP */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium">Número:</label>
              <input
                type="number"
                value={formData.numero || ""}
                onChange={(e) => handleChange("numero", Number(e.target.value))}
                className="input-field"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">CEP:</label>
              <input
                type="text"
                value={formData.cep || ""}
                onChange={(e) => handleChange("cep", e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Bairro, Cidade e Estado */}
          <div className="flex flex-col">
            <label className="font-medium">Bairro:</label>
            <input
              type="text"
              value={formData.bairro || ""}
              onChange={(e) => handleChange("bairro", e.target.value)}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium">Cidade:</label>
              <input
                type="text"
                value={formData.cidade || ""}
                onChange={(e) => handleChange("cidade", e.target.value)}
                className="input-field"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Estado:</label>
              <input
                type="text"
                value={formData.estado || ""}
                onChange={(e) => handleChange("estado", e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Convidados */}
          <div className="flex flex-col">
            <label className="font-medium">Convidados:</label>
            <input
              type="number"
              value={formData.convidados}
              onChange={(e) =>
                handleChange("convidados", Number(e.target.value))
              }
              className="input-field"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="font-medium">Status:</label>
            <select
              value={formData.status || "Pendente"}
              onChange={(e) => handleChange("status", e.target.value)}
              className="input-field"
            >
              <option value="Pendente">Pendente</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          {/* Botões */}
          <div className="col-span-2 mt-4 flex justify-center gap-4">
            <Button type="submit" className="rounded-md bg-green-500 px-6 py-2">
              {defaultValues ? "Atualizar" : "Adicionar"}
            </Button>
            <DialogClose asChild>
              <Button type="button" className="rounded-md bg-red-700 px-6 py-2">
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
