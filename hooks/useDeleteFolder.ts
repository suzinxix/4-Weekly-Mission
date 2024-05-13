import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "lib/axios";

import { QUERY_KEYS } from "constants/queryKey";

export const useDeleteFolder = () => {
  const deleteFolder = async (folderId: number) => {
    try {
      await instance.delete(`/folders/${folderId}`);
    } catch (error) {
      throw error;
    }
  };

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFolder,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FOLDERS,
      }),
  });
};
