import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import Profile from "./Profile/Profile";
import { GetUserResponse } from "types/apis";
import Image from "next/image";
import { fetchGetSampleUsers } from "hooks/useGetSampleData";
import { ID, USER_ID } from "constants/strings";

function Navbar() {
  const [user, setUser] = useState<GetUserResponse>();

  const setLocalStorage = (key: string, val: number) => {
    localStorage.setItem(key, JSON.stringify(val));
  };

  useEffect(() => {
    fetchGetSampleUsers(ID)
      .then((data: GetUserResponse[]) => {
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
          <Image src="images/logo.svg" alt="로고" width="133" height="24" />
        </Link>
        {user ? (
          <Link href="/mypage">
            <Profile email={user.email} imgUrl={user.image_source} />
          </Link>
        ) : (
          <Link href="/login">
            <button type="button">로그인</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
