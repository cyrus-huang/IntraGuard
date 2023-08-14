import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditRoom } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createRoom, isLoading: isCreating } = useMutation({
    mutationFn: createEditRoom,
    onSuccess: () => {
      toast.success("New room created");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createRoom, isCreating };
}
