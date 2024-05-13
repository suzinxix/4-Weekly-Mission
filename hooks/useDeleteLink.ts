import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "lib/axios";

import { QUERY_KEYS } from "constants/queryKey";
import { API_ENDPOINTS } from "constants/endPoint";

export const useDeleteLink = (folderId: number | null) => {
  const deleteLink = async (linkId: number) => {
    try {
      await instance.delete(API_ENDPOINTS.LINK_DETAIL(linkId));
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
