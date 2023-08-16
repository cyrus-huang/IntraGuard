import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { recordingId } = useParams();

  const {
    isLoading,
    data: recording,
    error,
  } = useQuery({
    queryKey: ["recording", recordingId], //different from recordings, this is the detailed page specialized for ONE RECORDING ONLY
    queryFn: () => getBooking(recordingId),
  });
  return {
    isLoading,
    recording,
    error,
  };
}
