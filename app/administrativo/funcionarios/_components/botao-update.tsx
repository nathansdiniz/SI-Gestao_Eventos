"use client";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import UpdateFuncionarioButton from "./update-empresas";

interface FuncionariosProps {
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
