import { useQuery } from "@tanstack/react-query";
import instance from "lib/axios";

import { QUERY_KEYS } from "constants/queryKey";
import { API_ENDPOINTS } from "constants/endPoint";

type UserResponse = {
  id: number;
  name: string;
  image_source: string;
  email: string;
};

const fetchUser = async () => {
  const {
    data: [user],
  } = await instance.get<UserResponse[]>(API_ENDPOINTS.USERS);
  return user;
};

export const useGetUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USER,
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 60,
  });
};
