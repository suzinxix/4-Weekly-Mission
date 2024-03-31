import styles from "./cardlist.module.css";
import Card from "@/components/common/Card/Card";
import NoResults from "@/components/common/NoResults/NoResults";
import { GetLinkResponse } from "types/apis";
import { UseModal } from "hooks/useModal";

interface Props extends Partial<UseModal> {
  items: GetLinkResponse[] | null;
}

function CardList({ items, ...rest }: Props) {
  const handleClick = (url: string) => {
    window.open(url, "_blank");
  };

  if (!items || items.length === 0) {
    return <NoResults />;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <Card item={item} onClick={() => handleClick(item.url)} {...rest} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardList;
