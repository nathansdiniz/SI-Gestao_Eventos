"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowBigLeftDashIcon } from "lucide-react";

interface CardResumidProps {
  redirecionar: string;
}

const BotaoVoltar = ({ redirecionar }: CardResumidProps) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(redirecionar)}
      variant={"outline"}
      className="h-11 w-20"
    >
      <ArrowBigLeftDashIcon size={150} />
    </Button>
  );
};

export default BotaoVoltar;
