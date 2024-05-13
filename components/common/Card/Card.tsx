import { useState, MouseEvent } from "react";
import Image from "next/image";
import styles from "./card.module.css";

import DeleteModal from "@/components/common/Modal/DeleteModal/DeleteModal";
import FolderModal from "@/components/common/Modal/FolderModal/FolderModal";

import { useDeleteLink } from "hooks/useDeleteLink";

import { formatDate, getTimeDifference } from "utils/date";
import { MODALS } from "constants/modals";
import type { LinkItem, Folder } from "types";
import noImage from "@/images/bg_noImage.png";

type Props = {
  item: LinkItem;
  folderId: number | null;
  folderList: Folder[] | null;
};

export type Link = {
  id: number;
  favorite: boolean;
  created_at: Date;
  url: string;
  title: string;
  image_source: string;
  description: string;
  [key: string]: number | Date | string | boolean;
};

// TODO: Card 컴포넌트 분리
function Card({ item, folderId, folderList }: Props) {
  const { id, created_at: date, url, image_source: imgUrl, description } = item;

  const {
    mutateAsync: deleteLink,
    isPending,
    isError,
    error,
  } = useDeleteLink(folderId);

  const absoluteImageUrl = imgUrl?.startsWith("//")
    ? `https:${imgUrl}`
    : imgUrl;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [image, setImage] = useState<string | null>(absoluteImageUrl);

  const [currentModal, setCurrentModal] = useState<string | null>(null);

  const closeModal = () => {
    setCurrentModal(null);
  };

  const handleDelete = async () => {
    await deleteLink(id);
    closeModal();
  };

  const handleCardClick = (url: string) => {
    window.open(url, "_blank");
  };

  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleOptionClick = (
    e: MouseEvent<HTMLButtonElement>,
    modal: MODALS
  ) => {
    e.stopPropagation();
    setCurrentModal(modal);
  };

  return (
    <>
      <div
        className={styles.container}
        onClick={() => handleCardClick(item.url)}
      >
        <div className={styles.imgWrapper}>
          <Image
            src={image ?? noImage}
            onError={() => {
              setImage("/images/bg_noImage.png");
            }}
            fill
            sizes="340px"
            alt="대표 이미지"
            className={styles.image}
          />
          <Image
            src="/images/ic_star.svg"
            width={34}
            height={34}
            alt="별모양 아이콘"
            className={styles.star}
            priority
          />
        </div>

        <div className={styles.info}>
          <div className={styles.infoTop}>
            <div className={styles.difference}>{getTimeDifference(date)}</div>

            <div className={styles.menu}>
              <button
                type="button"
                onClick={handleMenuClick}
                className={styles.menuBtn}
              >
                <Image
                  src="/images/ic_meatballs.svg"
                  width={21}
                  height={17}
                  alt="메뉴 아이콘"
                  priority
                />
              </button>

              {isMenuOpen && (
                <div className={styles.options}>
                  <button
                    type="button"
                    className={styles.option}
                    onClick={(e) => {
                      handleOptionClick(e, MODALS.deleteLink);
                    }}
                  >
                    삭제하기
                  </button>

                  <button
                    type="button"
                    className={styles.option}
                    onClick={(e) => {
                      handleOptionClick(e, MODALS.addLink);
                    }}
                  >
                    폴더에 추가
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.description}>{description}</div>

          <div className={styles.date}>{formatDate(date)}</div>
        </div>
      </div>

      <DeleteModal
        isOpen={currentModal === MODALS.deleteLink}
        title="폴더 삭제"
        deletion={url}
        onClick={handleDelete}
        onCloseClick={closeModal}
      />

      {/* <FolderModal
        isOpen={currentModal === MODALS.addLink}
        link={url}
        title="폴더에 추가"
        buttonText="추가하기"
        folderList={folderList}
        onCloseClick={closeModal}
      /> */}
    </>
  );
}

export default Card;
