import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOnboarding } from "../lib/api";
import toast from "react-hot-toast";

export const useOnboarding = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    queryKey: ["completeOnboarding"],
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return { mutate, isPending, error };
};
