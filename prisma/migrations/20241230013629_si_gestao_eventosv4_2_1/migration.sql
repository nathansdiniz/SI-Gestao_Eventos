-- AlterTable
CREATE SEQUENCE orcamentos_id_seq;
ALTER TABLE "Orcamentos" ALTER COLUMN "id" SET DEFAULT nextval('orcamentos_id_seq');
ALTER SEQUENCE orcamentos_id_seq OWNED BY "Orcamentos"."id";
