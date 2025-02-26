"use client";

import { ArrowDownUpIcon } from "lucide-react";

import { useState } from "react";

import { Button } from "@/app/_components/ui/button";
import EditDialogFinancas from "./dialog-edicao";

interface BotaoAdicionarFinancasProps {
  idEvento: string; // Replace 'any' with the appropriate type if known
  nomeEvento: string; // Replace 'any' with the appropriate type if known
}

const BotaoAdicionarFinancas = ({
  idEvento,
  nomeEvento,
}: BotaoAdicionarFinancasProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        Adicionar transação
        <ArrowDownUpIcon />
      </Button>
      <EditDialogFinancas
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        financeiroId={idEvento}
        nomeEvento={nomeEvento}
        onClose={() => setDialogIsOpen(false)}
      />
    </>
  );
};

export default BotaoAdicionarFinancas;
