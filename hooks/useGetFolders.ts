import { useQuery } from "@tanstack/react-query";
import instance from "lib/axios";

export type Folder = {
  id: number;
  created_at: Date;
  favorite: boolean;
  name: string;
  link_count: number;
};

const fetchFolders = async () => {
  try {
    const { data } = await instance.get<Folder[]>("/folders");
    return data;
  } catch (error) {
    throw error;
  }
};

export const useGetFolders = () => {
  return useQuery({
    queryKey: ["folders"],
    queryFn: fetchFolders,
  });
};
