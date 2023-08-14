import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditPersonnel } from "../../services/apiPersonnel";

export function useCreatePerson() {
  const queryClient = useQueryClient();
  const { mutate: createPerson, isLoading: isCreating } = useMutation({
    mutationFn: createEditPersonnel,
    onSuccess: () => {
      toast.success("New personnel created");
      queryClient.invalidateQueries({ queryKey: ["personnel"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createPerson, isCreating };
}
