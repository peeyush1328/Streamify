import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/api";

export const useAuth = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["auth"],
    queryFn: getUser,
    retry: false,
  });
  return { authUser: data?.user, isLoading, error };
};
