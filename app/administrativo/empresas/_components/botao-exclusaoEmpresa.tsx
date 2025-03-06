"use client";
import { Button } from "@/app/_components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import ExcluirEmpresaDialog from "./botao-exclusao";

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
  inscricaoMunicipal: string;
  gestor_responsavel: string;
  userID: string;
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
