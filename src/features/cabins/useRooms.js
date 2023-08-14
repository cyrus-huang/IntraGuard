import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../services/apiCabins";

export function useRooms() {
  const {
    isLoading,
    data: rooms,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
  return {
    isLoading,
    rooms,
    error,
  };
}
