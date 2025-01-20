"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/card";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface CardResumidProps {
  icon: ReactNode;
  title: string;
  descricao: string;
  redirecionar: string;
  size?: "small" | "large";
}

const CardMenu = ({
  icon,
  title,
  descricao,
  redirecionar,
  size = "small",
}: CardResumidProps) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(redirecionar)}
      className={`flex cursor-pointer flex-col justify-between transition-shadow hover:shadow-lg ${
        size === "large" ? "h-96 w-96 p-8" : "h-64 w-64 p-4"
      }`}
    >
      <CardHeader>
        <p className={`text-center text-2xl font-semibold text-white`}>
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {icon}
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="text-center">{descricao}</p>
      </CardFooter>
    </Card>
  );
};

export default CardMenu;
