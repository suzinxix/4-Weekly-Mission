import { MouseEvent, ReactNode } from "react";
import styles from "./folderButton.module.css";

interface Props {
  isChecked: boolean;
  children: ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

function FolderButton({ children, onClick, isChecked }: Props) {
  return (
    <button
      type="button"
      className={`${styles.btn} ${isChecked ? styles.checked : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default FolderButton;
