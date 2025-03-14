"use client";
import { Button } from "@/app/_components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import UpdateClienteButton from "./update-Orcamento";

const AdicionarOrcamentoButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="justify-end bg-green-900 font-bold text-white"
        onClick={() => setDialogIsOpen(true)}
      >
        <PlusCircleIcon></PlusCircleIcon>
        Novo Orçamento
      </Button>
      <UpdateClienteButton
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      ></UpdateClienteButton>
    </>
  );
};

export default AdicionarOrcamentoButton;
