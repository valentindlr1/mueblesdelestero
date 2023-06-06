import React, { useEffect, useState } from "react";
import "./Cart.modules.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function Cart() {
  const cartNumber = useSelector((state) => state.cartNumber);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
      const cartIDs = JSON.parse(window.localStorage.getItem("cart"));
      if (cartIDs && cartIDs.length) {
        const aux = cartIDs.map(item=>item.id)
        console.log(aux)
        axios.get("/products/cart/"+JSON.stringify(aux))
        .then(res=>res.data)
        .then(items=>{
          setCartData(items)
        })
      }
    
  }, [cartNumber]);

  return (
    <main className="cartContainer">
      <header className="cartHeader">
        <h1>Mi Carrito</h1>
      </header>
      <section className="cartProducts">
        {cartData.length ? cartData.map((item, index)=><aricle key={index}>{item.name}</aricle>): ""}
      </section>
    </main>
  );
}
