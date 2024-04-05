import { useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import styles from "./base.module.css";
import ModalPortal from "@/components/common/ModalPortal/ModalPortal";
import { MouseEvent, MouseEventHandler } from "react";
import clsx from "clsx";

type Props = {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onBackdropClick?: MouseEventHandler<HTMLDivElement>;
  onCloseClick?: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
};

const BaseModal = ({
  title,
  children,
  isOpen,
  onBackdropClick,
  onCloseClick,
}: Props) => {
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {

    if (onBackdropClick) {
      onBackdropClick(e);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalPortal>
      <div className={clsx(styles.container)}>
        <div className={styles.backdrop} onClick={handleBackdropClick} />

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

// export type VariantModal =
//   | "delete-link"
//   | "delete-folder"
//   | "add-link"
//   | "add-folder"
//   | "shared"
//   | "edit";

// export interface BaseModalProps {
//   variant: VariantModal;
//   closeModal: (modalName: string) => void;
// }

// interface Props extends BaseModalProps {
//   title: string;
//   children: ReactNode;
// }

// function BaseModeal({ title, children, variant, closeModal }: Props) {
//   const modalRef = useRef<HTMLDivElement>(null);

//   const handleOutsideClick = (e: MouseEvent) => {
//     if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
//       closeModal(variant);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   });

//   return (
//     <div className={styles.container}>
//       <div className={styles.backdrop}></div>
//       <div ref={modalRef} className={styles.modal}>
//         <div className={styles.content}>
//           <div className={styles.title}>{title}</div>
//           {children}
//           <button
//             type="button"
//             onClick={(e) => {
//               e.stopPropagation();
//               closeModal(variant);
//             }}
//           >
//             <Image
//               src="/images/ic_close.png"
//               width={16}
//               height={16}
//               className={styles.close}
//               alt="닫기 아이콘"
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

export default BaseModal;
