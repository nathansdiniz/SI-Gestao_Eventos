import {
  Calendar,
  Home,
  Settings,
  BadgeDollarSign,
  CalendarCheck,
  FileText,
  Users,
  Building2,
  Landmark,
  SquareMenuIcon,
} from "lucide-react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Início",
    url: "/",
    icon: Home,
  },
  {
    title: "Menu Principal",
    url: "/menu",
    icon: SquareMenuIcon,
  },

  {
    title: "Agenda",
    url: "/agenda",
    icon: Calendar,
  },
  {
    title: "Empresas",
    url: "/administrativo/empresas",
    icon: Building2,
  },
  {
    title: "Eventos",
    url: "/eventos",
    icon: CalendarCheck,
  },
  {
    title: "Financeiro",
    url: "/administrativo/financeiro",
    icon: Landmark,
  },
  {
    title: "Funcionarios",
    url: "/administrativo/funcionarios",
    icon: Users,
  },
  {
    title: "Relatórios",
    url: "#",
    icon: FileText,
  },
  {
    title: "Transações",
    url: "/transactions",
    icon: BadgeDollarSign,
  },
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Image
          src="/grupo in hub.png"
          alt="logo grupo in hub"
          width={70}
          height={20}
        />
        <a href="" className="font-sans text-amber-200">
          Sistema Integrado de Eventos
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Acesso Rápido</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
