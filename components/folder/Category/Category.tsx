import styles from "./category.module.css";
import Link from "next/link";
import FolderButton from "@/components/folder/FolderButton/FolderButton";
import { ROUTE_PATHS } from "constants/route";
import { ALL } from "constants/etc";
import type { Folder } from "types";
import type { SelectedCategory } from "pages/folder";

interface Props {
  buttonNames: Folder[];
  selectedCategory: SelectedCategory;
  onClick: (id: number | null, name: string) => void;
}

const Category = ({ buttonNames, selectedCategory, onClick }: Props) => {
  return (
    <div className={styles.buttons}>
      <FolderButton
        isChecked={selectedCategory.name === ALL}
        onClick={() => onClick(null, ALL)}
      >
        {ALL}
      </FolderButton>
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
};

export default Category;
