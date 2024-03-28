import Image from 'next/image'
import styles from "./actionButton.module.css";
import { OpenModal } from "utils/hooks/useModal";

interface Props {
  openModal: OpenModal;
  variant: string;
}

interface Variant {
  [key: string]: {
    icon: string;
    name: string;
    imgUrl: string;
  };
}

function ActionButton({ openModal, variant }: Props) {
  const variantInfo: Variant = {
    shared: { icon: "공유", name: "공유", imgUrl: "/images/ic_share.svg" },
    edit: { icon: "펜", name: "이름변경", imgUrl: "images/ic_pen.svg" },
    "delete-folder": {
      icon: "쓰레기통",
      name: "삭제",
      imgUrl: "/images/ic_trash.svg",
    },
  };

  const { icon, name, imgUrl } = variantInfo[variant];

  return (
    <button className={styles.barButton} onClick={() => openModal(variant)}>
      <Image
      src={imgUrl}
      width={18}
      height={18}
      alt={`${icon} 아이콘`}
      priority
    />
      <span>{name}</span>
    </button>
  );
}

export default ActionButton;
