import React from "react";
// Для навигации
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header>
      <Link style={{ textDecoration: "none" }} to={"/"}>
        <div className="headerLeft">
          <img src="/img/logo.png" alt="logo" />
          <div className="headerInfo">
            <h3>React Sneakes</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="headerRight">
        <li style={{ cursor: "pointer" }} onClick={props.onClickCart}>
          <img src="/img/cart.svg" alt="cart" />
          <span>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to={"/favorites"}>
            <img
              style={{ cursor: "pointer" }}
              src="/img/heart-unliked.svg"
              alt="liked"
            />
          </Link>
        </li>
        <li>
          <Link to={"/orders"}>
            <img src="/img/user.svg" alt="user" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
