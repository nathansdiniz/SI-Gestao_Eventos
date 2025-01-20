"use client";
import { Button } from "@/app/_components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import UpdateFuncionarioButton from "./update-empresas";

const AdicionarFuncionarioButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="justify-end font-bold text-white"
        onClick={() => setDialogIsOpen(true)}
      >
        <PlusCircleIcon></PlusCircleIcon>
        Adicionar Funcionário
      </Button>
      <UpdateFuncionarioButton
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      ></UpdateFuncionarioButton>
    </>
  );
};

export default AdicionarFuncionarioButton;
