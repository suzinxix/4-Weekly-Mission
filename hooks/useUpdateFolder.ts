import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "lib/axios";

import { QUERY_KEYS } from "constants/queryKey";
import { API_ENDPOINTS } from "constants/endPoint";

import type { Folder } from "types";

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { folderId: number; name: string }) => {
      const response = await instance.put<Omit<Folder[], "link_count">>(
        API_ENDPOINTS.FOLDER_DETAIL(data.folderId),
        {
          name: data.name,
        }
      );
      return response.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FOLDERS,
      }),
    onError: (error) => {
      throw error;
    },
  });
};
