import React from "react";
import Card from "../componts/Card";

function Home(props) {
  function renderItems() {
    const filtredItems = props.items.filter((item) => {
      return item.title.toLowerCase().includes(props.searchValue.toLowerCase());
    });

    return (props.isLoding ? [...Array(8)] : filtredItems).map(
      (item, index) => (
        <Card
          loading={props.isLoding}
          key={index}
          {...item}
          onFavorite={(item) => {
            props.onAddToFavorite(item);
          }}
          onPlus={(item) => {
            props.onAddToCart(item);
          }}
        />
      )
    );
  }
  return (
    <div className="content">
      <div className="content__title">
        <h1>
          {props.searchValue
            ? `Поиск по запросу: "${props.searchValue}"`
            : "Все кросовки"}
        </h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="search"></img>
          {props.searchValue && (
            <img
              onClick={() => {
                props.setSearchValue("");
              }}
              className="clear"
              src="/img/btn-remove.svg"
              alt="clear"
            />
          )}
          <input
            value={props.searchValue}
            onChange={props.onChangeSearchInput}
            type="text"
            placeholder="Поиск ..."
          />
        </div>
      </div>
      <div className="sneakrs">{renderItems()}</div>
    </div>
  );
}

export default Home;
