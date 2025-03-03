import CheckUserDialog from "../_components/dialog-verificarUsuario";
import Layout from "../_components/slide-bar";
import Layout_Agenda from "./layout-agenda";

const PaginaAgenda = async () => {
  return (
    <Layout>
      <CheckUserDialog redirecionar="agenda"></CheckUserDialog>
      <>
        <Layout_Agenda></Layout_Agenda>
      </>
    </Layout>
  );
};

export default PaginaAgenda;
