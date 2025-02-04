"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

// Schema atualizado para corresponder ao Prisma
const formSchema = z.object({
  id: z.number().optional(),
  tipoEvento: z.string().min(1, "Tipo do evento é obrigatório"),
  dataDeCadastro: z.string().min(1, "Data de cadastro é obrigatória"),
  idOrcamento: z.number().optional(),
  idCliente: z.number().optional(),
  nomeCliente: z.string().min(1, "Nome do cliente é obrigatório"),
  dataEvento: z.string().optional(),
  horaEvento: z.string().min(1, "Hora do evento é obrigatória"),
  localEvento: z.string().optional(),
  nomeEvento: z.string().optional(),
  idLocalEvento: z.number().optional(),
  endereco: z.string().optional(),
  numero: z.string().optional(), // Prisma define como Int, mas no form pode ser string para input flexível
  complemento: z.string().optional(),
  cep: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  informacoes: z.string().optional(),
  observacao: z.string().optional(),
  codigoInterno: z.string().optional(),
  convidados: z.number().min(0, "Número de convidados deve ser positivo"),
  datasAdicionais: z.string().optional(), // Mantido como string para refletir Prisma
  status: z.string().min(1, "Status é obrigatório"),
  id_empresa: z.number().min(1, "Empresa é obrigatória"),
  userID: z.string().optional(),
  diaTodo: z.boolean().default(false),
});

type FormSchema = z.infer<typeof formSchema>;

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormSchema) => void;
  defaultValues?: Partial<FormSchema>;
}

export function AddEventDialog({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: AddEventDialogProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoEvento: "",
      dataDeCadastro: new Date().toISOString(),
      nomeCliente: "",
      horaEvento: "",
      status: "Pendente",
      id_empresa: 1, // Defina um valor padrão válido
      convidados: 0,
      diaTodo: false,
      ...defaultValues,
    },
  });

  const handleSubmit = async (data: FormSchema) => {
    try {
      onSubmit(data);
      toast("Evento salvo com sucesso!", {
        description: (
          <div className="flex items-center">
            <CircleCheckBigIcon className="mr-2 text-white" />
            <span>{`${data.tipoEvento} salvo em ${new Date().toLocaleString()}`}</span>
          </div>
        ),
        style: {
          background: "#007300",
          color: "#fff",
        },
      });
      onClose();
    } catch (error) {
      toast("Falha ao salvar o evento!", {
        description: <AlertTriangleIcon />,
        style: {
          background: "#af080d",
          color: "#fff",
        },
      });
      console.error("Erro ao salvar evento:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[200vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Evento</DialogTitle>
          <DialogDescription>Preencha os campos abaixo:</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {/* Campos do formulário */}
            <FormField
              control={form.control}
              name="tipoEvento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Evento</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Casamento, Aniversário..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataDeCadastro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Cadastro</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="horaEvento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora do Evento</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Confirmado">Confirmado</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="col-span-full mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
