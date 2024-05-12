import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "lib/axios";

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
        queryKey: ["links", folderId],
      }),
  });
};
