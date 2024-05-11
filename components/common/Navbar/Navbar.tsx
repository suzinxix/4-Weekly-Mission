import Link from "next/link";
import styles from "./navbar.module.css";
import Profile from "./Profile/Profile";
import { ROUTE_PATHS } from "constants/route";
import Logo from "@/images/logo.svg";
import useGetUser from "hooks/useGetUser";

const Navbar = () => {
  const { data, isError, isPending } = useGetUser();

  if (isPending) {
    return <></>;
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.wrap}>
        <Link href={ROUTE_PATHS.home}>
          <Logo width="133" height="24" alt="로고" priority />
        </Link>
        {isError ? (
          <Link href={ROUTE_PATHS.login}>로그인</Link>
        ) : (
          <Link href={ROUTE_PATHS.home}>
            <Profile email={data.email} imgUrl={data.image_source} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
