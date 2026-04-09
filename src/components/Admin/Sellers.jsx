import React, { useEffect } from "react";
import { useState } from "react";
import useTodos from "../../hooks/useTodos";

const Sellers = () => {
  const [userId, setUserId] = useState(null);
  // console.log(userId);

  const { data: todos, error, isLoading } = useTodos(userId);

  return (
    <>
      <h3>seller page</h3>
      <h3>Todos Users</h3>
      <select
        onChange={(e) => {
          setUserId(parseInt(e.target.value));
        }}
      >
        <option value="">select</option>
        <option value="1">User1</option>
        <option value="2">User2</option>
        <option value="3">User3</option>
        <option value="4">User4</option>
      </select>
      {isLoading && <h3>Loading...</h3>}
      {error && <em>{error.message}</em>}
      {todos?.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </>
  );
};

export default Sellers;
