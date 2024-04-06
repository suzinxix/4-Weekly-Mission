import { MouseEventHandler } from "react";
import styles from "./delete.module.css";
import BaseModal from "@/components/common/Modal/BaseModal/BaseModal";

type Props = {
  isOpen: boolean;
  title: string;
  deletion: string;
  onCloseClick: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
};

const DeleteModal = ({ isOpen, title, deletion, onCloseClick }: Props) => {
  return (
    <BaseModal
      title={title}
      isOpen={isOpen}
      onCloseClick={onCloseClick}
    >
      <p className={styles.deleted}>{deletion}</p>

      <button type="button" className={styles.deletedBtn}>
        삭제하기
      </button>
    </BaseModal>
  );
};

export default DeleteModal;
