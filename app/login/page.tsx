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
            <linearGradient
              id="goldGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#FFD700", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#DAA520", stopOpacity: 1 }}
              />
            </linearGradient>

            {/* Filtro de onda */}
            <filter
              id="waveFilter"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01 0.01"
                numOctaves="3"
                seed="1"
                result="turbulence"
              >
                <animate
                  attributeName="baseFrequency"
                  values="0.01 0.01; 0.02 0.02; 0.01 0.01"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="turbulence"
                xChannelSelector="R"
                yChannelSelector="G"
                scale="20"
              />
            </filter>
          </defs>

          {/* Fundo preto */}
          <rect width="100%" height="100%" fill="#000000" />

          {/* Primeira onda dourada com filtro e animação de forma */}
          <path
            fill="url(#goldGradient)"
            d="M0,350 C200,300 400,400 600,350 C800,300 1000,400 1200,350 C1400,300 1600,400 1800,350 Z"
            filter="url(#waveFilter)"
          >
            <animate
              attributeName="d"
              values="
                M0,350 C200,300 400,400 600,350 C800,300 1000,400 1200,350 C1400,300 1600,400 1800,350 Z;
                M0,360 C200,310 400,410 600,360 C800,310 1000,410 1200,360 C1400,310 1600,410 1800,360 Z;
                M0,350 C200,300 400,400 600,350 C800,300 1000,400 1200,350 C1400,300 1600,400 1800,350 Z"
              dur="10s"
              repeatCount="indefinite"
              keyTimes="0; 0.5; 1"
            />
          </path>

          {/* Segunda onda dourada com filtro e animação de forma */}
          <path
            fill="url(#goldGradient)"
            d="M0,500 C200,450 400,550 600,500 C800,450 1000,550 1200,500 C1400,450 1600,550 1800,500 Z"
            filter="url(#waveFilter)"
          >
            <animate
              attributeName="d"
              values="
                M0,500 C200,450 400,550 600,500 C800,450 1000,550 1200,500 C1400,450 1600,550 1800,500 Z;
                M0,510 C200,460 400,560 600,510 C800,460 1000,560 1200,510 C1400,460 1600,560 1800,510 Z;
                M0,500 C200,450 400,550 600,500 C800,450 1000,550 1200,500 C1400,450 1600,550 1800,500 Z"
              dur="12s"
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
