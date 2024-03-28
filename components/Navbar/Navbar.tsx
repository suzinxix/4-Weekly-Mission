import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import Profile from "./Profile/Profile";
import { GetUserResponse } from "types/apis";
import Image from "next/image";
import { fetchGetSampleUsers } from "utils/hooks/useGetSampleData";

function Navbar() {
  const [user, setUser] = useState<GetUserResponse>();

  const setLocalStorage = (key: string, val: number): void =>
    localStorage.setItem(key, JSON.stringify(val));

  useEffect(() => {
    fetchGetSampleUsers(1)
      .then((data: GetUserResponse[]) => {
        const [userInfo] = data;
        setUser(userInfo);
        setLocalStorage("userId", userInfo.id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.wrap}>
        <Link href="/">
          <Image src="images/logo.svg" alt="로고" width="133" height="24"/>
        </Link>
        {user ? (
          <Link href="/mypage">
            <Profile email={user.email} imgUrl={user.image_source} />
          </Link>
        ) : (
          <Link href="/login">
            <button>로그인</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
