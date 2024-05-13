import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "lib/axios";

export const useAddFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => {
      return instance.post("/folders", { name });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["folders"],
      }),
  });
};
