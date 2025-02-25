"use client";
import { addUpdateOrcamentos } from "@/app/_actions/orcamentos";
import { MoneyInput } from "@/app/_components/money-input";
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

const OrcamentosSchema = z.object({
  id: z.number(),
  nome_orcamento: z.string().nullable(),
  cliente_orcamento: z.string().nullable(),
  email_cliente: z.string().nullable(),
  vendedor: z.string().nullable(),
  assunto: z.string().nullable(),
  mensagem: z.string().nullable(),
  tipo_evento: z.string().nullable(),
  tipo_orcamento: z.string().nullable(),
  data_orcamento: z.date().nullable(),
  valor_orcamento: z.number().nullable(),
  forma_pagamento: z.string().nullable(),
  parcelas_orcamento: z.number().nullable(),
  max_participantes: z.number().nullable(),
  valor_negociado: z.number().nullable(),
  forma_pagamento_negociado: z.string().nullable(),
  parcelas_negociadas: z.number().nullable(),
  data_negociacao: z.date().nullable(),
  data_principal_evento: z.date().nullable(),
  idVendedor_orcamento: z.string().nullable(),
  idVendedor_negociacao: z.string().nullable(),
  status_orcamento: z.string().nullable(),
  data_criacao: z.date().nullable(),
  data_atualizacao: z.date().nullable(),
  data_retorno: z.date().nullable(),
  observacao: z.string().nullable(),
  codigoInterno: z.string().nullable(),
  numeroConvidados: z.number().nullable(),
  valorInicial: z.number().nullable(),
  whatsapp: z.string().nullable(),
  ddiTelefone: z.string().nullable(),
  telefone: z.string().nullable(),
  ddiCelular: z.string().nullable(),
  celular: z.string().nullable(),
  como_conheceu: z.string().nullable(),
  idLocalEvento: z.number().nullable(),
  nomeResponsavel: z.string().nullable(),
  obs2: z.string().nullable(),
  obs3: z.string().nullable(),
  obs4: z.string().nullable(),
  nomeDoEvento: z.string().nullable(),
  datasAdicionais: z.any().nullable(),
  funil: z.string().nullable(),
  id_empresa: z.number().nullable(),
  userID: z.string().nullable(),
});

// Tipo inferido a partir do schema Zod
type OrcamentosForm = z.infer<typeof OrcamentosSchema>;

interface UpdateDialogProps {
  isOpen: boolean;
  defaultValues?: Partial<OrcamentosForm>;
  setIsOpen: (isOpen: boolean) => void;
}

const UpdateOrcamentoButton = ({
  isOpen,
  setIsOpen,
  defaultValues,
}: UpdateDialogProps) => {
  const form = useForm<OrcamentosForm>({
    resolver: zodResolver(OrcamentosSchema),
    defaultValues: defaultValues ?? {
      id: 0,
      nome_orcamento: null,
      cliente_orcamento: null,
      email_cliente: null,
      vendedor: null,
      assunto: null,
      mensagem: null,
      tipo_evento: null,
      tipo_orcamento: null,
      data_orcamento: null,
      valor_orcamento: null,
      forma_pagamento: null,
      parcelas_orcamento: null,
      max_participantes: null,
      valor_negociado: null,
      forma_pagamento_negociado: null,
      parcelas_negociadas: null,
      data_negociacao: null,
      data_principal_evento: null,
      idVendedor_orcamento: null,
      idVendedor_negociacao: null,
      status_orcamento: null,
      data_criacao: null,
      data_atualizacao: null,
      data_retorno: null,
      observacao: null,
      codigoInterno: null,
      numeroConvidados: null,
      valorInicial: null,
      whatsapp: null,
      ddiTelefone: null,
      telefone: null,
      ddiCelular: null,
      celular: null,
      como_conheceu: null,
      idLocalEvento: null,
      nomeResponsavel: null,
      obs2: null,
      obs3: null,
      obs4: null,
      nomeDoEvento: null,
      datasAdicionais: null,
      funil: null,
      id_empresa: 1,
      userID: null,
    },
  });

  const onSubmit = async (data: OrcamentosForm) => {
    console.log(data);
    try {
      await addUpdateOrcamentos({
        ...data,
        datasAdicionais: data.datasAdicionais ?? null,
      });
      toast("Registro de Orçamento salvo com sucesso!", {
        description: (
          <div className="flex items-center">
            <CircleCheckBigIcon className="mr-2 text-white" />
            <span>{`${data.nome_orcamento} salvo em ${new Date().toLocaleString()}`}</span>
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
          <DialogTitle>Registro de Orçamento</DialogTitle>
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
              name="nome_orcamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Orçamento</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cliente_orcamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email_cliente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vendedor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendedor</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipo_evento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Evento</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="data_orcamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data do Orçamento</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={
                        field.value ? field.value.toString().split("T")[0] : ""
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="valor_orcamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor do Orçamento</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor..."
                      value={field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status_orcamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
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

export default UpdateOrcamentoButton;
