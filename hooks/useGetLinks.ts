import useFetch from "hooks/useFetch";
import type { LinkItem } from "types";

export type GetLinkResponse = LinkItem;

export const useGetLinks = (userId: number, folderId: number | null) => {
  const API = process.env.NEXT_PUBLIC_API;
  return useFetch(
    folderId
      ? `${API}/users/${userId}/links?folderId=${folderId}`
      : `${API}/users/${userId}/links`
  );
};
