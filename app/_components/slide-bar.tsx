import { SidebarProvider } from "@/app/_components/ui/sidebar";
import { AppSidebar } from "@/app/_components/ui/app-sidebar";
import Navbar from "./ui/navbar";
import { Toaster } from "./ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-full w-full flex-1 flex-col overflow-auto">
        <Navbar />
        <div className="h-full w-full overflow-y-auto p-4">{children}</div>
      </main>

      <Toaster></Toaster>
    </SidebarProvider>
  );
}
