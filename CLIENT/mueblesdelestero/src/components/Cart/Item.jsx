import React from "react";
import "./Item.modules.css";
import { useNavigate } from "react-router-dom";

export default function CartItem({ name, price, picture, quantity, id }) {
  const navigate = useNavigate();

  return (
    <article className="cartItem">
      <header
        onClick={() => {
          navigate("/shop/detail/" + id);
        }}
      >
        <img src={picture} className="itemPicture"></img>
        <h3>{name}</h3>
      </header>
      <section className="itemPriceQuantity">
        <h3>${price}</h3>
        <div>
          <button className="deleteItem">DE</button>
          <button>-</button>
          <h4>{quantity}</h4>
          <button>+</button>
        </div>
      </section>
    </article>
  );
}
