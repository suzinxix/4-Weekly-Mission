import useFetch from "hooks/useFetch";
import type { Folder } from "types";

export const useGetFolders = () => {

  const { data, loading, error } = useFetch<{ data: { folder: Folder[] } }>(
    `/folders`
  );
  const folderData = data?.data?.folder ?? [];

  return { data: folderData, loading, error };
};
