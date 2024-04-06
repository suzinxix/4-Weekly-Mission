import styles from "./category.module.css";
import Link from "next/link";

import FolderButton from "@/components/folder/FolderButton/FolderButton";

import type { Folder } from "types";
import type { SelectedCategory } from "pages/folder";

// import { ALL } from "constants";
const ALL = "전체"

interface Props {
  buttonNames: Folder[];
  selectedCategory: SelectedCategory;
  onClick: (id: number | null, name: string) => void;
}

function Category({ buttonNames, selectedCategory, onClick }: Props) {
  return (
    <div className={styles.buttons}>
      <Link href="/folder">
        <FolderButton
          isChecked={selectedCategory.name === ALL}
          onClick={() => onClick(null, ALL)}
        >
          {ALL}
        </FolderButton>
      </Link>
      {buttonNames.map(({ id, name }) => (
        <FolderButton
          key={id}
          isChecked={selectedCategory.name === name}
          onClick={() => onClick(id, name)}
        >
          {name}
        </FolderButton>
      ))}
    </div>
  );
}

export default Category;
