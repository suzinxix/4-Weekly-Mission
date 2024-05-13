import { useQuery } from "@tanstack/react-query";
import instance from "lib/axios";

import { QUERY_KEYS } from "constants/queryKey";
import { API_ENDPOINTS } from "constants/endPoint";

export type Folder = {
  id: number;
  created_at: Date;
  favorite: boolean;
  name: string;
  link_count: number;
};

const fetchFolders = async () => {
  try {
    const { data } = await instance.get<Folder[]>(API_ENDPOINTS.FOLDERS);
    return data;
  } catch (error) {
    throw error;
  }
};

export const useGetFolders = () => {
  return useQuery({
    queryKey: QUERY_KEYS.FOLDERS,
    queryFn: fetchFolders,
    staleTime: 1000 * 60,
  });
};
