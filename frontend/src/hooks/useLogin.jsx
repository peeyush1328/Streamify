import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    queryKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries(["auth"]);
    },
  });
  return { mutate, isPending, error };
};
