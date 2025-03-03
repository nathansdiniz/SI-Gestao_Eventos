"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { SidebarTrigger } from "./sidebar";
import { usePathname, useSearchParams } from "next/navigation";
import SelecionarEmpresa from "@/app/(home)/_components/selecionar-ano";
import { useEffect, useState } from "react";
import { getEmpresas } from "@/app/_actions/criar-atualizarEmpresas";

const Navbar = () => {
  const pathname = usePathname();
  const empresaAtual = useSearchParams().get("src");
  const { user, isLoaded } = useUser();
  let publicMetadata;
  if (isLoaded) {
    publicMetadata = user?.publicMetadata;
    console.log(publicMetadata);
  }

  const [empresas, setEmpresas] = useState<
    {
      id: number;
      empresa: string;
    }[]
  >([]);
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const res = await getEmpresas();
        setEmpresas(res);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
      }
    };

    fetchEmpresas();
  }, []);
  const empresaSelecionada = empresas.find(
    (empresa) => empresa.id === Number(empresaAtual),
  );

  return (
    <nav className="flex flex-col items-center justify-between border-b border-solid px-8 py-2 md:flex-row">
      <div className="flex items-center gap-2 text-xs md:gap-4">
        <SidebarTrigger />
        <Image
          src={`/LOGO ${empresaSelecionada?.empresa || "grupo in hub"}.png`}
          alt="logo grupo in hub"
          width={70}
          height={20}
        />
        <Link
          href="/menu"
          className={
            pathname === "/menu"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Menu
        </Link>
        <Link
          href="/"
          className={
            pathname === "/"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Dashboard
        </Link>
        <Link
          href="/eventos"
          className={
            pathname === "/eventos"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Eventos
        </Link>
        <Link
          href="/relatorios"
          className={
            pathname === "/relatórios"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Relatórios
        </Link>
      </div>

      <div className="mt-4 flex items-center gap-2 md:mt-0 md:gap-4">
        {Number(publicMetadata?.nivelUsuario) === 11 ||
        Number(publicMetadata?.nivelUsuario) === 12 ? (
          <SelecionarEmpresa />
        ) : null}
        <UserButton showName />
      </div>
    </nav>
  );
};

export default Navbar;
