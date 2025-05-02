import { useQuery, gql } from '@apollo/client';

const HELLO_QUERY = gql`
  query Hello {
    hello
  }
`;

interface HelloData {
  hello: string;
}

export const HelloMessage = () => {
  const { loading, error, data } = useQuery<HelloData>(HELLO_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <p>{data?.hello}</p>;
};
