import styles from "./footer.module.css";
import Image from "next/image";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.copyright}>©codeit - 2023</div>
        <div className={styles.links}>
          <a href="/privacy.html">Privacy Policy</a>
          <a href="/faq.html">FAQ</a>
        </div>
        <ul className={styles.icons}>
          <li>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image
                src="/images/ic_facebook.svg"
                alt="facebook"
                width="20"
                height="20"
              />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image
                src="/images/ic_twitter.svg"
                alt="twitter"
                width="20"
                height="20"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image
                src="/images/ic_youtube.svg"
                alt="youtube"
                width="20"
                height="20"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image
                src="/images/ic_instagram.svg"
                alt="instagram"
                width="20"
                height="20"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
