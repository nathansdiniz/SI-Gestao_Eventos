/*
  Warnings:

  - The `numero` column on the `Evento` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Evento" ALTER COLUMN "idOrcamento" DROP NOT NULL,
ALTER COLUMN "idCliente" DROP NOT NULL,
ALTER COLUMN "dataEvento" DROP NOT NULL,
ALTER COLUMN "localEvento" DROP NOT NULL,
ALTER COLUMN "nomeEvento" DROP NOT NULL,
ALTER COLUMN "idLocalEvento" DROP NOT NULL,
ALTER COLUMN "endereco" DROP NOT NULL,
DROP COLUMN "numero",
ADD COLUMN     "numero" INTEGER,
ALTER COLUMN "cep" DROP NOT NULL,
ALTER COLUMN "bairro" DROP NOT NULL,
ALTER COLUMN "cidade" DROP NOT NULL,
ALTER COLUMN "estado" DROP NOT NULL,
ALTER COLUMN "datasAdicionais" SET DATA TYPE TEXT;
