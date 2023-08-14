import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditRoom } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editRoom, isLoading: isEditing } = useMutation({
    mutationFn: ({ newRoomData, id }) => createEditRoom(newRoomData, id),
    onSuccess: () => {
      toast.success("Room successfully edited");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editRoom, isEditing };
}
