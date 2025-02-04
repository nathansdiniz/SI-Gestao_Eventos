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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  id: z.number(),
  userID: z.string(),
  nome: z.string().trim().min(1, {
    message: "Nome é obrigatório.",
  }),
  cnpj: z.string().trim().min(1, {
    message: "CNPJ é obrigatório.",
  }),
  inscricaoEstadual: z.string().trim().min(1, {
    message: "Inscrição Estadual é obrigatório.",
  }),
  dataAbertura: z.date({
    required_error: "A data é obrigatório.",
  }),
  site: z.string(),
  email: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  cep: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  endereco: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  numero: z.number().positive(),
  bairro: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  cidade: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  estado: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  telefone: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  celular: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
});
type FormSchema = z.infer<typeof formSchema>;

interface UpdateDialogProps {
  isOpen: boolean;
  defaultValues?: Partial<FormSchema>;
  setIsOpen: (isOpen: boolean) => void;
}

const ExcluirEmpresaDialog = ({
  isOpen,
  setIsOpen,
  defaultValues,
}: UpdateDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      id: 1561,
      nome: "",
      cnpj: "",
      inscricaoEstadual: "",
      dataAbertura: new Date(),
      site: "",
      email: "",
      cep: "",
      endereco: "",
      numero: 50,
      bairro: "",
      cidade: "",
      estado: "",
      telefone: "",
      celular: "",
      userID: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
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
            Tem certeza que deseja excluir essa empresa?
          </DialogDescription>
        </DialogHeader>

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

export default ExcluirEmpresaDialog;
