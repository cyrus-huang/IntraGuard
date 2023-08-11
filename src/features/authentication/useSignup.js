import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: sign, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      toast.success("Account successfully created");
    },
  });

  return { sign, isLoading };
}
