import Link from "next/link";
import styles from "./Navigation.module.css";

type Props = {
  question: string;
  navigation: string;
  link: string;
};

const Navigation = ({ question, navigation, link }: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.text}>{question}</span>
      <Link href={link} className={styles.link}>
        {navigation}
      </Link>
    </div>
  );
};

export default Navigation;
