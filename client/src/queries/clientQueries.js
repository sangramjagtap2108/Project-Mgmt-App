import { gql } from "@apollo/client";

// gql - for making query
// useQuery - for getting data, errors
const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export { GET_CLIENTS };
