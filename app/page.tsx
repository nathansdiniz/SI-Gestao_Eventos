import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Layout from "./_components/slide-bar";

const Home = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  return (
    <>
      <Layout>
        <h1>Página Inicial</h1>/
      </Layout>
    </>
  );
};

export default Home;
