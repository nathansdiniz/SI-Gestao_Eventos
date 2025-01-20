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
import { DatePicker } from "@/app/_components/ui/date-picker";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { TRANSACTION_TYPE_OPTIONS } from "@/app/_constants/transactions";

const formSchema = z.object({
  id: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  evento: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  datacompetencia: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  idrecebidode: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  recebidode: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  informede: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  juros: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  multa: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  desconto: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  pago: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  idconta: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  conta: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  idcategoria: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  categoria: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  idcentrodecusto: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  centrodecusto: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  mododepagamento: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  parcelas: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  idevento: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  descricao: z.string().trim().min(1, {
    message: "A descrição é obrigatória.",
  }),
  valor: z
    .number({
      required_error: "O valor é obrigatório.",
    })
    .positive({
      message: "O valor deve ser positivo.",
    }),
  tipocobranca: z.string().min(1, {
    message: "O tipo de cobrança é obrigatório.",
  }),
  datapagamento: z.string({
    required_error: "A data de pagamento é obrigatória.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinanceiroProps {
  id: string;
  evento: string;
  datapagamento: string;
  datacompetencia: string;
  tipocobranca: string;
  idrecebidode: string;
  recebidode: string;
  informede: string;
  descricao: string;
  valor: number;
  juros: string;
  multa: string;
  desconto: string;
  pago: string;
  idconta: string;
  conta: string;
  idcategoria: string;
  categoria: string;
  idcentrodecusto: string;
  centrodecusto: string;
  mododepagamento: string;
  parcelas: string;
  idevento: string;
}

interface EditDialogProps {
  isOpen: boolean;
  defaultValues?: Partial<FormSchema>;
  onClose: () => void;
  onSave: (data: FormSchema) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const EditDialogFinancas = ({
  isOpen,
  defaultValues,
  onSave,
  setIsOpen,
}: EditDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues, // Inicializa o formulário com os valores
  });

  // Atualiza os campos do formulário quando defaultValues mudar
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const onSubmit = (data: FormSchema) => {
    onSave(data);
    setIsOpen(false);
    form.reset(); // Reseta o formulário após salvar
  };

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
          <DialogTitle>Editar Registro</DialogTitle>
          <DialogDescription>
            Atualize os campos necessários abaixo:
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid auto-cols-min grid-cols-3 gap-6"
          >
            {/* Campos do formulário */}
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a descrição..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="evento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evento</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o evento..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parcelas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parcela</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a parcela..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="valor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="juros"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Juros</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o Juros..."
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
              name="multa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Multa</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o Multa..."
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
              name="desconto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desconto</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o desconto..."
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
              name="tipocobranca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Cobrança</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key={"Receita"} value={"Receita"}>
                        {"Entrada"}
                      </SelectItem>
                      <SelectItem key={"Despesa"} value={"Despesa"}>
                        {"Saída"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pago"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key={"sim"} value={"sim"}>
                        {"Pago"}
                      </SelectItem>
                      <SelectItem key={"nao"} value={"nao"}>
                        {"Pendente"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mododepagamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modo de Pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key={"PIX"} value={"PIX"}>
                        {"PIX"}
                      </SelectItem>
                      <SelectItem
                        key={"Cartão de Crédito"}
                        value={"Cartão de Crédito"}
                      >
                        {"Cartão de Crédito"}
                      </SelectItem>
                      <SelectItem
                        key={"Cartão de Débito"}
                        value={"Cartão de Débito"}
                      >
                        {"Cartão de Débito"}
                      </SelectItem>
                      <SelectItem
                        key={"Boleto Bancário"}
                        value={"Boleto Bancário"}
                      >
                        {"Boleto Bancário"}
                      </SelectItem>
                      <SelectItem key={"Não Informado"} value={"Não Informado"}>
                        {"Não Informado"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="datacompetencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Competência</FormLabel>
                  <DatePicker
                    value={new Date(field.value)}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="datapagamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Pagamento</FormLabel>
                  <DatePicker
                    value={new Date(field.value)}
                    onChange={field.onChange}
                  />
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
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialogFinancas;
