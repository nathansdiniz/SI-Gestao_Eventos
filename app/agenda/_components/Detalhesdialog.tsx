"use client";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertTriangleIcon, CircleCheckBigIcon } from "lucide-react";
import { z } from "zod";
import { Agenda } from "../layout-agenda";
import { atualizarAgenda } from "@/app/_actions/agenda";
import { useEffect } from "react";
import { DeleteEventDialog } from "./excluir-agenda";

interface EditEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  evento: Agenda;
  onConfirm: (idAgendaGeral: number) => void;
}

const eventSchema = z.object({
  idAgendaGeral: z.number(),
  titulo_agenda: z.string().min(1).nullable(),
  tipo_agenda: z.number().nullable(), // Corrigido para number
  responsavel_agenda: z.string().nullable(),
  datahora_inicial: z.string().nullable(),
  datahora_final: z.string().nullable(),
  localizacao: z.string().nullable(),
  informacoes_extras: z.string().nullable(),
  userID: z.string().nullable(),
  data_criacao: z.string().nullable(),
  data_atualizacao: z.string().nullable(),
  status_compromisso: z.string().nullable(),
  id_empresa: z.number().nullable(),
  diaTodo: z.boolean().optional(),
});
type FormSchema = z.infer<typeof eventSchema>;

export function EditEventDialog({
  isOpen,
  onClose,
  evento,
  onConfirm,
}: EditEventDialogProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const form = useForm<Agenda>({
    defaultValues: evento,
    resolver: zodResolver(eventSchema),
  });
  console.log(evento);

  // Atualiza os valores do formulário quando `evento` muda
  useEffect(() => {
    form.reset(evento);
  }, [evento, form]);

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const onSubmit = async (data: FormSchema) => {
    try {
      console.log("Dados do formulário:", data); // Depuração
      await atualizarAgenda({
        ...data,
        tipo_agenda: 0,
        id_empresa: Number(data.id_empresa),
      });
      toast("Evento atualizado com sucesso!", {
        description: (
          <div className="flex items-center">
            <CircleCheckBigIcon className="mr-2 text-white" />
            <span>{`${data.titulo_agenda} atualizado com sucesso`}</span>
          </div>
        ),
        style: { background: "#007300", color: "#fff" },
      });
      onClose();
    } catch (error) {
      toast("Falha ao atualizar o evento!", {
        description: <AlertTriangleIcon />,
        style: { background: "#af080d", color: "#fff" },
      });
      console.log(error);
    }
  };

  const handleConfirmDelete = (idAgendaGeral: number) => {
    onConfirm(idAgendaGeral);
    setIsDeleteDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[200vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Evento</DialogTitle>
          <DialogDescription>
            Confira e edite as informações abaixo:
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="titulo_agenda"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
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
                    <Input
                      type="datetime-local"
                      {...field}
                      value={
                        field.value
                          ? new Date(field.value).toISOString().slice(0, 16)
                          : ""
                      }
                    />
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
                    <Input
                      type="datetime-local"
                      {...field}
                      value={
                        field.value
                          ? new Date(field.value).toISOString().slice(0, 16)
                          : ""
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="localizacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local da Agenda</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="informacoes_extras"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informações Extras</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
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
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                        <SelectItem value="Confirmado">Confirmado</SelectItem>
                        <SelectItem value="Concluído">Concluído</SelectItem>
                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
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
                  <FormLabel>Responsável pela Agenda</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} readOnly />
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
              <Button
                type="button"
                variant="destructive"
                onClick={handleDeleteClick}
              >
                Excluir
              </Button>
              {isDeleteDialogOpen && (
                <DeleteEventDialog
                  isOpen={isDeleteDialogOpen}
                  onClose={handleCloseDeleteDialog}
                  evento={evento}
                  onConfirm={handleConfirmDelete}
                />
              )}
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
