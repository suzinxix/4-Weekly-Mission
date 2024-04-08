import { MouseEventHandler } from "react";
import Image from "next/image";
import styles from "./actionButton.module.css";
import { MODALS, VARIANTINFO } from "constants/modals";

type Props = {
  variant: MODALS.share | MODALS.edit | MODALS.deleteFolder;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function ActionButton({ onClick, variant }: Props) {
  const { icon, name, imgUrl } = VARIANTINFO[variant];

  return (
    <button type="button" className={styles.barButton} onClick={onClick}>
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
