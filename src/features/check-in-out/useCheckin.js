import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecording } from "../../services/apiRecordings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ recordingId }) =>
      updateRecording(recordingId, {
        status: "in-progress",
      }),

    onSuccess: (data) => {
      toast.success(`Recording #${data.id} checked in successfully.`);
      //makes data invalidate=>renew data
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => toast.error("An error occurs when processing checked in"),
  });
  return { checkin, isCheckingIn };
}
