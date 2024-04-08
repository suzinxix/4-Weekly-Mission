import React, {
  ChangeEvent,
  useState,
  ReactElement,
  useRef,
  useEffect,
} from "react";
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

import type { LinkItem, Folder } from "types";
import type { NextPageWithLayout } from "../_app";

import { ALL } from "constants/etc";

const USERID = 11;

export type SelectedCategory = {
  id: number | null;
  name: string;
};

interface UseFetchResponse<T> {
  data: T | null;
  loading?: boolean;
  error?: Error | null;
}

const FolderPage: NextPageWithLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({
    id: null,
    name: ALL,
  });

  const { data: folders } = useGetFolders(USERID);

  const { data: folderLinks } = useGetLinks(USERID, selectedCategory.id);


  const [searchText, setSearchText] = useState("");

  const searchParam = ["url", "title", "description"];

  const handleSearchItems = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filterSearchText = (items: LinkItem[]) => {
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
    setSelectedCategory({ ...selectedCategory, id, name });
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

  useEffect(() => {
   
  }, [selectedCategory.id]);

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
