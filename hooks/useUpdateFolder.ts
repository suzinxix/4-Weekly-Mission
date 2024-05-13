import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "lib/axios";

export type Folder = {
  id: number;
  created_at: Date;
  name: string;
  user_id: number;
  favorite: boolean;
};

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { folderId: number; name: string }) => {
      const response = await instance.put<Folder[]>(`/folders/${data.folderId}`, {
        name: data.name,
      });
      return response.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["folders"],
      }),
    onError: (error) => {
      throw error;
    },
  });
};
