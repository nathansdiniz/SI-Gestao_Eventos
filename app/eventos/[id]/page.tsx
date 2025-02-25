import React from "react";
import BotaoVoltar from "@/app/_components/botao-voltar";
import CardMenu from "@/app/_components/cards-menu";
import Layout from "@/app/_components/slide-bar";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { InfoIcon, Receipt, Users } from "lucide-react";
import { getEventData } from "@/app/_actions/eventos";

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
        <main>
          <div className="relative w-full space-y-6 p-6">
            <BotaoVoltar redirecionar="/eventos"></BotaoVoltar>
            <div className="flex justify-center p-10">
              <h1 className="text-4xl font-bold">
                Evento {dadosEvento?.nomeEvento}
              </h1>
            </div>
            <div className="flex justify-center p-4">
              <ScrollArea>
                <Card>
                  <CardHeader className="text-center font-sans text-2xl">
                    Informações do Evento
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col justify-center space-y-4">
                      <span className="font-bold">Evento:</span>
                      <span>{dadosEvento?.nomeEvento}</span>

                      <span className="font-bold">Data do Evento:</span>
                      <span>
                        {dadosEvento?.dataEvento?.toLocaleDateString()}
                      </span>

                      <span className="font-bold">Hora do Evento:</span>
                      <span>{dadosEvento?.horaEvento}</span>

                      <span className="font-bold">Informações:</span>
                      <span>{dadosEvento?.informacoes}</span>

                      <span className="font-bold">Observação:</span>
                      <span>{dadosEvento?.observacao}</span>

                      <span className="font-bold">Código Interno:</span>
                      <span>{dadosEvento?.codigoInterno}</span>

                      <span className="font-bold">Convidados:</span>
                      <span>{dadosEvento?.convidados}</span>

                      <span className="font-bold">Datas Adicionais:</span>
                      <span>{dadosEvento?.datasAdicionais}</span>

                      <span className="font-bold">Status:</span>
                      <span>{dadosEvento?.status}</span>

                      <span className="font-bold">Dia Todo:</span>
                      <span>{dadosEvento?.diaTodo ? "Sim" : "Não"}</span>
                      <span className="font-bold">Local:</span>
                      <span>{dadosEvento?.localEvento}</span>

                      <span className="font-bold">Endereço:</span>
                      <span>{dadosEvento?.endereco}</span>

                      <span className="font-bold">Número:</span>
                      <span>{dadosEvento?.numero}</span>

                      <span className="font-bold">Complemento:</span>
                      <span>{dadosEvento?.complemento}</span>

                      <span className="font-bold">CEP:</span>
                      <span>{dadosEvento?.cep}</span>

                      <span className="font-bold">Bairro:</span>
                      <span>{dadosEvento?.bairro}</span>

                      <span className="font-bold">Cidade:</span>
                      <span>{dadosEvento?.cidade}</span>

                      <span className="font-bold">Estado:</span>
                      <span>{dadosEvento?.estado}</span>
                    </div>
                  </CardContent>
                </Card>
              </ScrollArea>
              <div className="grid grid-cols-1 gap-4 p-7 sm:grid-cols-1 lg:grid-cols-3">
                <CardMenu
                  title="Informações Gerais"
                  icon={<InfoIcon size={84}></InfoIcon>}
                  descricao="Adicione informações gerais."
                  redirecionar={`/eventos/${id}/informacoes-gerais/?view=${id}`}
                  size="large"
                ></CardMenu>
                <CardMenu
                  title="Financeiro"
                  icon={<Receipt size={84} />}
                  descricao="Gerencie todas as movimentações financeiras do evento."
                  redirecionar={`/eventos/${id}/financeiro/?view=${id}`}
                  size="large"
                ></CardMenu>
                <CardMenu
                  title="Fornecedores"
                  icon={<Users size={84} />}
                  descricao="Todos os fornecedores relacionados ao Evento."
                  redirecionar={`/eventos/${id}/fornecedores`}
                  size="large"
                ></CardMenu>
                <CardMenu
                  title="Validação"
                  icon={<Users size={84} />}
                  descricao="Todos as validações relacionados ao Evento."
                  redirecionar={`/eventos/${id}/validacao/?view=${id}`}
                  size="large"
                ></CardMenu>
                <CardMenu
                  title="Documentos"
                  icon={<Users size={84} />}
                  descricao="Todos os documentos relacionados ao Evento."
                  redirecionar={`/eventos/${id}/documentos`}
                  size="large"
                ></CardMenu>
                <CardMenu
                  title="Historicos"
                  icon={<Users size={84} />}
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
