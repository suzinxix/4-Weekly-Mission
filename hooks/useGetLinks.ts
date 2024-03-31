import useFetch from "hooks/useFetch";

export const useGetLinks = (userId: number, folderId: number | null) => {
  const API = process.env.NEXT_PUBLIC_API;
  return useFetch(
    folderId
      ? `${API}/users/${userId}/links?folderId=${folderId}`
      : `${API}/users/${userId}/links`
  );
};
