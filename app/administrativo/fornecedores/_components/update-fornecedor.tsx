"use client";
import { addUpdateFornecedores } from "@/app/_actions/fornecedores"; // Ajuste o caminho conforme necessário
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangleIcon, CircleCheckBigIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FornecedoresSchema = z.object({
  idfornecedores: z.number(),
  nome_fornecedor: z.string().nullable(),
  cnpj_fornecedor: z.string(),
  tipo_fornecedor: z.string().nullable(),
  representante_responsavel: z.string().nullable(),
  localizacao_fornecedor: z.string().nullable(),
  telefone_fornecedor: z.string().nullable(),
  email_fornecedor: z.string().email().nullable(),
  data_contratada: z.date().nullable(),
  data_termino: z.date().nullable(),
  data_criacao: z.date().nullable(),
  data_atualizacao: z.date().nullable(),
  userID: z.string().nullable(),
});

type FornecedoresForm = z.infer<typeof FornecedoresSchema>;

interface UpdateDialogProps {
  isOpen: boolean;
  defaultValues?: Partial<FornecedoresForm>;
  setIsOpen: (isOpen: boolean) => void;
}

const UpdateFornecedorButton = ({
  isOpen,
  setIsOpen,
  defaultValues,
}: UpdateDialogProps) => {
  const form = useForm<FornecedoresForm>({
    resolver: zodResolver(FornecedoresSchema),
    defaultValues: defaultValues ?? {
      idfornecedores: 0,
      nome_fornecedor: null,
      cnpj_fornecedor: "",
      tipo_fornecedor: null,
      representante_responsavel: null,
      localizacao_fornecedor: null,
      telefone_fornecedor: null,
      email_fornecedor: null,
      data_contratada: null,
      data_termino: null,
      data_criacao: null,
      data_atualizacao: null,
      userID: null,
    },
  });

  const onSubmit = async (data: FornecedoresForm) => {
    console.log(data);
    try {
      await addUpdateFornecedores(data); // Ajuste a função conforme necessário
      toast("Registro de Fornecedor salvo com sucesso!", {
        description: (
          <div className="flex items-center">
            <CircleCheckBigIcon className="mr-2 text-white" />
            <span>{`${data.nome_fornecedor} salvo em ${new Date().toLocaleString()}`}</span>
          </div>
        ),
        action: {
          label: "X",
          onClick: () => console.log("X"),
        },
        style: {
          background: "#007300",
          textDecorationColor: "#f1f4ff",
        }, // Cor de fundo e texto
      });
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.log(error);
      toast("Falha ao salvar os dados!", {
        description: <AlertTriangleIcon />,
        action: {
          label: "X",
          onClick: () => console.log("X"),
        },
        style: {
          background: "#af080d",
          textDecorationColor: "#f1f4ff",
        }, // Cor de fundo e texto
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) form.reset();
      }}
    >
      <DialogTrigger></DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[90vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registro de Fornecedor</DialogTitle>
          <DialogDescription>Preencha os campos abaixo.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {/** Campos do formulário */}

            <FormField
              control={form.control}
              name="nome_fornecedor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Fornecedor</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cnpj_fornecedor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipo_fornecedor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Fornecedor</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="representante_responsavel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Representante Responsável</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="localizacao_fornecedor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefone_fornecedor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email_fornecedor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="data_contratada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Contratada</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="data_termino"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Término</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="mt-4">
                Salvar
              </Button>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateFornecedorButton;
