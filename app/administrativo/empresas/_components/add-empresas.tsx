"use client";
import { Button } from "@/app/_components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import UpdateEmpresasButton from "./update-empresas";

const AdicionarEmpresasButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="justify-end font-bold text-white"
        onClick={() => setDialogIsOpen(true)}
      >
        <PlusCircleIcon></PlusCircleIcon>
        Adicionar Empresa
      </Button>
      <UpdateEmpresasButton
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      ></UpdateEmpresasButton>
    </>
  );
};

export default AdicionarEmpresasButton;
