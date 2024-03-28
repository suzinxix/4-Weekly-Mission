import FolderButton from "@/components/FolderButton/FolderButton";
import Link from "next/link";
import styles from "./category.module.css";
import { ALL } from "utils/constants/strings";
import { GetFolderResponse } from "types/apis";
import { SelectedCategory, ButtonClick } from "pages/folder";

interface Props {
  buttonNames: GetFolderResponse[];
  selectedCategory: SelectedCategory;
  onClick: ButtonClick;
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
        // <Link href={`/shared/${id}`} key={id}>
        //   <FolderButton
        //     ischecked={selectedCategory.name === name}
        //     onClick={() => onClick(id, name)}
        //   >
        //     {name}
        //   </FolderButton>
        // </Link>
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
