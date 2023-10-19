import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";
import AppContext from "../../context";

function Card({
  id,
  title,
  imageUrl,
  price,
  onPlus,
  onFavorite,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded, onAddToFavorite } = React.useContext(AppContext);

  //в закладки
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const obj = { id, parentId: id, title, imageUrl, price };

  function onClickFavorite() {
    onAddToFavorite(obj);
    setIsFavorite(!isFavorite);
  }

  function onClickPlus() {
    onPlus(obj);
  }

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={210}
          height={260}
          viewBox="0 -36 150 260"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
          <rect x="0" y="107" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="126" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="163" rx="8" ry="8" width="80" height="24" />
          <rect x="118" y="155" rx="9" ry="9" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                src={
                  isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
                }
                alt="Unliked"
              />
            </div>
          )}
          <img className={styles.card__img} src={imageUrl} alt="" />
          <p className={styles.card__title}>{title}</p>

          <div className={styles.card__price}>
            <div className={styles["card__price-info"]}>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>

            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={
                  isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"
                }
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
