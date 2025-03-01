"use client";
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
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { AlertTriangleIcon } from "lucide-react";
import { createUser, updateUser } from "@/app/_actions/clerkUsuarios";

const userSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(2, { message: "Digite um nome válido" }),
  lastName: z.string().min(2, { message: "Digite um sobrenome válido" }),
  email: z.string().email({ message: "Digite um e-mail válido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .optional(),
});

type UserSchema = z.infer<typeof userSchema>;

interface UpsertUserDialogProps {
  children: React.ReactNode;
  defaultValues?: Partial<UserSchema>;
  isEdit: boolean;
  onClose?: () => void;
}

export const UpsertUserDialog = ({
  children,
  defaultValues,
  isEdit,
  onClose,
}: UpsertUserDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const title = isEdit ? "Editar Usuário" : "Criar Novo Usuário";

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserSchema) => {
    try {
      if (isEdit) {
        await updateUser({
          id: data.id ?? "",
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      } else {
        await createUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        });
      }
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      toast.error("Falha ao salvar os dados!", {
        description: <AlertTriangleIcon />,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Preencha os campos abaixo.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input placeholder="Sobrenome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@exemplo.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isEdit && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="Senha" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
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
};
