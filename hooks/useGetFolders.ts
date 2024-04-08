import useFetch from "hooks/useFetch";
import instance from "lib/axios";
import type { Folder } from "types";

export const useGetFolders = (userId: number) => {
  const getFolders = () =>
    instance.get<{ data: Folder[] }>(`/users/${userId}/folders`);

  const { data, loading, error } = useFetch(getFolders);

  const folderData = data?.data ?? [];

  return { data: folderData, loading, error };
};
