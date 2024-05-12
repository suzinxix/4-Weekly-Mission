import React, { ChangeEvent, useState, ReactElement, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./folder.module.css";

import SearchBar from "@/components/common/SearchBar/SearchBar";
import CardList from "@/components/common/CardList/CardList";
import NoResults from "@/components/common/NoResults/NoResults";
import Layout from "@/components/common/Layout/Layout";
import Header from "@/components/folder/Header/Header";
import FolderToolBar from "@/components/folder/FolderToolBar/FolderToolBar";

import { useGetLinks } from "hooks/useGetLinks";
import { useGetFolders } from "hooks/useGetFolders";
import useIntersectionObserver from "hooks/useIntersectionObserver";

import type { LinkItem } from "types";
import type { NextPageWithLayout } from "../_app";

import { ALL } from "constants/etc";

export type Link = {
  id: number;
  favorite: boolean;
  created_at: Date;
  url: string;
  title: string;
  image_source: string;
  description: string;
  [key: string]: number | Date | string | boolean;
};

export type SelectedCategory = {
  id: number | null;
  name: string;
};

const FolderPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({
    id: null,
    name: ALL,
  });

  const { data: folders, isPending, isError } = useGetFolders();

  const { data: folderLinks } = useGetLinks(selectedCategory.id);

  const [searchText, setSearchText] = useState("");

  const searchParam = ["url", "title", "description"];

  const handleSearchItems = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filterSearchText = (items: Link[]) => {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem] &&
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) > -1
        );
      });
    });
  };

  const handleCategoryClick = (id: number | null, name: string) => {
    setSelectedCategory({ id, name });
    router.push(`/folder?folderId=${id}`, undefined, { shallow: true });
  };

  const handleDeletedClick = () => {
    setSearchText("");
  };

  const headerRef = useRef<HTMLDivElement>(null);
  const fooerRef = useRef<HTMLDivElement>(null);
  const isVisibleHeader = useIntersectionObserver(headerRef, {
    threshold: 0.3,
  });
  const isVisibleFooter = useIntersectionObserver(fooerRef, { threshold: 1 });

  if (isPending) {
    return <div>로딩 중 입니다.</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <div>
      <Header folderList={folders} />

      <div ref={headerRef}></div>

      {!isVisibleHeader && !isVisibleFooter && (
        <Header folderList={folders} fixed={true} />
      )}

      <div className={styles.container}>
        <div className={styles.content}>
          <SearchBar
            value={searchText}
            onChange={handleSearchItems}
            onCloseClick={handleDeletedClick}
          />

          {folders ? (
            <div>
              <FolderToolBar
                folders={folders}
                selectedCategory={selectedCategory}
                onCategoryClick={handleCategoryClick}
              />

              {folderLinks && (
                <CardList
                  folderId={selectedCategory.id}
                  items={filterSearchText(folderLinks)}
                  folderList={folders}
                />
              )}
            </div>
          ) : (
            <NoResults />
          )}
        </div>
      </div>
      <div ref={fooerRef}></div>
    </div>
  );
};

FolderPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default FolderPage;
