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

// Schema atualizado para a nova interface
const formSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  inicio: z.string().min(1, "Data de início é obrigatória"),
  fim: z.string().min(1, "Data de fim é obrigatória"),
  descricao: z.string().optional(),
  nomeCliente: z.string().min(1, "Nome do cliente é obrigatório"),
  localEvento: z.string().min(1, "Local da Agenda é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  estado: z
    .string()
    .min(1, "Estado é obrigatório")
    .max(2, "Use a sigla do estado"),
  observacao: z.string().optional(),
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
      titulo: "",
      inicio: "",
      fim: "",
      descricao: "",
      nomeCliente: "",
      localEvento: "",
      cidade: "",
      estado: "",
      observacao: "",
      ...defaultValues,
    },
  });

  const handleSubmit = async (data: FormSchema) => {
    try {
      onSubmit(data);
      toast("agenda salvo com sucesso!", {
        description: (
          <div className="flex items-center">
            <CircleCheckBigIcon className="mr-2 text-white" />
            <span>{`${data.titulo} salvo em ${new Date().toLocaleString()}`}</span>
          </div>
        ),
        style: {
          background: "#007300",
          color: "#fff",
        },
      });
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
              name="titulo"
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
              name="inicio"
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
              name="fim"
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
              name="nomeCliente"
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
              name="cidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Cidade da agenda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado (UF)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sigla do estado (ex: SP)"
                      maxLength={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Descrição detalhada da agenda"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="observacao"
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
