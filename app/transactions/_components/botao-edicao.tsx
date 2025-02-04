import { Button } from "@/app/_components/ui/button";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

const EditarContasFinanceiro = () => {
  const [, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
    </>
  );
};

export default EditarContasFinanceiro;
