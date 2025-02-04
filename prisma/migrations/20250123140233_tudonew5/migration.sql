/*
  Warnings:

  - You are about to drop the column `User_id` on the `Funcionarios` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `HistoricoLogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClienteContato" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "Clientes" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "Customers" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "Empresas" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "EntradasAgenda" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "EntradasEventos" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "Estoque" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "Evento" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "Eventosme" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "EventsType" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "FinanceiroME" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "Funcionarios" DROP COLUMN "User_id",
ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "HistoricoLogs" DROP COLUMN "UserId",
ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "Leads" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "MetasProducaoConfig" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "ModelosRelatorios" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "Orcamentos" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "PagtoConfig" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "Producao" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "Produtos" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "PropostaSituacao" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "Saidas" ADD COLUMN     "userID" TEXT;

-- AlterTable
ALTER TABLE "TiposAgenda" ADD COLUMN     "userID" TEXT;
