import React from "react";
import Card from "../componts/Card";
import AppContext from "../context";

function Favorits() {
  const { favorites } = React.useContext(AppContext);

  return (
    <div className="content">
      <div className="content__title">
        <h1>Мои загладки</h1>
      </div>

      <div className="sneakrs">
        {favorites.map((item, index) => (
          <Card key={index} favorited={true} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Favorits;
