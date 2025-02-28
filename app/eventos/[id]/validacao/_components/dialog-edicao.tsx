"use client";
import { useEffect, useState } from "react";
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
import consultarEventos from "@/app/_actions/consultar-inputEventos";
import { formSchemaFinanceiro } from "@/app/_props";
import { adicionarAtualizarFinanceiroEvento } from "@/app/_actions/eventos/financeiro";

type FormSchema = z.infer<typeof formSchemaFinanceiro>;

interface EditDialogProps {
  isOpen: boolean;
  defaultValues?: Partial<FormSchema>;
  financeiroId?: string;
  nomeEvento?: string;
  onClose?: () => void;
  onSave?: (data: FormSchema) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const EditDialogFinancas = ({
  isOpen,
  defaultValues,
  setIsOpen,
  nomeEvento,
  financeiroId,
}: EditDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchemaFinanceiro),
    defaultValues: {
      id: undefined,
      evento: nomeEvento ?? "",
      datapagamento: null,
      datacompetencia: null,
      tipocobranca: "",
      idrecebidode: "",
      recebidode: "",
      informede: "",
      descricao: "",
      valor: null,
      juros: null,
      multa: null,
      desconto: null,
      pago: "",
      idconta: "",
      conta: "",
      idcategoria: "",
      categoria: "",
      idcentrodecusto: "",
      centrodecusto: "",
      mododepagamento: "",
      parcelas: null,
      idevento: financeiroId,
      id_empresa: null,
      data_criacao: new Date(),
      data_update: new Date(),
      validacao: "Pendente",
      informacoes_extras: "",
      ultima_alteracao_validacao: "",
      userID: "",
      recorrencia: "Nenhuma",
      periodo_final: null,
      documentos_anexados: null,
      ...defaultValues,
    },
  });

  const [eventos, setEventos] = useState<
    { id: number; nomeEvento: string | null }[]
  >([]);

  // Atualiza os campos do formulário quando defaultValues mudar
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  useEffect(() => {
    async function fetchEventos() {
      try {
        const res = await consultarEventos();
        const data = res;
        console.log(res);
        setEventos(data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    }

    fetchEventos();
  }, []);

  const onSubmit = async (data: FormSchema) => {
    console.log(data);

    try {
      const registros = [data];
      const dataAtual = new Date(data.datacompetencia ?? ""); // Converte para Date
      const dataFinal = new Date(data.periodo_final ?? ""); // Data final

      while (dataAtual <= dataFinal) {
        // Avança a data com base na recorrência
        if (data.recorrencia === "Mensal") {
          dataAtual.setMonth(dataAtual.getMonth() + 1);
        } else if (data.recorrencia === "Semanal") {
          dataAtual.setDate(dataAtual.getDate() + 7);
        } else if (data.recorrencia === "Diaria") {
          dataAtual.setDate(dataAtual.getDate() + 1);
        } else if (data.recorrencia === "Quinzenal") {
          dataAtual.setDate(dataAtual.getDate() + 15);
        }

        registros.push({
          ...data,
          id: undefined, // Garante um novo ID para cada registro
          datacompetencia: new Date(dataAtual), // Clona corretamente a data
        });
      }

      // Salva todos os registros no banco de dados
      for (const registro of registros) {
        await adicionarAtualizarFinanceiroEvento({
          ...registro,
          id: registro.id ?? 0,
          idevento: financeiroId,
          evento: nomeEvento,
        });
      }
      console.log(registros);

      toast("Registros financeiros salvos com sucesso!", {
        description: (
          <div className="flex items-center">
            <CircleCheckBigIcon className="mr-2 text-white" />
            <span>{`${registros.length} registros criados`}</span>
          </div>
        ),
        style: { background: "#007300", textDecorationColor: "#f1f4ff" },
      });

      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast("Falha ao salvar os dados!", {
        description: <AlertTriangleIcon />,
        style: { background: "#af080d", textDecorationColor: "#f1f4ff" },
      });
      console.error("Erro ao salvar dados:", error);
    }
  };

  const isUpdate = Boolean(defaultValues?.id);

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
              name="idevento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evento</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? undefined}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um evento" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventos.map((evento) => (
                          <SelectItem
                            key={evento.id}
                            value={evento.id.toString()}
                          >
                            {evento.nomeEvento}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <FormLabel>Data de Vencimento</FormLabel>
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

            <FormField
              control={form.control}
              name="recorrencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recorrente</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a recorrência" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key={"Nenhuma"} value={"Nenhuma"}>
                        {"Nenhuma"}
                      </SelectItem>
                      <SelectItem key={"Diaria"} value={"Diaria"}>
                        {"Diaria"}
                      </SelectItem>
                      <SelectItem key={"Semanal"} value={"Semanal"}>
                        {"Semanal"}
                      </SelectItem>
                      <SelectItem key={"Quinzenal"} value={"Quinzenal"}>
                        {"Quinzenal"}
                      </SelectItem>
                      <SelectItem key={"Mensal"} value={"Mensal"}>
                        {"Mensal"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("recorrencia") !== "Nenhuma" && (
              <FormField
                control={form.control}
                name="periodo_final"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Final</FormLabel>
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
            )}

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
