import { useState, ChangeEvent } from "react";
import Image from "next/image";
import styles from "./header.module.css";
import FolderModal from "@/components/common/Modal/FolderModal/FolderModal";
import useModal from "hooks/useModal";
import { ADD_LINK } from "constants/strings";
import { GetFolderResponse } from "types/apis";
import clsx from "clsx";

interface Props {
  list: GetFolderResponse[] | null;
  isClassName?: boolean;
}

function Header({ list, isClassName }: Props) {
  const [value, setValue] = useState("");
  const { modals, openModal, closeModal } = useModal();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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
          onClick={(e) => {
            e.preventDefault();
            openModal(ADD_LINK);
          }}
        >
          추가하기
        </button>
        {modals[ADD_LINK] && (
          <FolderModal
            variant={ADD_LINK}
            closeModal={closeModal}
            link={value}
            list={list}
          />
        )}
      </form>
    </div>
  );
}

export default Header;
