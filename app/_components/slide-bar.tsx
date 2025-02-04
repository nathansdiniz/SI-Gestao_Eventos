import { SidebarProvider } from "@/app/_components/ui/sidebar";
import { AppSidebar } from "@/app/_components/ui/app-sidebar";
import Navbar from "./ui/navbar";
import { Toaster } from "./ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col">
        <Navbar></Navbar>
        {children}
      </main>
      <Toaster></Toaster>
    </SidebarProvider>
  );
}
