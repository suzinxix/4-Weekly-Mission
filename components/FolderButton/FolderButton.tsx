import { MouseEvent, ReactNode } from "react";
import styles from "./folderButton.module.css";
import clsx from "clsx";

interface Props {
  isChecked: boolean;
  children: ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

function FolderButton({ children, onClick, isChecked }: Props) {
  return (
    <button
      type="button"
      className={clsx(styles.btn, {
        [styles.checked]: isChecked,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default FolderButton;
