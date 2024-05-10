import Link from "next/link";
import styles from "./navbar.module.css";
import Profile from "./Profile/Profile";
import { ROUTE_PATHS } from "constants/route";
import Logo from "@/images/logo.svg";
import useFetch from "hooks/useFetch";

type User = {
  id: number;
  created_at: string;
  name: string;
  image_source: string;
  email: string;
  auth_id: string;
};

function Navbar() {
  const getUser = () => {
    const { data, loading, error } = useFetch<{ data: User[] }>(
      ROUTE_PATHS.user
    );
    const UserData = data?.data ?? [];

    if (error) {
      console.log(error);
    }

    return { data: UserData, loading, error };
  };

  const { data: user, loading, error } = getUser();

  return (
    <nav className={styles.navbar}>
      <div className={styles.wrap}>
        <Link href={ROUTE_PATHS.home}>
          <Logo width="133" height="24" alt="로고" priority />
        </Link>
        {user.length !== 0 ? (
          <Link href={ROUTE_PATHS.home}>
            <Profile email={user[0].email} imgUrl={user[0].image_source} />
          </Link>
        ) : (
          <Link href={ROUTE_PATHS.login}>로그인</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
