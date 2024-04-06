import { useState } from "react";
import styles from "./cardlist.module.css";
import Card from "@/components/common/Card/Card";
import NoResults from "@/components/common/NoResults/NoResults";
import type { LinkItem, Folder } from "types";

interface Props {
  items: LinkItem[] | null;
  folderList: Folder[] | null;
}

function CardList({ items, folderList }: Props) {
  if (!items || items.length === 0) {
    return <NoResults />;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <Card item={item} folderList={folderList} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardList;
