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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { toast } from "sonner";
import { AlertTriangleIcon, CircleCheckBigIcon } from "lucide-react";
import { addUpdateFinanceiro } from "@/app/_actions/criar-atualizarFinanceiro";

// Definição do schema do Zod
const formSchema = z.object({
  id: z.number().optional(),
  evento: z.string().nullable(),
  datacompetencia: z.date().nullable(),
  idrecebidode: z.string().nullable(),
  recebidode: z.string().nullable(),
  informede: z.string().nullable(),
  juros: z.number().nullable(),
  multa: z.number().nullable(),
  desconto: z.number().nullable(),
  pago: z.string().nullable(),
  idconta: z.string().nullable(),
  conta: z.string().nullable(),
  idcategoria: z.string().nullable(),
  categoria: z.string().nullable(),
  idcentrodecusto: z.string().nullable(),
  centrodecusto: z.string().nullable(),
  mododepagamento: z.string().nullable(),
  parcelas: z
    .object({
      id: z.number().nullable(),
      datapagamento: z.string().nullable(),
      valor: z.number().nullable(),
      descricao: z.string().nullable(),
    })
    .nullable(),
  idevento: z.string().nullable(),
  descricao: z.string().nullable(),
  valor: z.number().nullable(),
  tipocobranca: z.string().nullable(),
  datapagamento: z.date().nullable(),
  userID: z.string().nullable(),
  data_criacao: z.date(),
  data_update: z.date(),
  id_empresa: z.number().nullable(),
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

const EditDialogFinancas = ({
  isOpen,
  defaultValues,
  setIsOpen,
  financeiroId,
}: EditDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: undefined,
      evento: "",
      datacompetencia: null,
      idrecebidode: null,
      recebidode: "",
      informede: "",
      juros: null,
      multa: null,
      desconto: null,
      pago: null,
      idconta: null,
      conta: "",
      idcategoria: null,
      categoria: "",
      idcentrodecusto: null,
      centrodecusto: "",
      mododepagamento: null,
      parcelas: null,
      idevento: null,
      descricao: "",
      valor: null,
      tipocobranca: null,
      datapagamento: null,
      userID: null,
      data_criacao: new Date(),
      data_update: new Date(),
      id_empresa: null,
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
      await addUpdateFinanceiro(data);
      toast("Registro Financeiro salvo com sucesso!", {
        description: (
          <div className="flex items-center">
            <CircleCheckBigIcon className="mr-2 text-white" />
            <span>{`${data.descricao} salva em ${new Date().toLocaleString()}`}</span>
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
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a descrição..."
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
              name="evento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evento</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o evento..."
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
                    defaultValue={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de cobrança" />
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
                    defaultValue={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
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
                    defaultValue={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o modo de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key={"Dinheiro"} value={"Dinheiro"}>
                        {"Dinheiro"}
                      </SelectItem>
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
                      <SelectItem key={"Transfêrencia"} value={"Transfêrencia"}>
                        {"Transfêrencia"}
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
              name="datapagamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Pagamento</FormLabel>
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

            {/* Outros campos aqui... */}

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

export default EditDialogFinancas;
