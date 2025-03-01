"use client";
import React, { useState, useEffect } from "react";
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
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/_components/ui/tabs";
import { Button } from "@/app/_components/ui/button";
import { FinanceiroPropos } from "@/app/_props";
import { obterdados1FinanceiroEvento } from "@/app/_actions/eventos/financeiro";
import { obterdados1Financeiro } from "@/app/_actions/criar-atualizarFinanceiro";

interface FinanceiroDialogProps {
  isOpen: boolean;
  dados: FinanceiroPropos;
  pasta: string;
  setIsOpen: (isOpen: boolean) => void;
}

const FileUploadDialog = ({
  dados,
  isOpen,
  setIsOpen,
  pasta,
}: FinanceiroDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<string[]>([]);

  // Função para buscar os arquivos existentes
  const fetchFiles = async () => {
    try {
      const response =
        pasta === "documentosEventos"
          ? await obterdados1FinanceiroEvento(dados.id)
          : await obterdados1Financeiro(dados.id);
      const data = response?.[0]?.documentos_anexados;

      if (data) {
        console.log("Arquivos carregados:", data);
        setFileList(data as string[]);
      }
    } catch (error) {
      console.error("Erro ao buscar arquivos:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [dados.id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Por favor, selecione um arquivo primeiro.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("financeiroId", dados.id.toString());
    formData.append("pasta", pasta);

    try {
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Erro no upload:", await response.text());
        alert("Erro ao enviar o arquivo.");
        return;
      }

      const data = await response.json();
      console.log("Resposta da API:", data);

      if (data.status !== "sucess") {
        console.error("Resposta inesperada da API:", data);
        alert("Erro ao processar os arquivos.");
        return;
      }
      alert("Arquivo enviado com sucesso.");

      // Atualiza a lista de arquivos
      setFileList((prevFiles) => [...prevFiles, ...data.files]);
      setSelectedFile(null);

      // Atualiza os arquivos após o upload
      fetchFiles();
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
      alert("Erro ao enviar o arquivo.");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        setIsOpen(open);
        if (!open) {
          setSelectedFile(null);
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="max-h-[100vh] max-w-[100vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gerenciar Arquivos</DialogTitle>
          <DialogDescription>
            Listar e fazer upload de arquivos
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="list">
          <TabsList>
            <TabsTrigger value="list">Listar Arquivos</TabsTrigger>
            <TabsTrigger value="upload">Upload de Arquivos</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            {fileList.length > 0 ? (
              <ul>
                {fileList.map((file, index) => (
                  <li key={index}>
                    <a href={file} target="_blank" rel="noopener noreferrer">
                      {file}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum arquivo disponível.</p>
            )}
          </TabsContent>

          <TabsContent value="upload">
            <input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload} className="mt-2">
              Enviar Arquivo
            </Button>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4 flex flex-wrap justify-center gap-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" size="lg">
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;
