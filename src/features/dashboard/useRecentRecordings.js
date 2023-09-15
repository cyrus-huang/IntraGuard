import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getRecordingsAfterDate } from "../../services/apiRecordings";

export function useRecentRecordings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: recordings } = useQuery({
    queryFn: () => getRecordingsAfterDate(queryDate),
    queryKey: ["recordings", `last-${numDays}`],
  });

  return { isLoading, recordings, numDays };
}
