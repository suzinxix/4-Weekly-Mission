import useFetch from "hooks/useFetch";
import type { LinkItem } from "types";

export const useGetLinks = (userId: number, folderId: number | null) => {
  const query = folderId ? `?folderId=${folderId}` : "";

  const { data, loading, error } = useFetch<{ data: LinkItem[] }>(
    `users/${userId}/links${query}`
  );

  const linkData = data?.data ?? [];

  return { data: linkData, loading, error };
};
