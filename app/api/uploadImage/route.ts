import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { db } from "@/app/_lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const documentId = formData.get("financeiroId") as string; // ID do documento no banco
    const pasta = formData.get("pasta") as string;
    console.log(documentId);

    if (!file || !documentId) {
      return NextResponse.json({
        status: "fail",
        error: "Arquivo ou ID ausente",
      });
    }

    // Define diretório de upload
    const uploadDir = path.join(process.cwd(), "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Salva o arquivo no servidor
    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    // Caminho relativo salvo no banco
    const fileUrl = `/uploads/${pasta}/id_${documentId}_${file.name}`;

    // Atualiza ou cria registro no banco de dados
    if (pasta === "documentosEventos") {
      const existingDocument = await db.financeiroEventos.findUnique({
        where: { id: Number(documentId) },
      });
      const anexos = (existingDocument?.documentos_anexados as string[]) || [];

      anexos.push(fileUrl);
      // Atualiza documentos_anexados se já existir
      await db.financeiroEventos.update({
        where: { id: Number(documentId) },
        data: {
          documentos_anexados: anexos,
        },
      });
    } else if (pasta === "documentosFinanceiros") {
      const existingDocument = await db.financeiroME.findUnique({
        where: { id: Number(documentId) },
      });
      const anexos = (existingDocument?.documentos_anexados as string[]) || [];

      anexos.push(fileUrl);
      // Atualiza documentos_anexados se já existir

      await db.financeiroME.update({
        where: { id: Number(documentId) },
        data: {
          documentos_anexados: anexos,
        },
      });
    }

    return NextResponse.json({ status: "success", file: fileUrl });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}
