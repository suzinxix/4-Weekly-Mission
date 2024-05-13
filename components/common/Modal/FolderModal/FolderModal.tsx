import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import styles from "./folder.module.css";
import BaseModal from "@/components/common/Modal/BaseModal/BaseModal";
import type { Folder } from "types";

type Props = {
  isOpen: boolean;
  title: string;
  buttonText: string;
  link?: string;
  folderList?: Folder[] | null;
  onCloseClick: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick: (name: string) => void;
};

const FolderModal = ({
  isOpen,
  title,
  buttonText,
  link,
  folderList,
  onCloseClick,
  onClick,
}: Props) => {
  const [value, setValue] = useState("");

  const handleButtonClick = () => {
    onClick(value);
    setValue("");
  };

  return (
    <BaseModal isOpen={isOpen} title={title} onCloseClick={onCloseClick}>
      {folderList ? (
        <div className={styles.warpper}>
          <p className={styles.link}>{link}</p>
          <ul className={styles.items}>
            {folderList.map(({ id, name }) => (
              <li key={id} className={styles.item}>
                <span className={styles.folder}>{name}</span>{" "}
                {/* <span className={styles.count}>{`${link.count}개 링크`}</span> */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={styles.input}
          placeholder="내용 입력"
        />
      )}
      <button type="button" className={styles.btn} onClick={handleButtonClick}>
        {buttonText}
      </button>
    </BaseModal>
  );
};

export default FolderModal;
