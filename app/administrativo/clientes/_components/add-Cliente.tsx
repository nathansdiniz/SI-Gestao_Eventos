"use client";
import { Button } from "@/app/_components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import UpdateClienteButton from "./update-Cliente";

const AdicionarClienteButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="justify-end font-bold text-white"
        onClick={() => setDialogIsOpen(true)}
      >
        <PlusCircleIcon></PlusCircleIcon>
        Adicionar Cliente
      </Button>
      <UpdateClienteButton
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      ></UpdateClienteButton>
    </>
  );
};

export default AdicionarClienteButton;
