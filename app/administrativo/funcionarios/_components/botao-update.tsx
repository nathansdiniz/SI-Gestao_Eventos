"use client";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import UpdateFuncionarioButton from "./update-funcionario";

interface FuncionariosProps {
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
  dados: FuncionariosProps;
}

const BotaoEditarFuncionario = ({ dados }: dadosFuncionario) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="font-bold text-white"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpdateFuncionarioButton
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={dados}
      ></UpdateFuncionarioButton>
    </>
  );
};

export default BotaoEditarFuncionario;
