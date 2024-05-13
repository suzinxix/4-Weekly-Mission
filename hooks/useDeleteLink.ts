import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "lib/axios";

import { QUERY_KEYS } from "constants/queryKey";

export const useDeleteLink = (folderId: number) => {
  const deleteLink = async (linkId: number) => {
    try {
      await instance.delete(`/links/${linkId}`);
    } catch (error) {
      throw error;
    }
  };

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLink,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.LINKS(folderId),
      }),
  });
};
