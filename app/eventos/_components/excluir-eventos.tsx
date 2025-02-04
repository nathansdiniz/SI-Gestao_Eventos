"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { toast } from "sonner";
import { AlertTriangleIcon, CircleCheckBigIcon } from "lucide-react";

interface DeleteEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteEventDialog({
  isOpen,
  onClose,
  onConfirm,
}: DeleteEventDialogProps) {
  const handleConfirm = () => {
    try {
      onConfirm();
      toast("Evento excluído com sucesso!", {
        description: (
          <div className="flex items-center">
            <CircleCheckBigIcon className="mr-2 text-white" />
            <span>Evento excluído em {new Date().toLocaleString()}</span>
          </div>
        ),
        style: {
          background: "#007300",
          color: "#fff",
        },
      });
      onClose();
    } catch (error) {
      toast("Falha ao excluir o evento!", {
        description: <AlertTriangleIcon />,
        style: {
          background: "#af080d",
          color: "#fff",
        },
      });
      console.error("Erro ao excluir evento:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Evento</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir este evento?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={handleConfirm}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
