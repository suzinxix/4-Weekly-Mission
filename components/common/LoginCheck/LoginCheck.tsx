import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

import { ROUTE_PATHS } from "constants/route";

import useAuthStore from "store/authStore";

const LoginCheck = ({ children }: PropsWithChildren) => {
  const accessToken = useAuthStore.getState().accessToken;

  const router = useRouter();

  useEffect(() => {
    if (accessToken) {
      router.push(ROUTE_PATHS.folder);
    } else {
      return;
    }
  }, []);

  return <div>{children}</div>;
};

export default LoginCheck;
