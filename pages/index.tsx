import { ReactElement } from "react";
import Layout from "@/components/common/Layout/Layout";
import type { NextPageWithLayout } from "./_app";
import styles from "./Home.module.css";
import Image from "next/image";

const HomePage: NextPageWithLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <h1 className={styles.headerText}>
            <span className={styles.block}>
              <span className={styles.gradient}>세상의 모든 정보</span>를
            </span>
            <span className={styles.span}>쉽게 저장하고 관리해 보세요</span>
          </h1>
          <button className={styles.linkAddBtn}>링크 추가하기</button>
          <Image src="/images/bg.svg" alt="" width={1118} height={659} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.textSection}>
          <h2 className={styles.h2}>
            <span className={styles.block}>원하는 링크를</span>저장하세요
          </h2>
          <p>
            <span className={styles.block}>
              나중에 읽고 싶은 글, 다시 보고 싶은 영상,
            </span>
            <span className={styles.block}>사고 싶은 옷, 기억하고 싶은</span>
            <span className={styles.block}>
              모든 것을 한 공간에 저장하세요.
            </span>
          </p>
        </div>
        <Image src="/images/bg_home.svg" alt="" width={550} height={450} />
      </div>
    </div>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
