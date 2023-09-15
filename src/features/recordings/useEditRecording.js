import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditRecording } from "../../services/apiRecordings";

export function useEditRecording() {
  const queryClient = useQueryClient();
  const { mutate: editRecording, isLoading: isEditing } = useMutation({
    mutationFn: ({ newRecordingComplex, id }) => {
      const {
        created_at,
        start_time,
        end_time,
        status,
        item,
        comments,
        repairing,
        fixed,
        person_id,
        room_id,
      } = newRecordingComplex;
      createEditRecording(
        {
          created_at,
          start_time,
          end_time,
          status,
          item,
          comments,
          repairing,
          fixed,
          person_id,
          room_id,
        },
        id
      );
    },
    onSuccess: () => {
      toast.success("Recording successfully edited");
      queryClient.invalidateQueries({ queryKey: ["recordings"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editRecording, isEditing };
}
