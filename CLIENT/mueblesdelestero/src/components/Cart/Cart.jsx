import React, { useEffect, useState } from "react";
import "./Cart.modules.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { cartQuantity } from "../../redux/actions";
import CartItem from "./Item";

export default function Cart() {
  const cartNumber = useSelector((state) => state.cartNumber);
  const [cartData, setCartData] = useState([]);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const cartItems = JSON.parse(window.localStorage.getItem("cart"));
    if (cartItems && cartItems.length) {
      axios
        .get("/products/cart/" + JSON.stringify(cartItems))
        .then((res) => res.data)
        .then((items) => {
          setCartData(items);
        })
        .catch((error) => {
          window.localStorage.setItem("cart", JSON.stringify([]));
          dispatch(cartQuantity(0));
          setMessage("Error al cargar el carrito");
          setTimeout(() => {
            setMessage("");
          }, 3990);
        });
    }
  }, [cartNumber]);

  useEffect(() => {
    return () => {
      const cart = JSON.parse(window.localStorage.getItem("cart"));
      if (cart) {
        dispatch(cartQuantity(cart.length));
      } else dispatch(cartQuantity(0));
    };
  }, []);
  return (
    <main className="cartContainer">
      <header className="cartHeader">
        <h1>Mi Carrito</h1>
      </header>
      <section className="cartProducts">
        {cartData.length ? (
          cartData.map((item, index) => (
            <CartItem
              key={index}
              picture={item.picture}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              id={item.id}
            />
          ))
        ) : (
          <h3>Tu carrito está vacío</h3>
        )}
      </section>
    </main>
  );
}
