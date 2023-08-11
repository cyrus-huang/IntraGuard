import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAuth } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAuth({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user); // manually set user data into react query cache to load page quicker
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error("Email or password provided are incorrect");
    },
  });

  return { login, isLoading };
}
