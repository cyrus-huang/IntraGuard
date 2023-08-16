import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "completed",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked out successfully.`);
      //makes data invalidate=>renew data
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("An error occurs when processing checked out"),
  });
  return { checkout, isCheckingOut };
}
