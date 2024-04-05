import { PropsWithChildren } from "react";
import styles from "./layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.outlet}>{children}</main>
      <Footer />
    </div>
  );
}
