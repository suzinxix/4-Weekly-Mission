import { useQuery } from "@tanstack/react-query";
import instance from "lib/axios";

import { QUERY_KEYS } from "constants/queryKey";
import { API_ENDPOINTS } from "constants/endPoint";

export type Link = {
  id: number;
  favorite: boolean;
  created_at: Date;
  url: string;
  title: string;
  image_source: string;
  description: string;
};

export const useGetLinks = (folderId: number | null) => {
  const fetchLinks = async () => {
    try {
      const url = folderId
        ? API_ENDPOINTS.FOLDER_LINKS_DETAIL(folderId)
        : API_ENDPOINTS.LINKS;
      const { data } = await instance.get<Link[]>(url);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return useQuery({
    queryKey: QUERY_KEYS.LINKS(folderId),
    queryFn: fetchLinks,
    staleTime: 1000 * 60,
  });
};
