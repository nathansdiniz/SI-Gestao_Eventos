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
  id: z.number().optional(),
  userID: z.string().optional(),
  empresa: z.string().trim().min(1, {
    message: "Empresa é obrigatório.",
  }),
  cnpj: z.string().trim().min(1, {
    message: "CNPJ é obrigatório.",
  }),
  dataAbertura: z.date({
    required_error: "A data é obrigatório.",
  }),
  ramo_empresa: z.string().optional().or(z.literal("")),
  localizacao_empresa: z.string().optional().or(z.literal("")),
  gestor_responsavel: z.string().optional().or(z.literal("")),
  email: z.string().optional().or(z.literal("")),
  inscricaoEstadual: z.string().optional().or(z.literal("")),
  inscricaoMunicipal: z.string().optional().or(z.literal("")),
  site: z.string().optional().or(z.literal("")),
  telefone: z.string().optional().or(z.literal("")),
  data_created: z.date().optional(),
  data_updated: z.date().optional(),
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
      userID: "Indefinido",
      empresa: "",
      cnpj: "",
      ramo_empresa: "Indefinido",
      localizacao_empresa: "Indefinido",
      dataAbertura: new Date(),
      gestor_responsavel: "Indefinido",
      email: "email@exemplo.com",
      inscricaoEstadual: "Indefinido",
      inscricaoMunicipal: "Indefinido",
      site: "https://exemplo.com",
      data_created: new Date(),
      telefone: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    console.log(data);
    try {
      await addUpdateEmpresas({
        ...data,
        email: data.email ?? "",
        ramo_empresa: data.ramo_empresa ?? "",
        localizacao_empresa: data.localizacao_empresa ?? "",
        gestor_responsavel: data.gestor_responsavel ?? "",
        inscricaoEstadual: data.inscricaoEstadual ?? "",
        inscricaoMunicipal: data.inscricaoMunicipal ?? "",
        site: data.site ?? "",
        telefone: data.telefone ?? "",
      });
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
                          const date = new Date(e.target.value);
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
              name="ramo_empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ramo da Empresa</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ramo da Empresa" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gestor_responsavel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gestor Responsável</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Gestor Responsável" />
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
                    <Input {...field} placeholder="E-mail" />
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
                    <Input {...field} placeholder="Inscrição Estadual" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inscricaoMunicipal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inscrição Municipal</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Inscrição Municipal" />
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
                    <Input {...field} placeholder="Telefone" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="site"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Site" />
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
