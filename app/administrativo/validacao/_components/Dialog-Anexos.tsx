"use client";
import React, { useState, useEffect, useRef } from "react";
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
import { FileTextIcon } from "lucide-react";

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
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (dados.documentos_anexados) {
      if (Array.isArray(dados.documentos_anexados)) {
        setFileList(dados.documentos_anexados);
      } else if (typeof dados.documentos_anexados === "string") {
        setFileList(JSON.parse(dados.documentos_anexados));
      }
    }
    return () => setFileList([]);
  }, [dados.documentos_anexados]);

  console.log(fileList);

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

      const data = await response.json();
      console.log("Resposta da API:", data);

      if (data.status === "fail") {
        console.error("Resposta inesperada da API:", data);
        alert(`Erro ao processar os arquivos: ${data.error}`);
        return;
      }
      alert("Arquivo enviado com sucesso.");
      // Atualiza a lista de arquivos
      setFileList((prevFiles) => [...prevFiles, data.file]);
      setSelectedFile(null);
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
      alert("Erro ao enviar o arquivo.");
    }
  };

  const handleDownload = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = downloadLinkRef.current;
      if (link) {
        link.href = url;
        link.download = fileUrl.split("/").pop() || "download";
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Erro ao baixar o arquivo:", error);
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        setIsOpen(open);
        if (!open) {
          setSelectedFile(null);
          setFileList([]);
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
                    <a
                      onClick={() => handleDownload(file)}
                      style={{
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FileTextIcon size={24} className="mr-2" />{" "}
                      {/* Ícone à esquerda com margem direita */}
                      <span>
                        {/* Nome do arquivo */}
                        {file
                          .replace(`/uploads/${pasta}/`, "")
                          .replace(`/public/uploads/${pasta}/`, "")
                          .replace("public", "")}
                      </span>
                    </a>
                    <a
                      href="#"
                      ref={downloadLinkRef}
                      style={{ display: "none" }}
                    >
                      Download
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
