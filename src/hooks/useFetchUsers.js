import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useFetchUsers = (query) => {
  const fetchTodos = () =>
    axios
      .get(`https://jsonplaceholder.typicode.com/todos`, {
        params: {
          _limit: query.pageSize,
          _start: (query.page - 1) * query.pageSize,
        },
      })
      .then((res) => res.data);
  // Users/1/todos - refrence
  return useQuery({
    queryKey: ["todos", query],
    queryFn: fetchTodos,
    gcTime: 900000,
    retry: 5,
  });
};

export default useFetchUsers;
