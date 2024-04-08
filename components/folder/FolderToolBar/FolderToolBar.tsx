import { useState } from "react";
import styles from "./FolderToolBar.module.css";

import Category from "@/components/folder/Category/Category";
import ActionButton from "@/components/folder/ActionButton/ActionButton";
import FolderModal from "@/components/common/Modal/FolderModal/FolderModal";
import DeleteModal from "@/components/common/Modal/DeleteModal/DeleteModal";
import ShareModal from "@/components/common/Modal/ShareModal/ShareModal";

import { ALL } from "constants/etc";
import { MODALS } from "constants/modals";
import AddIcon from "@/images/ic_add.svg";

import type { Folder } from "types";
import type { SelectedCategory } from "pages/folder";

type Props = {
  folders: Folder[];
  selectedCategory: SelectedCategory;
  onCategoryClick: (id: number | null, name: string) => void;
};

const FolderToolBar = ({
  folders,
  selectedCategory,
  onCategoryClick,
}: Props) => {
  const [currentModal, setCurrentModal] = useState<string | null>(null);

  const closeModal = () => {
    setCurrentModal(null);
  };

  return (
    <>
      <div className={styles.category}>
        <Category
          buttonNames={folders}
          selectedCategory={selectedCategory}
          onClick={onCategoryClick}
        />

        <button
          type="button"
          className={styles.addButton}
          onClick={() => setCurrentModal(MODALS.addFolder)}
        >
          <span>폴더 추가</span>
          <AddIcon className={styles.addIcon} />
        </button>
      </div>

      <FolderModal
        isOpen={currentModal === MODALS.addFolder}
        title="폴더 추가"
        buttonText="추가하기"
        onCloseClick={closeModal}
      />

      <div className={styles.bar}>
        <div className={styles.categoryName}>{selectedCategory.name}</div>
        <div
          className={`${styles.barButtons} ${
            selectedCategory.name === ALL ? styles.hidden : ""
          }`}
        >
          <ActionButton
            onClick={() => setCurrentModal(MODALS.share)}
            variant={MODALS.share}
          />

          <ActionButton
            onClick={() => setCurrentModal(MODALS.edit)}
            variant={MODALS.edit}
          />

          <ActionButton
            onClick={() => setCurrentModal(MODALS.deleteFolder)}
            variant={MODALS.deleteFolder}
          />
        </div>
      </div>

      <ShareModal
        isOpen={currentModal === MODALS.share}
        title="폴더 공유"
        folderName={selectedCategory.name}
        onCloseClick={closeModal}
      />

      <FolderModal
        isOpen={currentModal === MODALS.edit}
        title="폴더 이름 변경"
        buttonText="변경하기"
        onCloseClick={closeModal}
      />

      <DeleteModal
        isOpen={currentModal === MODALS.deleteFolder}
        title="폴더 삭제"
        deletion={selectedCategory.name}
        onCloseClick={closeModal}
      />
    </>
  );
};

export default FolderToolBar;
