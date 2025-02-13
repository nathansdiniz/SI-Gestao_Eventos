"use client";
import { Button } from "@/app/_components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { SelecionarEvento } from "@/app/_components/ui/select-pesquisa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const ClientesSchema = z.object({
  id: z.number(),
  tipoCadastro: z.string().nullable(),
  cliente: z.string(),
  cpf_cnpj_cliente: z.string().nullable(),
  razaoSocial: z.string().nullable(),
  nomeFantasia: z.string().nullable(),
  inscricaoMunicipal: z.string().nullable(),
  inscricaoEstadual: z.string().nullable(),
  data_nasc: z.date().nullable(),
  estadoCivil: z.string().nullable(),
  email: z.string().email().nullable(),
  telefone: z.string().nullable(),
  endereco: z.string().nullable(),
  cep: z.string().nullable(),
  complemento: z.string().nullable(),
  cidade: z.string().nullable(),
  estado: z.string().nullable(),
  pais: z.string().nullable(),
  pontoReferencia: z.string().nullable(),
  anotacoes: z.string().nullable(),
  dataCadastro: z.date(),
  ddiTelefone: z.string().nullable(),
  ddiTelefone2: z.string().nullable(),
  telefone2: z.string().nullable(),
  ddiCelular: z.string().nullable(),
  celular: z.string().nullable(),
  redeSocial: z.string().nullable(),
  id_empresa: z.number().nullable(),
  userID: z.string().nullable(),
});

// Tipo inferido a partir do schema Zod
type ClientesForm = z.infer<typeof ClientesSchema>;

interface UpdateDialogProps {
  isOpen: boolean;
  defaultValues?: Partial<ClientesForm>;
  setIsOpen: (isOpen: boolean) => void;
}

const ExcluirClientesDialog = ({
  isOpen,
  setIsOpen,
  defaultValues,
}: UpdateDialogProps) => {
  const form = useForm<ClientesForm>({
    resolver: zodResolver(ClientesSchema),
    defaultValues: defaultValues ?? {
      id: 0,
      tipoCadastro: null,
      cliente: "",
      cpf_cnpj_cliente: null,
      razaoSocial: null,
      nomeFantasia: null,
      inscricaoMunicipal: null,
      inscricaoEstadual: null,
      data_nasc: null,
      estadoCivil: null,
      email: null,
      telefone: null,
      endereco: null,
      cep: null,
      complemento: null,
      cidade: null,
      estado: null,
      pais: null,
      pontoReferencia: null,
      anotacoes: null,
      dataCadastro: new Date(),
      ddiTelefone: null,
      ddiTelefone2: null,
      telefone2: null,
      ddiCelular: null,
      celular: null,
      redeSocial: null,
      id_empresa: null,
      userID: null,
    },
  });

  const onSubmit = (data: ClientesForm) => {
    console.log(data);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmação de exclusão</DialogTitle>
          <DialogDescription className="text-center text-lg font-semibold text-white">
            Tem certeza que deseja excluir esse funcionário?
          </DialogDescription>
        </DialogHeader>

        <SelecionarEvento></SelecionarEvento>

        <DialogFooter className="mt-4 flex items-center justify-center gap-4">
          <DialogClose asChild>
            <Button
              variant={"default"}
              className="bg-red-700 px-6 py-3 text-lg text-white"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant={"secondary"}
            className="px-6 py-3 text-lg"
            onClick={() => onSubmit}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExcluirClientesDialog;
