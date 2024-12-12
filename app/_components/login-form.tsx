import Link from "next/link";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import Image from "next/image";

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <Image
          src="/grupo in hub.png"
          alt="logo grupo in hub"
          width={70}
          height={20}
          className="justify-center"
        />
        <CardTitle className="text-center text-2xl">Olá, bem-vindo!</CardTitle>
        <CardDescription>
          Entre com sua conta para poder acessar ao portal SI Gestão de Eventos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Esqueceu sua senha?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Acessar
          </Button>
          <Button variant="outline" className="w-full">
            Login com Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Não tem uma conta?{" "}
          <Link href="#" className="underline">
            Cadastra-se
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
