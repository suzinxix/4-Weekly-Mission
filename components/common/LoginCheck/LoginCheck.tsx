import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { TOKEN } from "constants/auth";
import { ROUTE_PATHS } from "constants/route";

const LoginCheck = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem(TOKEN.access);
    if (accessToken) {
      router.push(ROUTE_PATHS.folder);
    } else {
      return;
    }
  }, []);
  
  return <div>{children}</div>;
};

export default LoginCheck;
