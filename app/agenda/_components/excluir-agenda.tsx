"use client";

import { Agenda } from "@/app/agenda/layout-agenda";
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
import { excluirAgenda } from "@/app/_actions/agenda"; // Importe a função

interface DeleteEventDialogProps {
  evento?: Agenda;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (idAgendaGeral: number) => void;
}

export function DeleteEventDialog({
  isOpen,
  evento,
  onClose,
  onConfirm,
}: DeleteEventDialogProps) {
  const handleConfirm = async () => {
    // Adicione async
    if (!evento) {
      //Verifica se existe o evento
      return;
    }
    try {
      const result = await excluirAgenda(Number(evento.idAgendaGeral)); // Chame a função excluirAgenda passando o id
      if (result.success) {
        onConfirm(Number(evento.idAgendaGeral));
        toast("Evento excluído com sucesso!", {
          description: (
            <div className="flex items-center">
              <CircleCheckBigIcon className="mr-2 text-white" />
              <span className="font-bold">
                {evento?.titulo_agenda} - Evento excluído em{" "}
                {new Date().toLocaleString()}
              </span>
            </div>
          ),
          style: {
            background: "#007300",
            color: "#fff",
          },
        });
      } else {
        toast("Falha ao excluir o evento!", {
          description: <AlertTriangleIcon />,
          style: {
            background: "#af080d",
            color: "#fff",
          },
        });
      }

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
            Tem certeza que deseja excluir este evento?{" "}
            <span className="font-bold">{evento?.titulo_agenda}</span>?
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
