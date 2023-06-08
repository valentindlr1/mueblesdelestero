import React, { useEffect, useState, useReducer } from "react";
import "./ProductDetail.modules.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { cartQuantity } from "../../redux/actions";
import { useDispatch } from "react-redux";

function reducer(state, action) {
  if (action.type === "inc") {
    return state + 1;
  }
  if (action.type === "dec") {
    return state - 1;
  }
}

export default function ProductDetail() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [loading, setLoading] = useState(true);
  const loader = <div className="customloader"></div>;
  const [quantity, setQuantity] = useReducer(reducer, 1);
  const [isInCart, setIsInCart] = useState(false);
  const [flagAdd, setFlagAdd] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleQuantity(type) {
    if (type === "dec" && quantity - 1 < 1) return;
    setQuantity({
      type,
    });
  }

  useEffect(() => {
    axios
      .get("/products/" + id)
      .then((res) => res.data)
      .then((info) => {
        setDetailData(info);
        setLoading(false);
      })
      .catch((error) => console.error(error.message));
    return () => setDetailData({});
  }, []);

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
    <div className="detailContainer">
      {!loading ? (
        <section className="detail">
          <img src={detailData.picture} alt="Product Image"></img>
          <section className="info">
            <h2>{detailData.name}</h2>
            <p>{detailData.description}</p>
            <h3>${detailData.price}</h3>
            {!isInCart && <section className="infoButtons">
              <button onClick={() => handleQuantity("dec")}>-</button>
              <h4>{quantity}</h4>
              <button onClick={() => handleQuantity("inc")}>+</button>
            </section>}
            <section className="addToCart">
              {!isInCart ? <button id="addToCart">Agregar al Carrito</button> : <button id="addToCart" onClick={()=>navigate("/cart")}>Ver en el carrito</button>}
            </section>
          </section>
        </section>
      ) : (
        loader
      )}
    </div>
  );
}
