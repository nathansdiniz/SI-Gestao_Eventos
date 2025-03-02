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
import { useRouter } from "next/navigation";

interface UserData {
  id_empresa: number | null;
  nivelUsuario: number | null;
}

const CheckUserDialog = () => {
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
      if (!userData.id_empresa) {
        router.push("/login");
      } else {
        router.push("/");
        setIsOpen(false);
      }
    }
  }, [userData, router]);

  if (!isLoaded) {
    return null; // Render nothing while loading
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verificação do usuário</DialogTitle>
          <DialogDescription>
            Estamos verificando suas credenciais...
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CheckUserDialog;
