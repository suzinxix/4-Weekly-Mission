import { ChangeEvent, MouseEvent } from "react";
import Image from "next/image";
import styles from "./searchbar.module.css";

interface Props {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

function SearchBar({ value, onChange, onClick }: Props) {
  return (
    <div className={styles.container}>
      <Image
        src="/images/ic_search.svg"
        width={16}
        height={16}
        className={styles.searchIcon}
        alt="돋보기 아이콘"
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="링크를 검색해 보세요."
        className={styles.input}
      />
      <button type="button" onClick={onClick}>
      <Image
        src="/images/ic_close.png"
        width={16}
        height={16}
        className={styles.closeIcon}
        alt="닫기 아이콘"
      />
      </button>
    </div>
  );
}

export default SearchBar;
