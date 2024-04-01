import useFetch from "hooks/useFetch";
import type { Folder } from "types";

export type GetFolderResponse = Folder;

export const useGetFolders = (userId: number) => {
  return useFetch(`${process.env.NEXT_PUBLIC_API}/users/${userId}/folders`);
};
