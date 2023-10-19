import React from "react";
import Card from "../componts/Card";
import axios from "axios";

import AppContext from "../context";
export function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { isLoding, onAddToCart, onAddToFavorite } =
    React.useContext(AppContext);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://651d2cab44e393af2d594cc0.mockapi.io/cart"
        );
        setOrders(data);
        console.log("orders", orders);
        setIsLoading(false);
      } catch (error) {
        alert("ERROR при загрузке данных");
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content">
      <div className="content__title">
        <h1>Мои заказы</h1>
      </div>

      <div className="sneakrs">
        {" "}
        {(isLoading ? [...Array(10)] : orders).map((item, index) => (
          <Card
            loading={isLoding}
            key={index}
            {...item}
            // onFavorite={(item) => {
            //   onAddToFavorite(item);
            // }}
            // onPlus={(item) => {
            //   onAddToCart(item);
            // }}
          />
        ))}
      </div>
    </div>
  );
}
