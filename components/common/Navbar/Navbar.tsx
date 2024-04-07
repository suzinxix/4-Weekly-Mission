import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import Profile from "./Profile/Profile";
import { fetchGetSampleUsers } from "hooks/useGetSampleData";
import { ID, USER_ID } from "constants";
import type { User } from "types";
import Logo from "@/images/logo.svg";

function Navbar() {
  const [user, setUser] = useState<User>();

  const setLocalStorage = (key: string, val: number) => {
    localStorage.setItem(key, JSON.stringify(val));
  };

  useEffect(() => {
    fetchGetSampleUsers(ID)
      .then((data: User[]) => {
        const [userInfo] = data;
        setUser(userInfo);
        setLocalStorage(USER_ID, userInfo.id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.wrap}>
        <Link href="/">
          <Logo width="133" height="24" alt="로고" priority />
        </Link>
        {user ? (
          <Link href="/mypage">
            <Profile email={user.email} imgUrl={user.image_source} />
          </Link>
        ) : (
          <Link href="/login">로그인</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
