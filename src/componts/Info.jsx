import React from "react";
import AppContext from "../context";
import styles from "./Drawer/Drawer.module.scss";
function Info({ title, image, description }) {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className={`${styles.cartEmply} flex`}>
      <img className={`${styles["cartEmply__img"]}`} src={image} />
      <h2 className={`${styles["cartEmply__h2"]}`}>{title}</h2>
      <p>{description}</p>
      <button
        className={`${styles["cartEmply__btn"]}`}
        onClick={() => setCartOpened(false)}
      >
        <img src="/img/arrow.svg" />
        Вернуться назад
      </button>
    </div>
  );
}
export default Info;
