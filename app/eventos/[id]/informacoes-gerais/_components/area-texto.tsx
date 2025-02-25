"use client";
import BotaoVoltar from "@/app/_components/botao-voltar";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/app/_components/ui/button";
import { NotebookPenIcon } from "lucide-react";
import {
  criar_atualizarEventoInforGerais,
  dadosInforGerais,
} from "@/app/_actions/eventos/inforGerais";
import { useSearchParams } from "next/navigation";

const RichTextEditor = dynamic(() => import("@mantine/rte"), { ssr: false });

const AreaTextoInfor = () => {
  const searchParams = useSearchParams();
  const idEvento = searchParams.get("view");
  console.log("ID do evento:", idEvento);
  const [content, setContent] = useState(""); // Estado para armazenar o conteúdo formatado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dadosInforGerais(Number(idEvento)); // Substitua pelo valor correto
        console.log("Dados do banco:", response);
        if (response) {
          const data = response;
          setContent(data.documento || ""); // Preencher o editor com os dados do banco
        } else {
          throw new Error("Erro ao buscar os dados");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [idEvento]);

  const handleSubmit = async () => {
    try {
      const response = await criar_atualizarEventoInforGerais({
        id: Number(idEvento),
        documento: content,
        id_eventos: Number(idEvento),
        userID: "1", // Substitua pelo valor correto
      });

      if (response) {
        console.log("Conteúdo formatado:", content);
        alert("Dados salvos com sucesso!");
      } else {
        throw new Error("Erro ao salvar os dados");
      }
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Erro ao salvar dados.");
    }
  };

  return (
    <div>
      <BotaoVoltar redirecionar={`/eventos/${idEvento}`} />
      <div className="m-12 flex items-center justify-center bg-teal-950">
        <NotebookPenIcon size={44} className="text-center"></NotebookPenIcon>
        <h1
          style={{ textAlign: "center", margin: "20px 0" }}
          className="text-xl font-bold"
        >
          Informações Gerais
        </h1>
      </div>
      <div className="flex items-center">
        <div className="m-12 w-full">
          {/* Editor de texto rico */}
          <RichTextEditor
            value={content}
            onChange={setContent}
            className="max-h-svh" // Altura do editor
          />
          <Button onClick={handleSubmit} className="mt-4 flex justify-center">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AreaTextoInfor;
