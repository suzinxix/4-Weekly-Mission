import { useQuery } from "@tanstack/react-query";
import instance from "lib/axios";
import useAuthStore from "store/authStore";
import { ROUTE_PATHS } from "constants/route";

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

const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
};

export default useGetUser;
