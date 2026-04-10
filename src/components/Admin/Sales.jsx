import React, { useState } from "react";
import axios from "axios";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import useUsers from "../../hooks/useUsers";

const Sales = () => {
  const { data: users, error, isLoading } = useUsers();
  const [name, setName] = useState("");
  const QueryClient = useQueryClient();

  // how useMutation hooks works
  // Post method with - useMutation
  const addUserMutation = useMutation({
    mutationFn: (newUser) =>
      axios
        .post("https://jsonplaceholder.typicode.com/users", newUser)
        .then((res) => res.data),
    onSuccess: (saveduser) => {
      console.log(saveduser);
      //1st cache invalid
      // QueryClient.invalidateQueris({
      //   queryKey: ["users"],
      // });
      // 2nd update cache data
      QueryClient.setQueryData(["users"], (user) => [saveduser, ...user]);
    },
  });

  // post method - useMutation
  const addUser = () => {
    const newUser = { name, id: users.length + 1 };
    addUserMutation.mutate(newUser);
  };

  // delete method - ueMutation
  const deleteUserMutation = useMutation({
    mutationFn: (id) => {
      axios
        .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.data);
    },
  });

  // Delete method
  const deleteUser = (id) => {
    deleteUserMutation.mutate(id, {
      onSuccess: () => {
        QueryClient.setQueriesData(["users"], (users) =>
          users.filter((u) => u.id != id),
        );
      },
    });
  };

  // Patch method
  const updateUser = (user) => {
    console.log(user);
    const updatedUser = {
      ...user,
      name: user.name + "updated",
    };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    axios
      .patch(
        "https://jsonplaceholder.typicode.com/users/${user.id}",
        updatedUser,
      )
      .catch((err) => {
        setErrors(err.message);
        setUsers(users);
      });
  };

  return (
    <>
      <h3>Admin Sales Page</h3>
      {isLoading && <h3>Loading...</h3>}
      {error && <em>{error.message}</em>}
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={addUser}>Add Users</button>

      <ol>
        <table>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>
                  <li key={user.id}>{user.name}</li>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      updateUser(user);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ol>
    </>
  );
};

export default Sales;
