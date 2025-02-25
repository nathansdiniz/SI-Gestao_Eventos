"use client";
import { Button } from "@/app/_components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import ExcluirFornecedorDialog from "./botao-exclusao-fornecedor";

interface FornecedorProps {
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

interface dadosFornecedor {
  dados: FornecedorProps;
}

const ExcluirFornecedorButton = ({ dados }: dadosFornecedor) => {
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
      <ExcluirFornecedorDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={dados}
      />
    </>
  );
};

export default ExcluirFornecedorButton;
