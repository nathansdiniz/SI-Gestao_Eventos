"use client";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import UpdateFornecedorButton from "./update-fornecedor";

interface FornecedoresProps {
  idfornecedores: number;
  nome_fornecedor: string | null;
  cnpj_fornecedor: string;
  tipo_fornecedor: string | null;
  representante_responsavel: string | null;
  localizacao_fornecedor: string | null;
  telefone_fornecedor: string | null;
  email_fornecedor: string | null;
  data_contratada: Date | null;
  data_termino: Date | null;
  data_criacao: Date | null;
  data_atualizacao: Date | null;
  userID: string | null;
}

interface dadosFornecedores {
  dados: FornecedoresProps;
}

const BotaoEditarFornecedor = ({ dados }: dadosFornecedores) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="font-bold text-white"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpdateFornecedorButton
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={dados}
      ></UpdateFornecedorButton>
    </>
  );
};

export default BotaoEditarFornecedor;
