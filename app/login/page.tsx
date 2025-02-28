import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }
  return (
    <div className="relative flex h-screen items-center justify-center">
      {/* Fundo com ondas animadas */}
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 800"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#000000", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#FFD700", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>

          {/* Primeira onda */}
          <path
            fill="url(#gradient)"
            d="M0,400 Q200,300 400,400 T800,400 T1200,400 T1600,400 V800 H0 Z"
          >
            <animate
              attributeName="d"
              values="
                M0,400 Q200,300 400,400 T800,400 T1200,400 T1600,400 V800 H0 Z;
                M0,420 Q200,320 400,420 T800,420 T1200,420 T1600,420 V800 H0 Z;
                M0,400 Q200,300 400,400 T800,400 T1200,400 T1600,400 V800 H0 Z"
              dur="6s"
              repeatCount="indefinite"
              keyTimes="0; 0.5; 1"
            />
          </path>

          {/* Área preta entre as ondas */}
          <path
            fill="#000000"
            d="M0,400 Q200,300 400,400 T800,400 T1200,400 T1600,400 V800 H0 Z"
          />

          {/* Segunda onda com animação diferente */}
          <path
            fill="url(#gradient)"
            d="M0,500 Q200,450 400,500 T800,500 T1200,500 T1600,500 V800 H0 Z"
          >
            <animate
              attributeName="d"
              values="
                M0,500 Q200,450 400,500 T800,500 T1200,500 T1600,500 V800 H0 Z;
                M0,520 Q200,470 400,520 T800,520 T1200,520 T1600,520 V800 H0 Z;
                M0,500 Q200,450 400,500 T800,500 T1200,500 T1600,500 V800 H0 Z"
              dur="8s"
              repeatCount="indefinite"
              keyTimes="0; 0.5; 1"
            />
          </path>
        </svg>
      </div>

      {/* Card de Login com fundo preto */}
      <div className="relative z-10 w-[90%] max-w-md rounded-lg bg-black p-8 text-white shadow-lg">
        <Image
          src="/LOGO grupo in hub.png"
          width={173}
          height={39}
          alt="Grupo IN HUB"
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="mb-8 text-muted-foreground">
          O SI Gestão de Eventos é uma solução multiplataforma que facilita a
          interação do usuário com um sistema robusto e administrativo, desde do
          cadastro de cliente e eventos para a geração de relatórios financeiros
          interligados. A solução tecnológica visa aprimorar a experiência do
          usuário com uma aplicação poderosa, intuitiva e acessível a todos.
        </p>
        <SignInButton>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>
    </div>
  );
};

export default LoginPage;
