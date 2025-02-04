"use client";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import UpdateEmpresasButton from "./update-empresas";

interface EmpresasProps {
  id: number;
  empresa: string;
  cnpj: string;
  site: string;
  ramo_empresa: string;
  email: string;
  localizacao_empresa: string;
  telefone: string;
  dataAbertura: Date;
  data_created: Date;
  data_updated: Date;
  inscricaoEstadual: string;
  gestor_responsavel: string;
  userID: string;
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
