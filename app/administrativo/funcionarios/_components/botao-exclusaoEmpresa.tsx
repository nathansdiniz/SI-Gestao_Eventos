"use client";
import { Button } from "@/app/_components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import ExcluirFuncionarioDialog from "./botao-exclusao";

interface FuncionarioProps {
  nome: string;
  cpf: string;
  idade: number;
  rg: string;
  data_nasc: Date;
  sexo: string;
  signo: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  mae: string;
  pai: string;
  email: string;
  senha: string;
  telefone_fixo: string;
  celular: string;
  altura: string;
  peso: number;
  tipo_sanguineo: string;
  cor: string;
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
