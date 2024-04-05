import { useState, ChangeEvent } from "react";
import Image from "next/image";
import styles from "./header.module.css";
import FolderModal from "@/components/common/Modal/FolderModal/FolderModal";
import useModal from "hooks/useModal";
import { MODALS } from "constants/modals";
import clsx from "clsx";
import type { Folder } from "types";

interface Props {
  folderList: Folder[] | null;
  isClassName?: boolean;
}

function Header({ folderList, isClassName }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("");
  // const { modals, openModal, closeModal } = useModal();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={clsx(styles.container, {
        [styles.fixed]: isClassName,
      })}
    >
      <form className={styles.form}>
        <Image
          src="/images/ic_link.svg"
          width={20}
          height={21}
          className={styles.icon}
          alt="링크 아이콘"
        />
        <input
          value={value}
          className={styles.input}
          type="text"
          placeholder="링크를 추가해 보세요"
          onChange={handleChange}
        />
        <button
          type="button"
          className={styles.button}
          onClick={openModal}
        >
          추가하기
        </button>
        <FolderModal
          isOpen={isModalOpen}
          link={value}
          title="폴더에 추가하기"
          buttonText="추가하기"
          folderList={folderList}
          onCloseClick={closeModal}
        />
        {/* {modals[ADD_LINK] && (
          <FolderModal
            variant={ADD_LINK}
            closeModal={closeModal}
            link={value}
            list={folderList}
          />
        )} */}
      </form>
    </div>
  );
}

export default Header;
