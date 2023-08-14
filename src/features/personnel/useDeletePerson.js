import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deletePersonnel } from "../../services/apiPersonnel";

export function useDeletePerson() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deletePerson } = useMutation({
    mutationFn: deletePersonnel,
    onSuccess: () => {
      toast.success("Delete succeed");
      queryClient.invalidateQueries({
        queryKey: ["personnel"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletePerson };
}
