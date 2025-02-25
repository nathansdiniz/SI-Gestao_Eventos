import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import { db } from "@/app/_lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "uploads");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true,
  });

  form.parse(
    req,
    async (err: any, fields: { financeiroId: any }, files: { file: any }) => {
      if (err) {
        console.error("Erro ao processar o upload:", err);
        return res.status(500).json({ message: "Erro ao processar o upload" });
      }

      const file = files.file;
      const financeiroId = fields.financeiroId;

      if (file && financeiroId) {
        const filePath = path.join(uploadDir, file.newFilename);

        // Salvar o endereço de localização do arquivo no banco de dados
        await db.financeiroME.update({
          where: { id: Number(financeiroId) },
          data: { documentos_anexados: { filePath } },
        });

        res
          .status(200)
          .json({ message: "Upload bem-sucedido", files: [filePath] });
      } else {
        res
          .status(400)
          .json({ message: "Arquivo ou ID financeiro não fornecido" });
      }
    },
  );
};

export default handler;
