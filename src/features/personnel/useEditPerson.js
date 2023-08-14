import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditPersonnel } from "../../services/apiPersonnel";

export function useEditPerson() {
  const queryClient = useQueryClient();
  const { mutate: editPerson, isLoading: isEditing } = useMutation({
    mutationFn: ({ newPerson, id }) => createEditPersonnel(newPerson, id),
    onSuccess: () => {
      toast.success("Personnel successfully edited");
      queryClient.invalidateQueries({ queryKey: ["personnel"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editPerson, isEditing };
}
