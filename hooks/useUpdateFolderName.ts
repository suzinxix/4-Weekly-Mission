import { useMutation } from "@tanstack/react-query";
import instance from "lib/axios";

export type Folder = {
  id: number;
  created_at: Date;
  name: string;
  user_id: number;
  favorite: boolean;
};

const useUpdateFolderName = () => {
  const folderNameMutation = useMutation({
    mutationFn: (data: { folderId: number; name: string }) => {
      return instance.put(`/folders/${data.folderId}`, { name: data.name });
    },
    onError: (error) => {
      throw error;
    },
  });

  const updateFolderName = async (folderId: number, name: string) => {
    folderNameMutation.mutate({ folderId, name });
  };
};
