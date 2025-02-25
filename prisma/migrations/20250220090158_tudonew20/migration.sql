-- CreateTable
CREATE TABLE "EventosInforGerais" (
    "id" SERIAL NOT NULL,
    "id_eventos" INTEGER,
    "id_empresa" INTEGER,
    "documento" TEXT,
    "userID" TEXT,

    CONSTRAINT "EventosInforGerais_pkey" PRIMARY KEY ("id")
);
