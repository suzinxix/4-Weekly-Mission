import { useEffect, useState, ReactElement } from "react";
import style from "./shared.module.css";
import Header from "@/components/shared/Header";
import CardList from "@/components/common/CardList/CardList";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { GetLinkResponse } from "types/apis";
import { fetchGetSampleFolders } from "hooks/useGetSampleData";
import Layout from "@/components/common/Layout/Layout";
import type { NextPageWithLayout } from "../_app";

const SharedPage: NextPageWithLayout = () => {
  const [fileImg, setFileImg] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [items, setItems] = useState<GetLinkResponse[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const data = await fetchGetSampleFolders();
      const { links, name, owner } = data.folder;
      setOwnerName(owner.name);
      setFileImg(owner.profileImageSource);
      setFolderName(name);
      setItems(links);
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div>
      <Header fileImg={fileImg} ownerName={ownerName} folderName={folderName} />
      <div className={style.container}>
        <div className={style.content}>
          <SearchBar />
          <CardList items={items} />
        </div>
      </div>
    </div>
  );
};

SharedPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SharedPage;
