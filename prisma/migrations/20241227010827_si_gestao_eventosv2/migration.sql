/*
  Warnings:

  - The primary key for the `Empresas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `int` on the `Empresas` table. All the data in the column will be lost.
  - The primary key for the `EntradasAgenda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `int` on the `EntradasAgenda` table. All the data in the column will be lost.
  - The primary key for the `EntradasEventos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `int` on the `EntradasEventos` table. All the data in the column will be lost.
  - The primary key for the `UserType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `int` on the `UserType` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Empresas" DROP CONSTRAINT "Empresas_pkey",
DROP COLUMN "int",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Empresas_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EntradasAgenda" DROP CONSTRAINT "EntradasAgenda_pkey",
DROP COLUMN "int",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "EntradasAgenda_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EntradasEventos" DROP CONSTRAINT "EntradasEventos_pkey",
DROP COLUMN "int",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "EntradasEventos_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserType" DROP CONSTRAINT "UserType_pkey",
DROP COLUMN "int",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserType_pkey" PRIMARY KEY ("id");
