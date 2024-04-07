import { PropsWithChildren } from "react";
import styles from "./SocialAuth.module.css";
import GoogleIcon from "@/images/ic_google_cicle.svg";
import KakaoIcon from "@/images/ic_kakao_cicle.svg";

const SocialAuth = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>{children}</div>
      <div className={styles.icons}>
        <GoogleIcon />
        <KakaoIcon />
      </div>
    </div>
  );
};

export default SocialAuth;
