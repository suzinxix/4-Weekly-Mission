import { MouseEventHandler } from "react";
import Image from "next/image";
import styles from "./actionButton.module.css";
import { MODALS } from "constants/modals";

type Modals = MODALS.share | MODALS.edit | MODALS.deleteFolder;

type Props = {
  variant: Modals;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

type Variant = {
  icon: string;
  name: string;
  imgUrl: string;
};

function ActionButton({ onClick, variant }: Props) {
  const variantInfo: Record<Modals, Variant> = {
    share: { icon: "공유", name: "공유", imgUrl: "/images/ic_share.svg" },
    edit: { icon: "펜", name: "이름변경", imgUrl: "images/ic_pen.svg" },
    deleteFolder: {
      icon: "쓰레기통",
      name: "삭제",
      imgUrl: "/images/ic_trash.svg",
    },
  };

  const { icon, name, imgUrl } = variantInfo[variant];

  return (
    <button
      type="button"
      className={styles.barButton}
      onClick={onClick}
    >
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
