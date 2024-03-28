import { useState, ChangeEvent } from "react";
import Image from "next/image";
import style from "./header.module.css";
import FolderModal from "components/Modal/FolderModal/FolderModal";
import useModal from "utils/hooks/useModal";
import { ADD_LINK } from "utils/constants/strings";
import { GetFolderResponse } from "types/apis";

interface Props {
  list: GetFolderResponse[] | null;
}

function Header({ list }: Props) {
  const [value, setValue] = useState("");
  const { modals, openModal, closeModal } = useModal();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={style.container}>
      <form className={style.form}>
        <Image
          src="/images/ic_link.svg"
          width={20}
          height={21}
          className={style.icon}
          alt="링크 아이콘"
        />
        <input
          value={value}
          className={style.input}
          type="text"
          placeholder="링크를 추가해 보세요"
          onChange={handleChange}
        />
        <button
          className={style.button}
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
