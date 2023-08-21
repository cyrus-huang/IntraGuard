import { useQuery } from "@tanstack/react-query";
import { getRecording } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useRecording() {
  const { recordingId } = useParams();

  const {
    isLoading,
    data: recording,
    error,
  } = useQuery({
    queryKey: ["recording", recordingId], //different from recordings, this is the detailed page specialized for ONE RECORDING ONLY
    queryFn: () => getRecording(recordingId),
  });
  return {
    isLoading,
    recording,
    error,
  };
}
