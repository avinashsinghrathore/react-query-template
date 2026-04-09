import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// const fetchTodos = () =>
//   axios
//     .get("https://jsonplaceholder.typicode.com/todos")
//     .then((res) => res.data);

const useTodos = (userId) => {
  const params = {};
  if (userId) {
    params.userId = userId;
  }
  const fetchTodos = () =>
    axios
      .get(`https://jsonplaceholder.typicode.com/todos`, { params: params })
      .then((res) => res.data);
  // Users/1/todos - refrence
  return useQuery({
    queryKey: userId ? ["users", userId, "todos"] : ["todos"],
    queryFn: fetchTodos,
  });
};

export default useTodos;
