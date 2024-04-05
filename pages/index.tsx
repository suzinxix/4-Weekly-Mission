import { ReactElement } from "react";
import Link from "next/link";
import Layout from "@/components/common/Layout/Layout";
import type { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  return (
    <div>
      Home 페이지
      <ul>
        <li>
          <Link href="/folder">폴더 페이지 이동</Link>
        </li>
        <li>
          <Link href="/shared">공유 페이지 이동</Link>
        </li>
      </ul>
    </div>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
