import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "lib/axios";

import { QUERY_KEYS } from "constants/queryKey";

export const useAddFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => {
      return instance.post("/folders", { name });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FOLDERS,
      }),
  });
};
