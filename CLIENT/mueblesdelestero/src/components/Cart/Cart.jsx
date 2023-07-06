import React, { useEffect, useState } from "react";
import "./Cart.modules.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  cartQuantity,
  pushNotifMessage,
  shiftNotifMessage,
} from "../../redux/actions";
import CartItem from "./Item";
import NotifMessage from "../NotifMessage/NotifMessage";

export default function Cart() {
  const cartNumber = useSelector((state) => state.cartNumber);
  const [cartData, setCartData] = useState([]);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.notifMessages);
  const showMessage = messages.length
    ? messages.map((msg, index) => <NotifMessage message={msg} key={index} />)
    : "";

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
          dispatch(pushNotifMessage("Error al cargar el carrito"));
          setTimeout(() => {
            dispatch(shiftNotifMessage());
          }, 3990);
        });
    } else if (cartItems && !cartItems.length) {
      setCartData([]);
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

  function deleteItem(id) {
    let cart = JSON.parse(window.localStorage.getItem("cart"));
    let newCart = cart.filter((item) => item.id !== id);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch(cartQuantity(newCart.length));
    dispatch(pushNotifMessage("Artículo Eliminado"));
    setTimeout(() => {
      dispatch(shiftNotifMessage());
    }, 3990);
  }

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
              deleteItem={deleteItem}
            />
          ))
        ) : (
          <h3>Tu carrito está vacío</h3>
        )}
      </section>
      {showMessage}
    </main>
  );
}
