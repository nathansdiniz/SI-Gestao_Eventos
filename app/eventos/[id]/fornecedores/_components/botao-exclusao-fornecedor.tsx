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
  idfornecedores: z.number(),
  nome_fornecedor: z
    .string()
    .trim()
    .min(1, {
      message: "Nome do fornecedor é obrigatório.",
    })
    .nullable(),
  cnpj_fornecedor: z.string().trim().min(1, {
    message: "CNPJ é obrigatório.",
  }),
  tipo_fornecedor: z
    .string()
    .trim()
    .min(1, {
      message: "Tipo de fornecedor é obrigatório.",
    })
    .nullable(),
  representante_responsavel: z
    .string()
    .trim()
    .min(1, {
      message: "Representante responsável é obrigatório.",
    })
    .nullable(),
  localizacao_fornecedor: z
    .string()
    .trim()
    .min(1, {
      message: "Localização é obrigatória.",
    })
    .nullable(),
  telefone_fornecedor: z
    .string()
    .trim()
    .min(1, {
      message: "Telefone é obrigatório.",
    })
    .nullable(),
  email_fornecedor: z
    .string()
    .email()
    .trim()
    .min(1, {
      message: "E-mail é obrigatório.",
    })
    .nullable(),
  data_contratada: z
    .date({
      required_error: "Data contratada é obrigatória.",
    })
    .nullable(),
  data_termino: z.date().nullable(),
  data_criacao: z
    .date({
      required_error: "Data de criação é obrigatória.",
    })
    .nullable(),
  data_atualizacao: z
    .date({
      required_error: "Data de atualização é obrigatória.",
    })
    .nullable(),
  userID: z.string().nullable(),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpdateDialogProps {
  isOpen: boolean;
  defaultValues?: Partial<FormSchema>;
  setIsOpen: (isOpen: boolean) => void;
}

const ExcluirFornecedorDialog = ({
  isOpen,
  setIsOpen,
  defaultValues,
}: UpdateDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      idfornecedores: 0,
      nome_fornecedor: "",
      cnpj_fornecedor: "",
      tipo_fornecedor: "",
      representante_responsavel: "",
      localizacao_fornecedor: "",
      telefone_fornecedor: "",
      email_fornecedor: "",
      data_contratada: new Date(),
      data_termino: null,
      data_criacao: new Date(),
      data_atualizacao: new Date(),
      userID: null,
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
            Tem certeza que deseja excluir esse fornecedor?
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

export default ExcluirFornecedorDialog;
