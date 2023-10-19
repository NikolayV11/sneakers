import React from "react";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from "./Drawer.module.scss";

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { setCartItems, totalPrice } = useCart();

  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  function onClickOrder() {
    setIsLoading(true);
    setIsOrderComplete(true);
    setCartItems([]);
    setIsLoading(false);
  }

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={`${styles.drawer}`}>
        <h2>
          Корзина
          <img
            onClick={onClose}
            className={`${styles["btn-remove"]}`}
            src="/img/btn-remove.svg"
            alt="remove"
          />
        </h2>

        {items.length > 0 ? (
          <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <div className={`${styles.items}`}>
              {items.map((obj) => (
                <div key={obj.id} className={`${styles.cartItem}`}>
                  <img
                    className={`${styles.card__img}`}
                    src={obj.imageUrl}
                    alt="snaekers"
                  />
                  <div>
                    <p className={`${styles.card__title}`}>{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    className={`${styles["cartItem__btn-remove"]}`}
                    src="/img/btn-remove.svg"
                    alt="remove"
                    onClick={() => {
                      onRemove(obj.id);
                      console.log(obj.id, "parentId: ", obj.parentId);
                    }}
                  />
                </div>
              ))}
            </div>
            <div className={`${styles["drawer__decor"]}`}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className={`${styles.greenButton}`}
              >
                Оформить заказ <img src="/img/further.svg" alt="further"></img>
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Карзина пустая"}
            image={
              isOrderComplete
                ? "/img/complite-order.png"
                : "/img/empty-cart.png"
            }
            description={
              isOrderComplete
                ? "Ваш заказ #18 скоро будет передан курьерской доставке"
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
