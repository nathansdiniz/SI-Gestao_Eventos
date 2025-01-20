import Layout from "@/app/_components/slide-bar";
import {
  BriefcaseBusinessIcon,
  Calendar1Icon,
  CalendarRangeIcon,
  ChartColumnDecreasingIcon,
  FileTextIcon,
  MonitorCogIcon,
} from "lucide-react";
import CardMenu from "../_components/cards-menu";
import Image from "next/image";

const MenuPrincipal = () => {
  return (
    <Layout>
      <div className="relative w-full space-y-6 p-6">
        <div className="flex grid-cols-1 justify-center p-10">
          <Image
            src="/grupo in hub.png"
            alt="logo grupo in hub"
            width={100}
            height={80}
          />
        </div>
        <div className="flex grid-cols-1 justify-center p-2">
          <h1 className="text-3xl font-bold text-amber-200">Menu Principal</h1>
        </div>
        <div className="grid grid-cols-1 gap-6 p-10 md:grid-cols-2 lg:grid-cols-3">
          <CardMenu
            title="Administrativo"
            icon={<BriefcaseBusinessIcon size={84} />}
            descricao="Área administrativa."
            redirecionar="/administrativo"
            size="large"
          />
          <CardMenu
            title="Agenda"
            icon={<Calendar1Icon size={84} />}
            descricao="Agenda de compromissos."
            redirecionar="/agenda"
            size="large"
          />
          <CardMenu
            title="Configurações"
            icon={<MonitorCogIcon size={84} />}
            descricao="Todas as configurações do sistema."
            redirecionar="/config"
            size="large"
          />
          <CardMenu
            title="Dashboards"
            icon={<ChartColumnDecreasingIcon size={84} />}
            descricao="Todos os dashboards."
            redirecionar="/"
            size="large"
          />
          <CardMenu
            title="Eventos"
            icon={<CalendarRangeIcon size={84} />}
            descricao="Todos os Eventos."
            redirecionar="/eventos"
            size="large"
          />
          <CardMenu
            title="Relatórios"
            icon={<FileTextIcon size={84} />}
            descricao="Todos os relatórios."
            redirecionar="/relatorios"
            size="large"
          />
        </div>
      </div>
    </Layout>
  );
};

export default MenuPrincipal;
