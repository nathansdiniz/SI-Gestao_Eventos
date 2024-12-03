interface Props {
  params: {
    id: string; // Ou 'number', dependendo do tipo esperado para 'id'
  };
}

const Transactions = ({ params: { id } }: Props) => {
  return <h1>Transaction: {id}</h1>;
};

export default Transactions;
