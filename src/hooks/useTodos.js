import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchTodos = () =>
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.data);

const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};

export default useTodos;
