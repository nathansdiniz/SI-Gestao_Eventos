"use client";
import { Button } from "@/app/_components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import ExcluirEmpresaDialog from "./botao-exclusao";

interface EmpresasProps {
  id: string;
  nome: string;
  cnpj: string;
  site: string;
  cep: string;
  email: string;
  endereco: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  telefone: string;
  celular: string;
  dataAbertura: Date;
  inscricaoEstadual: string;
}

interface dadosEmpresa {
  dados: EmpresasProps;
}

const ExcluirEmpresasButton = ({ dados }: dadosEmpresa) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="bg-red-800 font-bold text-white"
        variant={"secondary"}
        onClick={() => setDialogIsOpen(true)}
      >
        <Trash2Icon />
      </Button>
      <ExcluirEmpresaDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={dados}
      ></ExcluirEmpresaDialog>
    </>
  );
};

export default ExcluirEmpresasButton;
