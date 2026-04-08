import React, { useEffect } from "react";
import { useState } from "react";
import useTodos from "../../hooks/useTodos";

const Sellers = () => {
  const { data: todos, error, isLoading } = useTodos();

  return (
    <>
      <h3>seller page</h3>
      {isLoading && <h3>Loading...</h3>}
      {error && <em>{error.message}</em>}
      {todos?.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </>
  );
};

export default Sellers;
