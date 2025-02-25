"use client";
import { useEffect } from "react";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { MoneyInput } from "@/app/_components/money-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertTriangleIcon, CircleCheckBigIcon } from "lucide-react";
import { addUpdateContasBancarias } from "@/app/_actions/criar-atualizarContasBancarias";

const formSchema = z.object({
  id: z.number().optional(),
  nomeConta: z.string(),
  banco: z.string(),
  tipo_conta: z.string(),
  agencia: z.string(),
  conta: z.string(),
  saldoBancario: z.number().nullable(),
  totalEntradas: z.number().nullable(),
  totalSaidas: z.number().nullable(),
  ultima_atualizacao_saldo: z.date(),
  data_criacao: z.date(),
  data_atualizacao: z.date(),
  userID: z.string().nullable(),
  id_empresa: z.number(),
});

type FormSchema = z.infer<typeof formSchema>;

interface EditDialogProps {
  isOpen: boolean;
  defaultValues?: Partial<FormSchema>;
  financeiroId?: string;
  onClose?: () => void;
  onSave?: (data: FormSchema) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const EditDialogContasBancarias = ({
  isOpen,
  defaultValues,
  setIsOpen,
  financeiroId,
}: EditDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      nomeConta: "",
      banco: "",
      tipo_conta: "",
      agencia: "",
      conta: "",
      saldoBancario: null,
      totalEntradas: null,
      totalSaidas: null,
      ultima_atualizacao_saldo: new Date(),
      data_criacao: new Date(),
      data_atualizacao: new Date(),
      userID: null,
      id_empresa: 1,
      ...defaultValues,
    },
  });

  // Atualiza os campos do formulário quando defaultValues mudar
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const onSubmit = async (data: FormSchema) => {
    console.log(data);
    try {
      await addUpdateContasBancarias({ ...data, id: data.id ?? 0 });
      toast("Registro Financeiro salvo com sucesso!", {
        description: (
          <div className="flex items-center">
            <CircleCheckBigIcon className="mr-2 text-white" />
            <span>{`${data.nomeConta} salva em ${new Date().toLocaleString()}`}</span>
          </div>
        ),
        action: {
          label: "X",
          onClick: () => console.log("X"),
        },
        style: {
          background: "#007300",
          textDecorationColor: "#f1f4ff",
        },
      });
      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast("Falha ao salvar os dados!", {
        description: <AlertTriangleIcon />,
        action: {
          label: "X",
          onClick: () => console.log("X"),
        },
        style: {
          background: "#af080d",
          textDecorationColor: "#f1f4ff",
        },
      });
      console.error("Erro ao salvar dados:", error);
    }
  };

  const isUpdate = Boolean(financeiroId);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-[200vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Atualizar" : "Criar"} Registro Financeiro
          </DialogTitle>
          <DialogDescription>Insira as informações abaixo:</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid auto-cols-min grid-cols-3 gap-6"
          >
            {/* Campos do formulário */}
            <FormField
              control={form.control}
              name="nomeConta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Conta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome da conta..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="banco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banco</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o banco..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipo_conta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Conta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o tipo de conta..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agência</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a agência..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="conta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a conta..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saldoBancario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Saldo Bancário</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o saldo bancário..."
                      value={field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalEntradas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total de Entradas</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o total de entradas..."
                      value={field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalSaidas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total de Saídas</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o total de saídas..."
                      value={field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ultima_atualizacao_saldo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Última Atualização do Saldo</FormLabel>
                  <div className="relative w-full">
                    <input
                      type="date"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const dateString = e.target.value;
                        const date = dateString
                          ? new Date(dateString)
                          : undefined;
                        field.onChange(date);
                      }}
                      className="w-full rounded border bg-transparent p-2 pl-10 text-white"
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="data_criacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Criação</FormLabel>
                  <div className="relative w-full">
                    <input
                      type="date"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const dateString = e.target.value;
                        const date = dateString
                          ? new Date(dateString)
                          : undefined;
                        field.onChange(date);
                      }}
                      className="w-full rounded border bg-transparent p-2 pl-10 text-white"
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="data_atualizacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Atualização</FormLabel>
                  <div className="relative w-full">
                    <input
                      type="date"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const dateString = e.target.value;
                        const date = dateString
                          ? new Date(dateString)
                          : undefined;
                        field.onChange(date);
                      }}
                      className="w-full rounded border bg-transparent p-2 pl-10 text-white"
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID do Usuário</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o ID do usuário..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID da Empresa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o ID da empresa..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4 flex flex-wrap justify-center gap-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" size={"lg"}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" size={"lg"}>
                {isUpdate ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialogContasBancarias;
