import { useState, ChangeEvent } from "react";
import Image from "next/image";
import clsx from "clsx";
import styles from "./header.module.css";
import FolderModal from "@/components/common/Modal/FolderModal/FolderModal";
import type { Folder } from "types";

interface Props {
  folderList: Folder[];
  fixed?: boolean;
}

function Header({ folderList, fixed }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={clsx(styles.container, {
        [styles.fixed]: fixed,
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

        <button type="button" className={styles.button} onClick={openModal}>
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
      </form>
    </div>
  );
}

export default Header;
