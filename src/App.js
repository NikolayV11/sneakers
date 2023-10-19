import React from "react";
import axios from "axios";
// Для навигации
import { Route, Routes } from "react-router-dom";

import AppContext from "./context";

import Home from "./pages/Home";
import Favorits from "./pages/Favorits";
import { Orders } from "./pages/Orders";

import Header from "./componts/Header";
import Drawer from "./componts/Drawer";

function App() {
  const [items, setItems] = React.useState([]);

  // работа с input #5
  const [searchValue, setSearchValue] = React.useState("");
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  //в закладки
  const [favorites, setFavorites] = React.useState([]);
  function onAddToFavorite(objCar) {
    try {
      if (favorites.find((obj) => obj.id === objCar.id)) {
        onRemoveFavorit(objCar);
      } else {
        setFavorites((prev) => [...prev, objCar]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  }
  function onRemoveFavorit(obj) {
    setFavorites((prev) => {
      return prev.filter((item) => {
        return Number(item.id) !== Number(obj.id);
      });
    });
  }

  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoding, setIsLoding] = React.useState(true);
  const [cartItems, setCartItems] = React.useState([]);

  // Получили с сервера список товаров и список с карзины (если в нем что-то есть)
  React.useEffect(() => {
    async function fetchData() {
      // axios
      //   .get("https://651d2cab44e393af2d594cc0.mockapi.io/items")
      //   .then((res) => {
      //     setItems(res.data);
      //   });
      // axios
      //   .get("https://651d2cab44e393af2d594cc0.mockapi.io/cart")
      //   .then((res) => {
      //     setCartItems(res.data);
      //   });
      setIsLoding(true);
      const cartResponse = await axios.get(
        "https://651d2cab44e393af2d594cc0.mockapi.io/cart"
      );
      const itemsResponse = await axios.get(
        "https://651d2cab44e393af2d594cc0.mockapi.io/items"
      );

      setIsLoding(false);
      setCartItems(cartResponse.data);
      // console.log(cartResponse);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  // Добавили в карзину
  async function onAddToCart(obj) {
    // поиск в карзине по parentId
    const findItem = cartItems.find(
      (item) => Number(item.parentId) === Number(obj.id)
    );

    try {
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        // удаляем найденный объект в карзине по id
        axios.delete(
          `https://651d2cab44e393af2d594cc0.mockapi.io/cart/${findItem.id}`
        );
      } else {
        // добавляем в карзину новый товар
        const { data } = await axios.post(
          "https://651d2cab44e393af2d594cc0.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в карзину");
    }
  }

  // удаление с БД
  function onRemoveItem(id) {
    axios.delete(`https://651d2cab44e393af2d594cc0.mockapi.io/cart/${id}`);
    setCartItems((prev) => {
      return prev.filter((item) => {
        return Number(item.id) !== Number(id);
      });
    });
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
    console.log("isItemAdded(id)", cartItems);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isLoding,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
        onAddToCart,
      }}
    >
      <div className="wrapper">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header
          onClickCart={() => {
            setCartOpened(true);
          }}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                items={items}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                favorites={favorites}
                isLoding={isLoding}
              />
            }
            exact
          />
          <Route path="/favorites" element={<Favorits />} exact />
          <Route path="/orders" element={<Orders />} exact />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
