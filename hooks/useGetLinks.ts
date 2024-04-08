import useFetch from "hooks/useFetch";
import instance from "lib/axios";
import type { LinkItem } from "types";

export const useGetLinks = (userId: number, folderId: number | null) => {
  const query = folderId ? `?folderId=${folderId}` : "";

  const getLinks = () =>
    instance.get<{ data: LinkItem[] }>(`users/${userId}/links${query}`);

  const { data, loading, error } = useFetch(getLinks);

  const linkData = data?.data ?? [];

  return { data: linkData, loading, error };
};

// export const useGetLinks = (userId: number, folderId: number | null) => {
//   const API = process.env.NEXT_PUBLIC_API;
//   return useFetch(
//     folderId
//       ? `${API}/users/${userId}/links?folderId=${folderId}`
//       : `${API}/users/${userId}/links`
//   );
// };
