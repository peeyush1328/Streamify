import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/api";

export const useAuth = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: getUser,
    retry: false,
  });
  return { authUser: data?.user, isLoading };
};


