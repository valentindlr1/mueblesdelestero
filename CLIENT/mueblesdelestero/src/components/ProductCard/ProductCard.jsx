import React, { useEffect, useState } from "react";
import "./ProductCard.modules.css";
import "react-bootstrap"

export default function ProductCard({ name, price, picture, id }) {
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [flagAdd, setFlagAdd] = useState(false);
  function handleQuantity(num) {
    if (quantity + num > 0) {
      setQuantity(quantity + num);
    }
  }

  function addToCart(id) {
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    if (!cart || !cart.length) {
      window.localStorage.setItem("cart", JSON.stringify([{ id, quantity }]));
    } else {
      if (!cart.includes(id)) {
        window.localStorage.setItem(
          "cart",
          JSON.stringify([...cart, { id, quantity }])
        );
      }
    }
    return true;
  }
  useEffect(() => {
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    if (cart) {
      cart.forEach((p) => {
        if (p.id === id) {
          setIsInCart(true);
        }
      });
    }
  }, [flagAdd]);
  return (
    <article >
      <img src={picture} alt="image" />
      <div>
        <h3>{name}</h3>
        <h4>${price}</h4>
      </div>
      {!isInCart ? (
        <div className="buttons">
          <button onClick={() => handleQuantity(-1)}>-</button>
          <p>{quantity}</p>
          <button onClick={() => handleQuantity(1)}>+</button>
          <button
            onClick={() => addToCart(id) && setFlagAdd(!flagAdd)}
            className="addToCart"
          >
            Agregar al carrito
          </button>
        </div>
      ) : (
        <div className="buttons see">
          <button className="seeCart">Ver en el Carrito</button>
        </div>
      )}
    </article>
  );
}
