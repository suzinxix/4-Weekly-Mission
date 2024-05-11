import axios from "axios";
import type {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosError,
} from "axios";
import useAuthStore from "store/authStore";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

const onRequest = (config: InternalAxiosRequestConfig) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const onError = (error: AxiosError) => {
  // Unauthorized 응답
  if (error.isAxiosError) {
    if (error.response?.status === 404) {
      console.log("존재하지 않는 유저");
    } else {
      console.log("인증 오류");
    }
  }
};

instance.interceptors.request.use(onRequest, onError);

export default instance;
