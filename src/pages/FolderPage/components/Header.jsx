import style from "./header.module.css";
import linkIcon from "assets/images/ic_link.svg";

function Header() {
  return (
    <div className={style.container}>
      <form className={style.form}>
        <img src={linkIcon} className={style.icon} alt="링크 아이콘" />
        <input
          className={style.input}
          type="text"
          placeholder="링크를 추가해 보세요"
        />
        <button className={style.button}>추가하기</button>
      </form>
    </div>
  );
}

export default Header;
