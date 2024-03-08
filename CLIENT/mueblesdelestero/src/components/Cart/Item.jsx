import React, { useState } from "react";
import "./Item.modules.css";
import { useNavigate } from "react-router-dom";

export default function CartItem({
  name,
  price,
  picture,
  quantity,
  id,
  deleteItem,
  toogleTrigger,
  trigger,
}) {
  const navigate = useNavigate();
  const [actualQuantity, setActualQuantity] = useState(quantity);

  function handleQuantity(num) {
    if (actualQuantity + num > 0) {
      let localCart = JSON.parse(window.localStorage.getItem("cart"));
      let localItem = [...localCart].filter((item) => item.id === id)[0];
      setActualQuantity(actualQuantity + num);
      let itemIndex = localCart.indexOf(localItem);
      localCart[itemIndex].quantity = actualQuantity + num;
      window.localStorage.setItem("cart", JSON.stringify(localCart));
      toogleTrigger(!trigger);
    }
  }

  return (
    <article className="cartItem">
      <header
        onClick={() => {
          navigate("/tienda/detalle/" + id);
        }}
      >
        <img src={picture} className="itemPicture"></img>
        <h3>{name}</h3>
      </header>
      <section className="itemPriceQuantity">
        <div className="itemPrices">
          <span>${price} c/u</span>
          <h3>${price * actualQuantity}</h3>
        </div>
        <div className="quantities">
          <button className="deleteItem" onClick={() => deleteItem(id)}>
            DE
          </button>
          <button onClick={() => handleQuantity(-1)}>-</button>
          <h4>{actualQuantity}</h4>
          <button onClick={() => handleQuantity(1)}>+</button>
        </div>
      </section>
    </article>
  );
}
