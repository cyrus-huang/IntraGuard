import { useQuery } from "@tanstack/react-query";
import { getTodayActivity } from "../../services/apiRecordings";

export function useTodayActivity() {
  const { isLoading, data: activity } = useQuery({
    queryFn: getTodayActivity,
    queryKey: ["today-activity"],
  });

  return { isLoading, activity };
}
