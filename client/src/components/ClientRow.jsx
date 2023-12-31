import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // On deleting client, client is getting deleted on backend but to show it on UI we need to refresh the
    // browser. To solve the issue
    // 1.Refetch the clients
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    // On deleting client, all the projects associated with that client are also getting deleted.
    // Hence fetching projects again

    // 2. Update cache
    // deleteClient will contain deleted client
    // clients contains all the clients from cache(including the deleted element)
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        {/* Apollo is state manager that is why we can use any query/mutation at any level */}
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
