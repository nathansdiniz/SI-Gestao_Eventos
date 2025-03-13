"use client";
import { addUpdateClientes } from "@/app/_actions/clientes";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/_components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/_components/ui/input";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { CpfCnpjInput } from "@/app/_components/ui/input-cpf-cnpj";
import { CnpjInput } from "@/app/_components/ui/input-cnpj";

const ClientesSchema = z.object({
  id: z.number(),
  tipoCadastro: z.string().nullable(),
  cliente: z.string(),
  cpf_cnpj_cliente: z.string().nullable(),
  razaoSocial: z.string().nullable(),
  nomeFantasia: z.string().nullable(),
  inscricaoMunicipal: z.string().nullable(),
  inscricaoEstadual: z.string().nullable(),
  sexo: z.string().nullable(),
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
    resolver: zodResolver(ClientesSchema),
    defaultValues: defaultValues ?? {
      id: 0,
      tipoCadastro: null,
      cliente: "",
      cpf_cnpj_cliente: null,
      razaoSocial: null,
      nomeFantasia: null,
      inscricaoMunicipal: null,
      inscricaoEstadual: null,
      sexo: null,
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

  const tipoCadastro = useWatch({
    control: form.control,
    name: "tipoCadastro",
  });
  const isUpdate = Boolean(defaultValues?.id);

  const dataNasc = useWatch({
    control: form.control,
    name: "data_nasc",
  });
  console.log(dataNasc);

  console.log(defaultValues);

  const onSubmit = async (data: ClientesForm) => {
    try {
      await addUpdateClientes(data);
      toast.success("Registro de Cliente salvo com sucesso!", {
        description: `${data.cliente} salvo em ${new Date().toLocaleString()}`,
      });
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Falha ao salvar os dados!", {
        description: "Ocorreu um erro ao salvar o cliente.",
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
            {/* Campos do formulário */}
            <FormField
              control={form.control}
              name="tipoCadastro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Cadastro</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pessoa Física">
                        Pessoa Física
                      </SelectItem>
                      <SelectItem value="Pessoa Jurídica">
                        Pessoa Jurídica
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

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
                  <FormLabel>
                    {tipoCadastro === "Pessoa Física" ? "CPF" : "CNPJ"}
                  </FormLabel>
                  <FormControl>
                    {tipoCadastro === "Pessoa Física" ? (
                      <CpfCnpjInput
                        {...field}
                        value={field.value ?? ""}
                        format="###.###.###-##"
                      />
                    ) : (
                      <CnpjInput
                        {...field}
                        value={field.value ?? ""}
                        format="##.###.###/####-##"
                      />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />

            {tipoCadastro === "Pessoa Jurídica" && (
              <>
                <FormField
                  control={form.control}
                  name="razaoSocial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Razão Social</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nomeFantasia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Fantasia</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="inscricaoMunicipal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inscrição Municipal</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="inscricaoEstadual"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inscrição Estadual</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="data_nasc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Registro</FormLabel>
                      <FormControl>
                        <input
                          type="date"
                          value={
                            field.value
                              ? new Date(field.value)
                                  .toISOString()
                                  .split("T")[0]
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
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            {tipoCadastro === "Pessoa Física" && (
              <>
                <FormField
                  control={form.control}
                  name="data_nasc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Nascimento</FormLabel>
                      <FormControl>
                        <input
                          type="date"
                          value={
                            field.value
                              ? new Date(field.value)
                                  .toISOString()
                                  .split("T")[0]
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
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estadoCivil"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado Civil</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value ?? undefined}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Solteiro">Solteiro</SelectItem>
                            <SelectItem value="Casado">Casado</SelectItem>
                            <SelectItem value="Viúvo">Viúvo</SelectItem>
                            <SelectItem value="Divorciado">
                              Divorciado
                            </SelectItem>

                            <SelectItem value="Não Informado">
                              Não Informado
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sexo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ?? undefined}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Feminino">Feminino</SelectItem>
                          <SelectItem value="Masculino">Masculino</SelectItem>
                          <SelectItem value="Outro">Outro</SelectItem>
                          <SelectItem value="Não Informado">
                            Não Informado
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} type="email" />
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
                    <Input {...field} value={field.value ?? ""} type="tel" />
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
                    <Input {...field} value={field.value ?? ""} type="tel" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="redeSocial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rede Social</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} type="text" />
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
                    <Input {...field} value={field.value ?? ""} type="text" />
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
                    <Input {...field} value={field.value ?? ""} type="text" />
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
                    <Input {...field} value={field.value ?? ""} type="text" />
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
                    <Input {...field} value={field.value ?? ""} type="text" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} type="text" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complemento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} type="text" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pontoReferencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ponto de Referência</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} type="text" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="anotacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anotações</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      type="text"
                      className="h-24"
                    />
                  </FormControl>
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
                {isUpdate ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateClienteButton;
