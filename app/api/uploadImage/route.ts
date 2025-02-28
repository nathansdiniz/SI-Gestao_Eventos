import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { db } from "@/app/_lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const documentId = formData.get("documentId") as string; // ID do documento no banco

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
    const fileUrl = `/uploads/documentoEventos${file.name}`;

    // Atualiza ou cria registro no banco de dados
    const existingDocument = await db.financeiroEventos.findUnique({
      where: { id: Number(documentId) },
    });

    if (existingDocument) {
      // Atualiza documentos_anexados se já existir
      await db.financeiroEventos.update({
        where: { id: Number(documentId) },
        data: {
          documentos_anexados: {
            push: fileUrl, // Adiciona ao array existente
          },
        },
      });
    } else {
      // Cria um novo registro caso não exista
      await db.financeiroEventos.create({
        data: {
          id: Number(documentId),
          documentos_anexados: { fileUrl }, // Cria um array com o primeiro item
        },
      });
    }

    revalidatePath("/");

    return NextResponse.json({ status: "success", fileUrl });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}
