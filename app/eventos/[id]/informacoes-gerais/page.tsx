import Layout from "@/app/_components/slide-bar";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";

const AreaTextoInfor = dynamic(() => import("./_components/area-texto"), {
  ssr: false,
});

const InformacoesGerais = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <Layout>
        <div>
          <AreaTextoInfor />
        </div>
      </Layout>
    </>
  );
};

export default InformacoesGerais;
