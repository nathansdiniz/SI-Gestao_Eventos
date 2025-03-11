"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

interface UserData {
  id_empresa: number | null;
  nivelUsuario: number | null;
}
interface redirecionarUsuario {
  id?: string;
  redirecionar: string;
}

type Data11Keys =
  | "financeiroEvento"
  | "financeiroGeral"
  | "menuAdministrativo"
  | "menuConfig"
  | "transacoes"
  | "relatorios"
  | "dashboard"
  | "eventos"
  | "detalhesEvento"
  | "agenda"
  | "fornecedores"
  | "funcionarios"
  | "historicoLogs"
  | "usuarios"
  | "orcamentos"
  | "clientes"
  | "validacaoEvento"
  | "validacaoGeral"
  | "empresas";

const CheckUserDialog = ({ id, redirecionar }: redirecionarUsuario) => {
  const data11: Record<Data11Keys, string> = {
    financeiroEvento: `/eventos/${id}/financeiro`,
    validacaoEvento: `/eventos/${id}/validacao`,
    financeiroGeral: "/administrativo/financeiro",
    validacaoGeral: "/administrativo/validacao",
    menuAdministrativo: "/administrativo",
    menuConfig: "/config",
    transacoes: "/transactions",
    relatorios: "/relatorios",
    dashboard: "/",
    eventos: "/eventos",
    detalhesEvento: `/eventos/${id}`,
    agenda: "/agenda",
    clientes: "/administrativo/clientes",
    fornecedores: "/administrativo/fornecedores",
    funcionarios: "/administrativo/funcionarios",
    historicoLogs: "/config/historicoLogs",
    usuarios: "config/usuarios",
    orcamentos: "/administrativo/orcamentos",
    empresas: "/administrativo/empresas",
  };
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { user, isLoaded } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (isLoaded) {
      const publicMetadata = user?.publicMetadata;
      setUserData({
        id_empresa: Number(publicMetadata?.idEmpresa) || null,
        nivelUsuario: Number(publicMetadata?.nivelUsuario) || null,
      });
    }
  }, [isLoaded, user]);

  useEffect(() => {
    if (userData) {
      console.log("User Data:", userData);

      // Página que o usuário deseja acessar
      const paginaAcessar = data11[redirecionar as Data11Keys];

      // Nível do usuário (define como 99 caso não esteja definido)
      const nivel = userData.nivelUsuario ?? 99;

      // Definição de permissões por nível de usuário
      const permissoes: Record<number, string[]> = {
        11: Object.values(data11), // Admin tem acesso a tudo
        12: Object.values(data11).filter(
          (pagina) => pagina !== "/config/usuarios",
        ), // Direção não acessa usuários
        13: ["/transactions", "/relatorios", "/", "/administrativo/orcamentos"], // Outros acessam apenas essas
      };

      const paginasPermitidas = permissoes[nivel] || [];

      // Se o usuário não tiver empresa vinculada e tentar acessar algo, redireciona para login
      if (!userData.id_empresa && redirecionar) {
        router.push("/login");
      }
      // Se o usuário NÃO tem permissão para a página, envia para acesso-negado
      else if (!paginasPermitidas.includes(paginaAcessar)) {
        router.push("/acesso-negado");
      }
      // Se o usuário já estiver na página correta, não faz nada
      else if (pathname === paginaAcessar) {
        setIsOpen(false);
      }
      // Se não estiver na página correta e tiver permissão, redireciona
      else {
        router.push(paginaAcessar);
      }
    }
  }, [userData, router, pathname]);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="h-56 rounded-none bg-transparent sm:max-w-[225px] lg:max-w-72">
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle className="text-center text-xl font-bold">
            Verificação do usuário
          </DialogTitle>
          <DialogDescription className="flex flex-col items-center justify-center space-y-6 text-center text-base font-medium">
            <div className="h-14 w-32">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="h-full w-full"
              >
                <rect
                  fill="#FFBF1A"
                  stroke="#FFBF1A"
                  strokeWidth="2"
                  width="15"
                  height="15"
                  x="12.5"
                  y="25"
                >
                  <animate
                    attributeName="y"
                    calcMode="spline"
                    dur="2.1"
                    values="25;60;25;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.4"
                  ></animate>
                </rect>
                <rect
                  fill="#FFBF1A"
                  stroke="#FFBF1A"
                  strokeWidth="2"
                  width="15"
                  height="15"
                  x="42.5"
                  y="25"
                >
                  <animate
                    attributeName="y"
                    calcMode="spline"
                    dur="2.1"
                    values="25;60;25;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.2"
                  ></animate>
                </rect>
                <rect
                  fill="#FFBF1A"
                  stroke="#FFBF1A"
                  strokeWidth="2"
                  width="15"
                  height="15"
                  x="72.5"
                  y="25"
                >
                  <animate
                    attributeName="y"
                    calcMode="spline"
                    dur="2.1"
                    values="25;60;25;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="0"
                  ></animate>
                </rect>
              </svg>
            </div>
            Verificando suas credenciais...
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CheckUserDialog;
