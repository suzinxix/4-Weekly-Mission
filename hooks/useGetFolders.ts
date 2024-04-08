import useFetch from "hooks/useFetch";
import type { Folder } from "types";

export const useGetFolders = (userId: number) => {
  const { data, loading, error } = useFetch<{ data: Folder[] }>(
    `/users/${userId}/folders`
  );

  const folderData = data?.data ?? [];

  return { data: folderData, loading, error };
};
