"use client";
import { Button } from "@/app/_components/ui/button";
import { DatePicker } from "@/app/_components/ui/date-picker";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  id: z.string(),
  nome: z.string().trim().min(1, {
    message: "Nome é obrigatório.",
  }),
  cpf: z.string().trim().min(1, {
    message: "CNPJ é obrigatório.",
  }),
  rg: z.string().trim().min(1, {
    message: "Inscrição Estadual é obrigatório.",
  }),
  data_nasc: z.date({
    required_error: "A data é obrigatório.",
  }),
  sexo: z.string(),
  email: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  cep: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  endereco: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  idade: z.number().positive(),
  bairro: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  cidade: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  estado: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  telefone_fixo: z.string().trim().min(1, {
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

const ExcluirFuncionarioDialog = ({
  isOpen,
  setIsOpen,
  defaultValues,
}: UpdateDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      id: "1561",
      nome: "",
      cpf: "",
      rg: "",
      data_nasc: new Date(),
      sexo: "",
      email: "",
      cep: "",
      endereco: "",
      idade: 50,
      bairro: "",
      cidade: "",
      estado: "",
      telefone_fixo: "",
      celular: "",
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
            Tem certeza que deseja excluir esse funcionário?
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
          <Button variant={"secondary"} className="px-6 py-3 text-lg">
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExcluirFuncionarioDialog;
