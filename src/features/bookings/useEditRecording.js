import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditRecording } from "../../services/apiBookings";

export function useEditRecording() {
  const queryClient = useQueryClient();
  const { mutate: editRecording, isLoading: isEditing } = useMutation({
    mutationFn: ({ newRecording, id }) => createEditRecording(newRecording, id),
    onSuccess: () => {
      toast.success("Recording successfully edited");
      queryClient.invalidateQueries({ queryKey: ["recordings"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editRecording, isEditing };
}
