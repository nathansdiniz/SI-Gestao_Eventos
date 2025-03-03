import { AlertTriangle } from "lucide-react";

export default function AcessoNegado() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <AlertTriangle className="h-16 w-16 text-red-500" />
        <h1 className="text-3xl font-bold text-red-500 dark:text-red-400">
          Acesso Negado
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Você não tem permissão para acessar esta página.
        </p>
        <a
          href="/"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Voltar para a página inicial
        </a>
        <div className="mt-4 flex flex-col items-center justify-center space-y-2 text-center text-gray-500 dark:text-gray-400">
          <p>
            Se você acredita que isso é um erro, por favor, entre em contato com
            o administrador do sistema.
          </p>
          <p>
            <span className="font-semibold">Suporte:</span>{" "}
            <a href="mailto:suporte@exemplo.com" className="underline">
              suporte@exemplo.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
