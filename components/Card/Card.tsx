import { useState, MouseEvent } from "react";
import Image from "next/image";
import styles from "./card.module.css";
import DeleteModal from "components/Modal/DeleteModal/DeleteModal";
import FolderModal from "components/Modal/FolderModal/FolderModal";
import { formatDate, getTimeDifference } from "utils/helpers/dateUtils";
import { DELETE_LINK, ADD_LINK } from "utils/constants/strings";
import { GetLinkResponse } from "types/apis";
import { UseModal, Modal, OpenModal, CloseModal } from "utils/hooks/useModal";
import noImage from "public/images/bg_noImage.png";

interface Props extends Partial<UseModal> {
  item: GetLinkResponse;
  onClick: () => void;
}

function Card({ item, onClick, modals, openModal, closeModal }: Props) {
  const { createdAt, created_at, description, imageSource, image_source, url } =
    item;
  const date = createdAt || created_at;
  const imgUrl = imageSource || image_source;
  
  const isFolderPage = modals && openModal && closeModal;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.imgWrapper}>
        {/* <Image
          src={imgUrl}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/bg_noImage.png";
          }}
          fill
          alt="대표 이미지"
          className={styles.image}
          priority
        /> */}
        <img
          src={imgUrl ?? noImage}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = noImage;
          }}
          className={styles.image}
          alt="대표 이미지"
        />
        {isFolderPage && (
          <Image
            src="/images/ic_star.svg"
            width={34}
            height={34}
            alt="별모양 아이콘"
            className={styles.star}
            priority
          />
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.infoTop}>
          <div className={styles.difference}>{getTimeDifference(date)}</div>
          {isFolderPage && (
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
                      e.stopPropagation();
                      openModal(DELETE_LINK);
                    }}
                  >
                    삭제하기
                  </button>
                  {modals[DELETE_LINK] && (
                    <DeleteModal
                      variant={DELETE_LINK}
                      deleted={url}
                      closeModal={closeModal}
                    />
                  )}
                  <button
                    type="button"
                    className={styles.option}
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(ADD_LINK);
                    }}
                  >
                    폴더에 추가
                  </button>
                  {modals[ADD_LINK] && (
                    <FolderModal
                      variant={ADD_LINK}
                      deleted={url}
                      closeModal={closeModal}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.description}>{description}</div>
        <div className={styles.date}>{formatDate(date)}</div>
      </div>
    </div>
  );
}

export default Card;
