import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useUsers from "../../hooks/useUsers";

const Sales = () => {
  const { data: users, error, isLoading } = useUsers();

  const [name, setName] = useState("");

  // post method
  const addUser = () => {
    const newUser = { name, id: users.length + 1 };
    // console.log(newUser);
    setUsers([newUser, ...users]);
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then((res) => {
        // console.log(res);
        setUsers([res.data, ...users]);
      })
      .catch((err) => {
        setErrors(err.message);
        setUsers(users);
      });
  };

  // Delete method
  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    axios
      .delete("https://jsonplaceholder.typicode.com/users/${id}")
      .catch((err) => {
        setErrors(err.message);
        setUsers(users);
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
