import React, { useEffect } from "react";
import { useState } from "react";
import useTodos from "../../hooks/useTodos";
import useFetchUsers from "../../hooks/useFetchUsers";

const Users = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalItems = 200;
  const totalPage = Math.ceil(totalItems / pageSize);

  const { data: todos, error, isLoading } = useFetchUsers({ page, pageSize });

  return (
    <>
      <h3>Todos Users page with pagination logics</h3>

      {isLoading && <h3>Loading...</h3>}
      {error && <em>{error.message}</em>}
      {todos?.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}

      // this code inside div will add page number buttons
      <div>
        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => {
              setPage(i + 1);
            }}
            style={{ fontWeight: page === i + 1 ? "bold" : "normal" }}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        disabled={page === 1}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        Previous
      </button>
      <button
        disabled={page === totalPage}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </button>
    </>
  );
};

export default Users;
