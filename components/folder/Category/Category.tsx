import styles from "./category.module.css";
import FolderButton from "@/components/folder/FolderButton/FolderButton";

import type { Folder } from "types";
import type { SelectedCategory } from "pages/folder";

const ALL = "전체";

type Props = {
  buttonNames: Folder[];
  selectedCategory: SelectedCategory;
  onClick: (id: number | null, name: string) => void;
};

const Category = ({ buttonNames, selectedCategory, onClick }: Props) => {
  return (
    <div className={styles.buttons}>
      <FolderButton
        isChecked={selectedCategory.id === null}
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
