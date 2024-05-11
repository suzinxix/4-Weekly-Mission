import { useMutation } from "@tanstack/react-query";
import instance from "lib/axios";
import useAuthStore from "store/authStore";
import Cookies from "js-cookie";

interface User {
  email: string;
  password: string;
}

const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const mutation = useMutation({
    mutationFn: (data: User) => {
      return instance.post("/auth/sign-in", data);
    },
    onSuccess: (res) => {
      // 토큰 저장
      const { accessToken, refreshToken } = res.data;
      setAccessToken(accessToken);
      Cookies.set("refreshToken", refreshToken, { expires: 7 });
    },
    onError: (error) => {
      throw error;
    },
  });

  const login = async (data: User) => {
    mutation.mutate(data);
  };

  return {
    login,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};

export default useLogin;
