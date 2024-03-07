import React, { useEffect, useState } from "react";
import "./ProductCard.modules.css";
// import "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartQuantity } from "../../redux/actions";

export default function ProductCard({ name, price, picture, id }) {
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [flagAdd, setFlagAdd] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(cartQuantity(cart.length));
    }
  }, [flagAdd]);
  return (
    <article >
      <img
        src={picture}
        alt="image"
        title="Ver detalle"
        onClick={() => navigate("/shop/detail/" + id)}
      />
      <div
        className="textDetail"
        onClick={() => navigate("/shop/detail/" + id)}
      >
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
          <button className="seeCart" onClick={() => navigate("/cart")}>
            Ver en el Carrito
          </button>
        </div>
      )}
    </article>
  );
}
