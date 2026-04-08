import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = () =>
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.data);

const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

export default useUsers;
