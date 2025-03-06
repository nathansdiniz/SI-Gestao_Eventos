"use client";
import { deleteEmpresa } from "@/app/_actions/criar-atualizarEmpresas";
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
import { AlertTriangleIcon, CircleCheckBigIcon } from "lucide-react";
import { toast } from "sonner";

interface EmpresasProps {
  id: number;
  empresa: string;
  cnpj: string;
  site: string;
  ramo_empresa: string;
  email: string;
  localizacao_empresa: string;
  telefone: string;
  dataAbertura: Date;
  data_created: Date;
  data_updated: Date;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  gestor_responsavel: string;
  userID: string;
}

interface ExcluirEmpresaDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  defaultValues: EmpresasProps;
}

const ExcluirEmpresaDialog = ({
  isOpen,
  setIsOpen,
  defaultValues,
}: ExcluirEmpresaDialogProps) => {
  const handleDelete = async () => {
    try {
      const result = await deleteEmpresa(defaultValues.id);
      if (result.success) {
        toast.success("Empresa excluída com sucesso!", {
          description: (
            <div className="flex items-center">
              <CircleCheckBigIcon className="mr-2 text-white" />
              <span>
                {`${defaultValues.empresa} excluída em ${new Date().toLocaleString()}`}
              </span>
            </div>
          ),
          style: { background: "#007300", textDecorationColor: "#f1f4ff" },
        });
        setIsOpen(false);
      } else {
        toast.error("Falha ao excluir a empresa!", {
          description: result.error,
          style: { background: "#af080d", textDecorationColor: "#f1f4ff" },
        });
      }
    } catch (error) {
      toast.error("Falha ao excluir a empresa!", {
        description: <AlertTriangleIcon />,
        style: { background: "#af080d", textDecorationColor: "#f1f4ff" },
      });
      console.error("Erro ao excluir empresa:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Excluir Empresa</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir a empresa{" "}
            <b>{defaultValues.empresa}</b>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex flex-wrap justify-center gap-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExcluirEmpresaDialog;
