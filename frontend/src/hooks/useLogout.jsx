import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: logout,
    queryKey: ["logout"],
    onSuccess: () => {
      queryClient.setQueryData(["auth"], null);
    },
  });
  return { mutate, isPending, error };
};
