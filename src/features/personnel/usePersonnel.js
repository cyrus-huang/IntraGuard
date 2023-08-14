import { useQuery } from "@tanstack/react-query";
import { getPersonnel } from "../../services/apiPersonnel";

export function usePersonnel() {
  const {
    isLoading,
    data: personnel,
    error,
  } = useQuery({
    queryKey: ["personnel"],
    queryFn: getPersonnel,
  });
  return {
    isLoading,
    personnel,
    error,
  };
}
