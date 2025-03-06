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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Input } from "@/app/_components/ui/input";
import { getClientes } from "@/app/_actions/clientes";
import { toast } from "sonner";
import { CircleCheckBigIcon } from "lucide-react";
import UpdateClienteButton from "@/app/administrativo/clientes/_components/update-Cliente";
import { Evento } from "@/app/_props";

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
    horarioInicio: "", // Inicializando
    horarioFim: "", // Inicializando
  });

  // Estados para o novo cliente

  const [clientes, setClientes] = useState<any>([]); //Colocar o tipo correto
  const [selectedCliente, setSelectedCliente] = useState<string | null>(null); // Estado para o cliente selecionado
  console.log(selectedCliente);
  const [dialogNovoClienteOpen, setDialogNovoClienteOpen] = useState(false); // Estado para controlar se o dialog de criar novo cliente está aberto.
  const estados = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ]; // Ou busque de um banco de dados.

  //Carregando os clientes
  useEffect(() => {
    const loadClientes = async () => {
      const clientesLoaded = await getClientes(); // função para buscar os clientes
      setClientes(clientesLoaded);
    };

    loadClientes();
  }, []);

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
        horarioInicio: "",
        horarioFim: "",
      }));
    }
  }, [defaultValues, selectedDate]);

  const handleChange = (field: keyof Evento, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNovoCliente = () => {
    setDialogNovoClienteOpen(true); // Abre o Modal de novo cliente
  };

  const handleClienteChange = (clienteId: string) => {
    if (clienteId === "novo-cliente") {
      handleNovoCliente();
    } else {
      const cliente = clientes.find((c: any) => c.id === Number(clienteId)); //busca o cliente de id igual ao selecionado
      if (cliente) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          nomeCliente: cliente.cliente, // Atualiza o nome do cliente, lembrando que o nome esta como cliente
          idCliente: cliente.id,
        }));
        setSelectedCliente(cliente.id);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("Salvando evento:", formData);
      if (formData.id === 0) {
        // Adicionar novo evento
        const novoEvento = await adicionarEvento(formData);
        toast("Evento Salvo com sucesso!", {
          description: (
            <div className="flex items-center">
              <CircleCheckBigIcon className="mr-2 text-white" />
              <span>{`Evento salvo em ${new Date().toLocaleString()}`}</span>
            </div>
          ),
          style: {
            background: "#007300",
            textDecorationColor: "#f1f4ff",
          },
        });
        isOpen = false;
        onSave({ ...formData, id: novoEvento.id });
      } else {
        // Atualizar evento existente
        const eventoAtualizado = await atualizarEvento(formData);
        toast("Evento Atualizado com sucesso!", {
          description: (
            <div className="flex items-center">
              <CircleCheckBigIcon className="mr-2 text-white" />
              <span>
                {`Evento atualizado em ${new Date().toLocaleString()}`}
              </span>
            </div>
          ),
          style: {
            background: "#007300",
            textDecorationColor: "#f1f4ff",
          },
        });
        isOpen = false;
        onSave({
          ...eventoAtualizado,
          horarioInicio: eventoAtualizado.horarioInicio ?? "",
          horarioFim: eventoAtualizado.horarioFim ?? "",
        });
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
            <Input
              type="text"
              value={formData.nomeEvento || ""}
              onChange={(e) => handleChange("nomeEvento", e.target.value)}
              className="input-field"
            />
          </div>

          {/* Tipo de Evento */}
          <div className="flex flex-col">
            <label className="font-medium">Tipo de Evento:</label>
            <Input
              type="text"
              value={formData.tipoEvento}
              onChange={(e) => handleChange("tipoEvento", e.target.value)}
              required
              className="input-field"
            />
          </div>

          {/* Cliente - Select com Adicionar Novo Cliente */}
          <div className="flex flex-col">
            <label className="mb-2">Cliente:</label>
            <Select onValueChange={handleClienteChange}>
              <SelectTrigger className="w-[380px]">
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="novo-cliente">Novo Cliente</SelectItem>
                {clientes.map((cliente: any) => (
                  <SelectItem key={cliente.id} value={cliente.id.toString()}>
                    {cliente.cliente}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <UpdateClienteButton
            isOpen={dialogNovoClienteOpen}
            setIsOpen={setDialogNovoClienteOpen}
            defaultValues={undefined}
          ></UpdateClienteButton>

          {/* Data e Hora do Evento */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium">Data do Evento:</label>
              <Input
                type="date"
                value={formData.dataEvento?.toISOString().slice(0, 10) || ""}
                onChange={(e) =>
                  handleChange("dataEvento", new Date(e.target.value))
                }
                className="input-field bg-white text-black"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Hora de Início:</label>
              <Input
                type="time"
                value={formData.horarioInicio}
                onChange={(e) => handleChange("horarioInicio", e.target.value)}
                className="input-field bg-white text-black"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Hora de Fim:</label>
              <Input
                type="time"
                value={formData.horarioFim}
                onChange={(e) => handleChange("horarioFim", e.target.value)}
                className="input-field bg-white text-black"
              />
            </div>
          </div>

          {/* Local e Endereço */}
          <div className="flex flex-col">
            <label className="font-medium">Local do Evento:</label>
            <Input
              type="text"
              value={formData.localEvento || ""}
              onChange={(e) => handleChange("localEvento", e.target.value)}
              className="input-field"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Endereço:</label>
            <Input
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
              <Input
                type="number"
                value={formData.numero || ""}
                onChange={(e) => handleChange("numero", Number(e.target.value))}
                className="input-field"
                min={0} //Impede números negativos
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">CEP:</label>
              <Input
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
            <Input
              type="text"
              value={formData.bairro || ""}
              onChange={(e) => handleChange("bairro", e.target.value)}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium">Cidade:</label>
              <Input
                type="text"
                value={formData.cidade || ""}
                onChange={(e) => handleChange("cidade", e.target.value)}
                className="input-field"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium">Estado:</label>
              <Select
                onValueChange={(e) => handleChange("estado", e)}
                defaultValue={formData.estado || undefined}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  {estados.map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Convidados */}
          <div className="flex flex-col">
            <label className="font-medium">Convidados:</label>
            <Input
              type="number"
              value={formData.convidados}
              onChange={(e) =>
                handleChange("convidados", Number(e.target.value))
              }
              className="input-field"
              min={0} //Impede números negativos
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
