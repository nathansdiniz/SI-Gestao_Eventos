"use client";
import { addUpdateEmpresas } from "@/app/_actions/criar-atualizarEmpresas";
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

const formSchema = z.object({
  id: z.number(),
  userID: z.string(),
  empresa: z.string().trim().min(1, {
    message: "Empresa é obrigatório.",
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
  data_created: z.date(),
  data_updated: z.date(),
  site: z.string(),
  email: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  localizacao_empresa: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  ramo_empresa: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  gestor_responsavel: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  telefone: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
});
type FormSchema = z.infer<typeof formSchema>;

interface UpdateDialogProps {
  isOpen: boolean;
  defaultValues?: Partial<FormSchema>;
  setIsOpen: (isOpen: boolean) => void;
}

const UpdateEmpresasButton = ({
  isOpen,
  setIsOpen,
  defaultValues,
}: UpdateDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      id: 0,
      userID: "",
      empresa: "",
      cnpj: "",
      inscricaoEstadual: "",
      dataAbertura: new Date(),
      site: "",
      email: "",
      localizacao_empresa: "",
      gestor_responsavel: "",
      telefone: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    console.log(data);
    try {
      await addUpdateEmpresas(data);
      console.log("Dados salvos com sucesso!");
      toast("Empresa Salva com sucesso!", {
        description: (
          <div className="flex items-center">
            <CircleCheckBigIcon className="mr-2 text-white" />
            <span>{`${data.empresa} salva em ${new Date().toLocaleString()}`}</span>
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
      console.error("Erro ao salvar dados:", error);
    }
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
      <DialogContent className="max-h-[90vh] max-w-[200vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registro de Empresa</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6 space-y-8 md:grid-cols-3"
          >
            <FormField
              control={form.control}
              name="empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cnpj"
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
              name="inscricaoEstadual"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inscrição Estadual</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataAbertura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Abertura</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <input
                        type="date"
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) => {
                          const date = new Date(e.target.value); // Converter para Date
                          field.onChange(
                            isNaN(date.getTime()) ? undefined : date,
                          ); // Validar se é uma data válida
                        }}
                        className="w-full rounded border bg-transparent p-2 pl-10 text-white"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="localizacao_empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ramo_empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ramo Empresa</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gestor_responsavel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gestor Responsavel</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4 flex flex-wrap justify-center gap-4">
              {" "}
              {/* Footer DENTRO do form */}
              <DialogClose asChild>
                <Button type="button" variant={"ghost"}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>{" "}
          {/* Formulário FECHADO aqui */}
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEmpresasButton;
