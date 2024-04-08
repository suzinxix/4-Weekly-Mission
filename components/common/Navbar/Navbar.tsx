import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import Profile from "./Profile/Profile";
import { fetchGetSampleUsers } from "hooks/useGetSampleData";
import { ROUTE_PATHS } from "constants/route";
import type { User } from "types";
import Logo from "@/images/logo.svg";

const ID = 1;

function Navbar() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchGetSampleUsers(ID)
      .then((data: User[]) => {
        const [userInfo] = data;
        setUser(userInfo);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.wrap}>
        <Link href={ROUTE_PATHS.home}>
          <Logo width="133" height="24" alt="로고" priority />
        </Link>
        {user ? (
          <Link href={ROUTE_PATHS.home}>
            <Profile email={user.email} imgUrl={user.image_source} />
          </Link>
        ) : (
          <Link href={ROUTE_PATHS.login}>로그인</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
