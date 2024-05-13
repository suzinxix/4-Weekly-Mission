import { useQuery } from "@tanstack/react-query";
import instance from "lib/axios";

interface UserResponse {
  id: number;
  name: string;
  image_source: string;
  email: string;
}

const fetchUser = async (): Promise<UserResponse> => {
  const {
    data: [user],
  } = await instance.get("/users");
  return user;
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 60,
  });
};
