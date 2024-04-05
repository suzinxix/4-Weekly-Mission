import { useMemo } from "react";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";
import BaseModal from "@/components/common/Modal/BaseModal/BaseModal";
import styles from "./folder.module.css";
import { MODALS } from "constants/modals";
// import { BaseModalProps } from "../BaseModal/BaseModal";
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
};

const FolderModal = ({
  isOpen,
  title,
  buttonText,
  link,
  folderList,
  onCloseClick,
}: Props) => {
  return (
    <BaseModal
      title={title}
      isOpen={isOpen}
      onCloseClick={onCloseClick}
      onBackdropClick={onCloseClick}
    >
      {folderList ? (
        <div className={styles.warpper}>
          <p className={styles.link}>{link}</p>
          <ul className={styles.items}>
            {folderList.map(({ id, name, link }) => (
              <li key={id} className={styles.item}>
                <span className={styles.folder}>{name}</span>{" "}
                <span className={styles.count}>{`${link.count}개 링크`}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <input type="text" className={styles.input} placeholder="내용 입력" />
      )}
      <button type="button" className={styles.btn}>
        {buttonText}
      </button>
    </BaseModal>
  );
};

// interface Props extends BaseModalProps {
//   link?: string;
//   deleted?: string;
//   list?: Folder[] | null;
// }

// function FolderModal({ variant, closeModal, link, list }: Props) {
//   const modalOption = useMemo(() => {
//     if (variant === EDIT) {
//       return {
//         title: "폴더 이름 변경",
//         action: "변경하기",
//       };
//     }

//     if (variant === ADD_FOLDER) {
//       return {
//         title: "폴더 추가",
//         action: "추가하기",
//       };
//     }

//     if (variant === ADD_LINK) {
//       return {
//         title: "폴더에 추가",
//         action: "추가하기",
//       };
//     }

//     return {
//       title: "",
//       action: "",
//     };
//   }, [variant]);

//   return (
//     <BaseModeal
//       title={modalOption.title}
//       variant={variant}
//       closeModal={closeModal}
//     >
//       {list ? (
//         <div className={styles.warpper}>
//           <p className={styles.link}>{link}</p>
//           <ul className={styles.items}>
//             {list.map(({ id, name, link }) => (
//               <li key={id} className={styles.item}>
//                 <span className={styles.folder}>{name}</span>{" "}
//                 <span className={styles.count}>{`${link.count}개 링크`}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <input type="text" className={styles.input} placeholder="내용 입력" />
//       )}

//       <button type="button" className={styles.btn}>
//         {modalOption.action}
//       </button>
//     </BaseModeal>
//   );
// }

export default FolderModal;
