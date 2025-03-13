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
import { deleteCliente } from "@/app/_actions/clientes";
import { toast } from "sonner";

interface ClientesProps {
  id: number;
  tipoCadastro: string | null;
  cliente: string; // Ensure this is present
  cpf_cnpj_cliente: string | null;
  razaoSocial: string | null;
  nomeFantasia: string | null;
  inscricaoMunicipal: string | null;
  inscricaoEstadual: string | null;
  data_nasc: Date | null;
  estadoCivil: string | null;
  email: string | null;
  telefone: string | null;
  endereco: string | null;
  cep: string | null;
  complemento: string | null;
  cidade: string | null;
  estado: string | null;
  pais: string | null;
  pontoReferencia: string | null;
  anotacoes: string | null;
  dataCadastro: Date;
  ddiTelefone: string | null;
  ddiTelefone2: string | null;
  telefone2: string | null;
  ddiCelular: string | null;
  celular: string | null;
  redeSocial: string | null;
  id_empresa: number | null;
  userID: string | null;
}

interface ExcluirClientesDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  defaultValues: ClientesProps;
}

const ExcluirClientesDialog: React.FC<ExcluirClientesDialogProps> = ({
  isOpen,
  setIsOpen,
  defaultValues,
}) => {
  const handleConfirmDelete = async () => {
    try {
      await deleteCliente(defaultValues.id);
      toast.success("Cliente excluído com sucesso!");
      setIsOpen(false); // Fecha o diálogo após a exclusão
    } catch (error) {
      toast.error("Erro ao excluir o cliente.");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Cliente</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir o cliente{" "}
            <span className="font-bold">{defaultValues.cliente}</span>? Esta
            ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirmDelete}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExcluirClientesDialog;
