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
import { toast } from "sonner";
import { AlertTriangleIcon, CircleCheckBigIcon } from "lucide-react";
import { Agenda } from "../layout-agenda";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

// Schema atualizado para a nova interface
const formSchema = z.object({
  idAgendaGeral: z.number().optional(), // Adicionando idAgendaGeral
  titulo_agenda: z.string().min(1, "Título é obrigatório"),
  datahora_inicial: z.string(), // Altera para string
  datahora_final: z.string(), // Altera para string
  informacoes_extras: z.string().optional(),
  responsavel_agenda: z.string().min(1, "Nome do cliente é obrigatório"),
  localEvento: z.string().optional(),
  status_compromisso: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormSchema) => void;
  defaultValues?: Partial<Agenda>; // Alterando para Agenda
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
      idAgendaGeral: defaultValues?.idAgendaGeral || undefined, // Define o idAgendaGeral
      titulo_agenda: defaultValues?.titulo_agenda ?? "", // Usa titulo_agenda
      datahora_inicial:
        defaultValues?.datahora_inicial ??
        new Date().toISOString().slice(0, 16), // Mantém como string
      datahora_final:
        defaultValues?.datahora_final ?? new Date().toISOString().slice(0, 16), // Mantém como string
      informacoes_extras: defaultValues?.informacoes_extras ?? "", // Usa informacoes_extras
      responsavel_agenda: defaultValues?.responsavel_agenda ?? "", // Usa responsavel_agenda
      localEvento: defaultValues?.localizacao ?? "", // Usa localizacao
      status_compromisso: defaultValues?.status_compromisso ?? "Pendente", // Valor padrão
    },
  });

  const handleSubmit = async (data: FormSchema) => {
    try {
      onSubmit(data);
      toast("agenda salvo com sucesso!", {
        description: (
          <div className="flex items-center">
            <CircleCheckBigIcon className="mr-2 text-white" />
            <span>{`${data.titulo_agenda} salvo em ${new Date().toLocaleString()}`}</span>
          </div>
        ),
        style: {
          background: "#007300",
          color: "#fff",
        },
      });
      form.reset();
      onClose();
    } catch (error) {
      toast("Falha ao salvar o agenda!", {
        description: <AlertTriangleIcon />,
        style: {
          background: "#af080d",
          color: "#fff",
        },
      });
      console.error("Erro ao salvar agenda:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[200vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Compromisso</DialogTitle>
          <DialogDescription>Preencha os campos abaixo:</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {/* Campos do formulário atualizados */}
            <FormField
              control={form.control}
              name="titulo_agenda"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título da agenda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="datahora_inicial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data e Hora de Início</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="datahora_final"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data e Hora de Término</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsavel_agenda"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="localEvento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local da agenda</FormLabel>
                  <FormControl>
                    <Input placeholder="Local onde será realizado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status_compromisso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status do Compromisso</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Confirmado">Confirmado</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="informacoes_extras"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Input placeholder="Observações adicionais" {...field} />
                  </FormControl>
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

export default AddEventDialog;
