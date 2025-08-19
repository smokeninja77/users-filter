import { useQuery } from "@tanstack/react-query";

const getUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ["usersData"],
    queryFn: getUsers,
    retry: false,
  });
};
