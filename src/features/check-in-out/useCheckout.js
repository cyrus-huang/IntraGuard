import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecording } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: ({ recordingId, confirmFixed }) =>
      updateRecording(recordingId, {
        status: "completed",
        fixed: confirmFixed,
      }),

    onSuccess: (data) => {
      toast.success(`Recording #${data.id} checked out successfully.`);
      //makes data invalidate=>renew data
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => toast.error("An error occurs when processing checked out"),
  });
  return { checkout, isCheckingOut };
}
