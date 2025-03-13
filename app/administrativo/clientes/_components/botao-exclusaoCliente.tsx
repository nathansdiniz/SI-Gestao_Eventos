"use client";
import { Button } from "@/app/_components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import ExcluirClientesDialog from "./botao-exclusao";

interface ClientesProps {
  id: number;
  tipoCadastro: string | null;
  cliente: string;
  cpf_cnpj_cliente: string | null;
  razaoSocial: string | null;
  nomeFantasia: string | null;
  inscricaoMunicipal: string | null;
  inscricaoEstadual: string | null;
  data_nasc: Date | null;
  estadoCivil: string | null;
  email: string | null;
  telefone: string | null;
  endereco: string | null;
  cep: string | null;
  complemento: string | null;
  cidade: string | null;
  estado: string | null;
  pais: string | null;
  pontoReferencia: string | null;
  anotacoes: string | null;
  dataCadastro: Date;
  ddiTelefone: string | null;
  ddiTelefone2: string | null;
  telefone2: string | null;
  ddiCelular: string | null;
  celular: string | null;
  redeSocial: string | null;
  id_empresa: number | null;
  userID: string | null;
}

interface dadosCliente {
  dados: ClientesProps;
}

const ExcluirClientesButton = ({ dados }: dadosCliente) => {
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
      <ExcluirClientesDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={dados}
      />
    </>
  );
};

export default ExcluirClientesButton;
