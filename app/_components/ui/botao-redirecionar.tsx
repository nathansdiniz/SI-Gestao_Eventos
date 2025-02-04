"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "./button";

interface RedirecionarProps {
  redirecionar: string;
  icone: ReactNode;
  titulo: string;
}
const BotaoRedirecionar = ({
  redirecionar,
  icone,
  titulo,
}: RedirecionarProps) => {
  const router = useRouter();

  return (
    <>
      <Button onClick={() => router.push(redirecionar)} variant={"link"}>
        {titulo}
        {icone}
      </Button>
    </>
  );
};

export default BotaoRedirecionar;
