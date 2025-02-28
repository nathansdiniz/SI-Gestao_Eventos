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
} from "@/app/_components/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/_components/ui/tabs";
import { Button } from "@/app/_components/ui/button";
import { FinanceiroPropos } from "@/app/_props";
import { atualizarFinanceiroEvento } from "@/app/_actions/eventos/financeiro";
import { db } from "@/app/_lib/prisma";

interface FinanceiroDialogProps {
  isOpen: boolean;
  dados: FinanceiroPropos;
  financeiroId?: string;
  onClose?: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

const FileUploadDialog = ({
  dados,
  isOpen,
  setIsOpen,
}: FinanceiroDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the list of files from the server
    const fetchFiles = async () => {
      try {
        const response = await db.financeiroME.findFirst({
          where: { id: dados.id },
        });
        const data = response?.documentos_anexados;
        if (data) {
          setFileList(data as string[]);
        }
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

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

    try {
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Arquivo enviado com sucesso!");
        setSelectedFile(null);
        // Refresh the file list
        const data = await response.json();
        setFileList(data.files);

        // Atualizar o banco de dados com o novo arquivo
        const filePath = data.files[0];
        const updatedDados = {
          ...dados,
          documentos_anexos: filePath,
        };
        await atualizarFinanceiroEvento(updatedDados);
      } else {
        alert("Falha ao enviar o arquivo.");
      }
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
      <DialogContent className="max-h-[90vh] max-w-[90vh] overflow-y-auto">
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
            <ul>
              {fileList.map((file, index) => (
                <li key={index}>{file}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="upload">
            <input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload}>Enviar Arquivo</Button>
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
