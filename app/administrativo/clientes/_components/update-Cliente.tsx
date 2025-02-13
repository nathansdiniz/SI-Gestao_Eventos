"use client";
import { addUpdateClientes } from "@/app/_actions/clientes";
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

const ClientesSchema = z.object({
  id: z.number(),
  tipoCadastro: z.string().nullable(),
  cliente: z.string(),
  cpf_cnpj_cliente: z.string().nullable(),
  razaoSocial: z.string().nullable(),
  nomeFantasia: z.string().nullable(),
  inscricaoMunicipal: z.string().nullable(),
  inscricaoEstadual: z.string().nullable(),
  data_nasc: z.date().nullable(),
  estadoCivil: z.string().nullable(),
  email: z.string().email().nullable(),
  telefone: z.string().nullable(),
  endereco: z.string().nullable(),
  cep: z.string().nullable(),
  complemento: z.string().nullable(),
  cidade: z.string().nullable(),
  estado: z.string().nullable(),
  pais: z.string().nullable(),
  pontoReferencia: z.string().nullable(),
  anotacoes: z.string().nullable(),
  dataCadastro: z.date(),
  ddiTelefone: z.string().nullable(),
  ddiTelefone2: z.string().nullable(),
  telefone2: z.string().nullable(),
  ddiCelular: z.string().nullable(),
  celular: z.string().nullable(),
  redeSocial: z.string().nullable(),
  id_empresa: z.number().nullable(),
  userID: z.string().nullable(),
});

// Tipo inferido a partir do schema Zod
type ClientesForm = z.infer<typeof ClientesSchema>;

interface UpdateDialogProps {
  isOpen: boolean;
  defaultValues?: Partial<ClientesForm>;
  setIsOpen: (isOpen: boolean) => void;
}

const UpdateClienteButton = ({
  isOpen,
  setIsOpen,
  defaultValues,
}: UpdateDialogProps) => {
  const form = useForm<ClientesForm>({
    resolver: zodResolver(ClientesSchema), // Corrigido para usar ClientesSchema
    defaultValues: defaultValues ?? {
      id: 0,
      tipoCadastro: null,
      cliente: "",
      cpf_cnpj_cliente: null,
      razaoSocial: null,
      nomeFantasia: null,
      inscricaoMunicipal: null,
      inscricaoEstadual: null,
      data_nasc: null,
      estadoCivil: null,
      email: null,
      telefone: null,
      endereco: null,
      cep: null,
      complemento: null,
      cidade: null,
      estado: null,
      pais: null,
      pontoReferencia: null,
      anotacoes: null,
      dataCadastro: new Date(),
      ddiTelefone: null,
      ddiTelefone2: null,
      telefone2: null,
      ddiCelular: null,
      celular: null,
      redeSocial: null,
      id_empresa: null,
      userID: null,
    },
  });

  const onSubmit = async (data: ClientesForm) => {
    console.log(data);
    try {
      await addUpdateClientes(data);
      toast("Registro de Cliente salvo com sucesso!", {
        description: (
          <div className="flex items-center">
            <CircleCheckBigIcon className="mr-2 text-white" />
            <span>{`${data.cliente} salvo em ${new Date().toLocaleString()}`}</span>
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
          <DialogTitle>Registro de Cliente</DialogTitle>
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
              name="cliente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf_cnpj_cliente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF/CNPJ</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
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
                    <Input
                      type="email"
                      {...field}
                      value={field.value ?? ""} // Converte `null` para `""`
                    />
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
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="celular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endereco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
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
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pais"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
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

export default UpdateClienteButton;
