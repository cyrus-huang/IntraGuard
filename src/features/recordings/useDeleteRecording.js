import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteRecording as deleteRecordingApi } from "../../services/apiRecordings";

export function useDeleteRecording() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteRecording } = useMutation({
    mutationFn: deleteRecordingApi,
    onSuccess: () => {
      toast.success("Delete succeed");
      queryClient.invalidateQueries({
        queryKey: ["recordings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteRecording };
}
