"use client";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import UpdateEmpresasButton from "./update-empresas";

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

const AtualizarEmpresasButton = ({ dados }: dadosEmpresa) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="font-bold text-white"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpdateEmpresasButton
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={dados}
      ></UpdateEmpresasButton>
    </>
  );
};

export default AtualizarEmpresasButton;
