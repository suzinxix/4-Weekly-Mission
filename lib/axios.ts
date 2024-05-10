import axios from "axios";
import type {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosError,
} from "axios";
import { TOKEN } from "constants/auth";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

const onRequest = (config: InternalAxiosRequestConfig) => {
  // 매 요청마다 localStorage의 토큰을 조회해서 헤더에 추가한다.
  if (localStorage.getItem(TOKEN.access)) {
    const accessToken = JSON.parse(localStorage.getItem(TOKEN.access) ?? "");
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  }

  return config;
};

const onError = (error: AxiosError) => {
  // Unauthorized 응답을 받으면 가지고 있던 토큰을 제거한다.
  if (error.isAxiosError && error.response?.status === 401) {
    localStorage.removeItem(TOKEN.access);
    console.log(error.response.status);
  }
};

instance.interceptors.request.use(onRequest, onError);

export default instance;
