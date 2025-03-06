import React from "react";
import BotaoVoltar from "@/app/_components/botao-voltar";
import CardMenu from "@/app/_components/cards-menu";
import Layout from "@/app/_components/slide-bar";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import {
  Contact2Icon,
  FilesIcon,
  InfoIcon,
  ListChecksIcon,
  Receipt,
  Users,
} from "lucide-react";
import { getEventData } from "@/app/_actions/eventos";
import CheckUserDialog from "@/app/_components/dialog-verificarUsuario";

interface Props {
  params: {
    id: string; // Ou 'number', dependendo do tipo esperado para 'id'
  };
}

const PaginaInformacoesEvento = async ({ params: { id } }: Props) => {
  console.log(id);
  const dadosEvento = await getEventData(Number(id));

  return (
    <>
      <Layout>
        <CheckUserDialog
          redirecionar="detalhesEvento"
          id={id}
        ></CheckUserDialog>
        <main>
          <div className="relative w-full space-y-4 p-4">
            <BotaoVoltar redirecionar="/eventos"></BotaoVoltar>
            <div className="flex justify-center p-2">
              <h1 className="text-2xl font-bold">
                Evento {dadosEvento?.nomeEvento}
              </h1>
            </div>
            <div className="flex justify-center">
              <ScrollArea className="max-w-48">
                <Card>
                  <CardHeader className="text-center font-sans text-sm">
                    Informações do Evento
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col justify-center space-y-2">
                      <span className="text-sm font-bold">Evento:</span>
                      <span className="text-xs">{dadosEvento?.nomeEvento}</span>

                      <span className="text-sm font-bold">Data do Evento:</span>
                      <span className="text-xs">
                        {dadosEvento?.dataEvento?.toLocaleString()}
                      </span>
                      <p>
                        <strong className="text-sm">Horário de Início:</strong>{" "}
                        <span className="text-sm">
                          {dadosEvento?.horarioInicio?.toLocaleString() ||
                            "Não definido"}
                        </span>
                      </p>
                      <p>
                        <strong className="text-sm">Horário de Fim:</strong>{" "}
                        <span className="text-sm">
                          {dadosEvento?.horarioFim?.toLocaleString() ||
                            "Não definido"}
                        </span>
                      </p>

                      <span className="text-sm font-bold">Informações:</span>
                      <span className="text-xs">
                        {dadosEvento?.informacoes}
                      </span>

                      <span className="text-sm font-bold">Observação:</span>
                      <span className="text-xs">{dadosEvento?.observacao}</span>

                      <span className="text-sm font-bold">Convidados:</span>
                      <span className="text-xs">{dadosEvento?.convidados}</span>

                      <span className="text-sm font-bold">
                        Datas Adicionais:
                      </span>
                      <span className="text-xs">
                        {dadosEvento?.datasAdicionais}
                      </span>

                      <span className="text-sm font-bold">Status:</span>
                      <span className="text-xs">{dadosEvento?.status}</span>

                      <span className="text-sm font-bold">Dia Todo:</span>
                      <span className="text-xs">
                        {dadosEvento?.diaTodo ? "Sim" : "Não"}
                      </span>
                      <span className="text-sm font-bold">Local:</span>
                      <span className="text-xs">
                        {dadosEvento?.localEvento}
                      </span>

                      <span className="text-sm font-bold">Endereço:</span>
                      <span className="text-xs">{dadosEvento?.endereco}</span>

                      <span className="text-sm font-bold">Número:</span>
                      <span className="text-xs">{dadosEvento?.numero}</span>

                      <span className="text-sm font-bold">Complemento:</span>
                      <span className="text-xs">
                        {dadosEvento?.complemento}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </ScrollArea>
              <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-1 lg:grid-cols-3">
                <CardMenu
                  title="Informações Gerais"
                  icon={
                    <InfoIcon
                      size={84}
                      className="rounded-sm bg-blue-700 text-white"
                    ></InfoIcon>
                  }
                  descricao="Adicione informações gerais."
                  redirecionar={`/eventos/${id}/informacoes-gerais/?view=${id}`}
                  size="large"
                ></CardMenu>
                <CardMenu
                  title="Financeiro"
                  icon={
                    <Receipt
                      size={84}
                      className="rounded-sm bg-yellow-200 text-white"
                    />
                  }
                  descricao="Gerencie todas as movimentações financeiras do evento."
                  redirecionar={`/eventos/${id}/financeiro/?view=${id}`}
                  size="large"
                ></CardMenu>
                <CardMenu
                  title="Fornecedores"
                  icon={
                    <Contact2Icon
                      size={84}
                      className="rounded-sm bg-white text-black"
                    />
                  }
                  descricao="Todos os fornecedores relacionados ao Evento."
                  redirecionar={`/eventos/${id}/fornecedores`}
                  size="large"
                ></CardMenu>
                <CardMenu
                  title="Validação"
                  icon={
                    <ListChecksIcon
                      size={84}
                      className="rounded-sm bg-green-800"
                    />
                  }
                  descricao="Todos as validações relacionados ao Evento."
                  redirecionar={`/eventos/${id}/validacao/?view=${id}`}
                  size="large"
                ></CardMenu>
                <CardMenu
                  title="Documentos"
                  icon={
                    <FilesIcon size={84} className="rounded-sm bg-yellow-700" />
                  }
                  descricao="Todos os documentos relacionados ao Evento."
                  redirecionar={`/eventos/${id}/documentos`}
                  size="large"
                ></CardMenu>
                <CardMenu
                  title="Historicos"
                  icon={
                    <Users
                      size={84}
                      className="rounded-sm bg-white text-black"
                    />
                  }
                  descricao="Todos os historicos relacionados ao Evento."
                  redirecionar={`/eventos/${id}/historicos`}
                  size="large"
                ></CardMenu>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default PaginaInformacoesEvento;
