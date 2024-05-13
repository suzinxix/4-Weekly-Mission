import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "lib/axios";

import { QUERY_KEYS } from "constants/queryKey";
import { API_ENDPOINTS } from "constants/endPoint";

export const useDeleteFolder = () => {
  const deleteFolder = async (folderId: number) => {
    try {
      await instance.delete(API_ENDPOINTS.FOLDER_DETAIL(folderId));
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
