import { useQuery } from "@tanstack/react-query";
import instance from "lib/axios";

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
      const url = folderId ? `/folders/${folderId}/links` : "/links";
      const { data } = await instance.get<Link[]>(url);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return useQuery({
    queryKey: ["links", folderId],
    queryFn: fetchLinks,
    staleTime: 1000 * 60,
  });
};
