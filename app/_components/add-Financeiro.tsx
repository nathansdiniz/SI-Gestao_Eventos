"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import EditDialogFinancas from "../administrativo/financeiro/_components/dialog-edicao";

const BotaoAdicionarFinancas = () => {
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
        onClose={() => setDialogIsOpen(false)}
      />
    </>
  );
};

export default BotaoAdicionarFinancas;
