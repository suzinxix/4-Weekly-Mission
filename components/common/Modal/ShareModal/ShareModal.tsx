import { useEffect, MouseEventHandler } from "react";
import Image from "next/image";
import styles from "./share.module.css";
import BaseModal from "@/components/common/Modal/BaseModal/BaseModal";

type Props = {
  isOpen: boolean;
  title: string;
  folderName: string;
  onCloseClick: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
};

const ShareModal = ({ isOpen, title, folderName, onCloseClick }: Props) => {
  const currentUrl = window.location.href;

  const copyToClipboard = () => {
    const textToCopy = currentUrl;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("복사하기 성공");
      })
      .catch((error) => {
        console.error("error:", error);
      });
  };

  const sharedKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "Linkbrary",
        description: "링크를 관리해 보세요",
        imageUrl:
          "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
    });
  };

  const sharedFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`);
  };

  useEffect(() => {
    if (window.Kakao) {
      window.Kakao.cleanup();
      window.Kakao.init(process.env.REACT_APP_API_KEY);
      window.Kakao.isInitialized();
    }
  }, []);

  return (
    <BaseModal
      isOpen={isOpen}
      title={title}
      onCloseClick={onCloseClick}
    >
      <p className={styles.folder}>{folderName}</p>

      <div className={styles.items}>
        <div className={styles.item}>
          <button type="button" className={styles.icon} onClick={sharedKakao}>
            <Image
              src="/images/ic_kakao.svg"
              width={18}
              height={18}
              alt="카카오 아이콘"
            />
          </button>
          <p className={styles.name}>카카오톡</p>
        </div>

        <div className={styles.item}>
          <button
            type="button"
            className={styles.icon}
            onClick={sharedFacebook}
          >
            <Image
              src="/images/ic_facebook.svg"
              width={18}
              height={18}
              alt="페이스북 아이콘"
            />
          </button>
          <p className={styles.name}>페이스북</p>
        </div>

        <div className={styles.item}>
          <button
            type="button"
            className={styles.icon}
            onClick={copyToClipboard}
          >
            <Image
              src="/images/ic_link.svg"
              width={18}
              height={18}
              alt="링크 아이콘"
            />
          </button>
          <p className={styles.name}>링크 공유</p>
        </div>
      </div>
    </BaseModal>
  );
};

export default ShareModal;
