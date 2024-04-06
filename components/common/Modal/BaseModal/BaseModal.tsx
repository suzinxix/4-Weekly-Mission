import { ReactNode, MouseEvent, MouseEventHandler } from "react";
import Image from "next/image";
import clsx from "clsx";
import styles from "./base.module.css";
import ModalPortal from "@/components/common/ModalPortal/ModalPortal";

type Props = {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onCloseClick?: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
};

const BaseModal = ({ title, children, isOpen, onCloseClick }: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalPortal>
      <div className={clsx(styles.container)}>
        <div className={styles.backdrop} onClick={onCloseClick} />

        <div className={styles.modal}>
          <div className={styles.content}>
            <button onClick={onCloseClick}>
              <Image
                src="/images/ic_close.png"
                width={16}
                height={16}
                className={styles.close}
                alt="닫기 아이콘"
              />
            </button>

            <div className={styles.title}>{title}</div>

            {children}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default BaseModal;
