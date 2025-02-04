"use client";
import { Button } from "@/app/_components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import ExcluirFuncionarioDialog from "./botao-exclusao";

interface FuncionarioProps {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  data_nascimento: Date;
  sexo: string;
  funcao: string;
  id_empresa: number;
  endereco: string;
  status: boolean;
  email: string;
  telefone: string;
  celular: string;
  data_start_funcao: Date;
  data_end_funcao: Date | null;
  data_updated_funcao: Date;
  data_created: Date;
  data_updated: Date;
  userID: string | null;
}

interface dadosFuncionario {
  dados: FuncionarioProps;
}

const ExcluirFuncionarioButton = ({ dados }: dadosFuncionario) => {
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
      <ExcluirFuncionarioDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={dados}
      ></ExcluirFuncionarioDialog>
    </>
  );
};

export default ExcluirFuncionarioButton;
