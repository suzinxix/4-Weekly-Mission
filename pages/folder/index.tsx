import { ChangeEvent, useState, ReactElement, useRef } from "react";
import styles from "./folder.module.css";

import SearchBar from "@/components/common/SearchBar/SearchBar";
import CardList from "@/components/common/CardList/CardList";
import NoResults from "@/components/common/NoResults/NoResults";
import DeleteModal from "@/components/common/Modal/DeleteModal/DeleteModal";
import SharedModal from "@/components/common/Modal/SharedModal/SharedModal";
import FolderModal from "@/components/common/Modal/FolderModal/FolderModal";
import Layout from "@/components/common/Layout/Layout";

import Header from "@/components/folder/Header/Header";
import ActionButton from "@/components/folder/ActionButton/ActionButton";
import Category from "@/components/folder/Category/Category";

import { useGetLinks } from "hooks/useGetLinks";
import { useGetFolders } from "hooks/useGetFolders";
import useModal from "hooks/useModal";
import useIntersectionObserver from "hooks/useIntersectionObserver";

import type { LinkItem, Folder } from "types";
import type { NextPageWithLayout } from "../_app";

import AddIcon from "@/images/ic_add.svg";
import {
  ALL,
  DELETE_FOLDER,
  ADD_FOLDER,
  SHARED,
  EDIT,
} from "constants/strings";

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

  const { modals, openModal, closeModal } = useModal();

  const { data: folders }: UseFetchResponse<Folder[]> =
    useGetFolders(USERID);

  const { data: folderLinks }: UseFetchResponse<LinkItem[]> =
    useGetLinks(USERID, selectedCategory.id);

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
    setSelectedCategory({ id, name });
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

  return (
    <div>
      <Header list={folders} />

      <div ref={headerRef}></div>

      {!isVisibleHeader && !isVisibleFooter && (
        <Header list={folders} isClassName={true} />
      )}

      <div className={styles.container}>
        <div className={styles.content}>
          <SearchBar
            value={searchText}
            onChange={handleSearchItems}
            onClick={handleDeletedClick}
          />

          {folders ? (
            <div>
              <div className={styles.category}>
                <Category
                  buttonNames={folders}
                  selectedCategory={selectedCategory}
                  onClick={handleCategoryClick}
                />

                <button
                  type="button"
                  className={styles.addButton}
                  onClick={() => openModal(ADD_FOLDER)}
                >
                  <span>폴더 추가</span>
                  <AddIcon className={styles.addIcon} />
                </button>
              </div>

              {modals[ADD_FOLDER] && (
                <FolderModal variant={ADD_FOLDER} closeModal={closeModal} />
              )}

              <div className={styles.bar}>
                <div className={styles.categoryName}>
                  {selectedCategory.name}
                </div>

                <div
                  className={`${styles.barButtons} ${
                    selectedCategory.name === ALL ? styles.hidden : ""
                  }`}
                >
                  <ActionButton openModal={openModal} variant={SHARED} />

                  <ActionButton openModal={openModal} variant={EDIT} />

                  <ActionButton openModal={openModal} variant={DELETE_FOLDER} />
                </div>
              </div>

              {modals[SHARED] && (
                <SharedModal
                  variant={SHARED}
                  closeModal={closeModal}
                  folder={selectedCategory.name}
                />
              )}

              {modals[EDIT] && (
                <FolderModal variant={EDIT} closeModal={closeModal} />
              )}

              {modals[DELETE_FOLDER] && (
                <DeleteModal
                  variant={DELETE_FOLDER}
                  closeModal={closeModal}
                  deleted={selectedCategory.name}
                />
              )}

              {folderLinks && (
                <CardList
                  items={filterSearchText(folderLinks)}
                  modals={modals}
                  openModal={openModal}
                  closeModal={closeModal}
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
