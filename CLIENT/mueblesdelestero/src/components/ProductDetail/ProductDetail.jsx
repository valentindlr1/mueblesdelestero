import React, { useEffect, useState, useReducer, useRef } from "react";
import "./ProductDetail.modules.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function reducer (state, action) {
  if (action.type === "inc"){
    return state +1
  }
  if(action.type === "dec"){
    return state -1
  }
}

export default function ProductDetail() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [loading, setLoading] = useState(true);
  const loader = <div className="customloader"></div>;
  const [quantity, dispatch] = useReducer(reducer, 1)

  function handleQuantity(type) {
    if (type === "dec" && quantity - 1 < 1) return 
      dispatch({
        type
      })
    
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/products/" + id)
      .then((res) => res.data)
      .then((info) => {
        setDetailData(info);
        setLoading(false);
      })
      .catch((error) => console.error(error.message));
    return () => setDetailData({});
  }, []);
  console.log(detailData);
  return (
    <div className="detailContainer">
      {!loading ? (
        <section className="detail">
          <img src={detailData.picture} alt="Product Image"></img>
          <section className="info">
            <h2>{detailData.name}</h2>
            <p>{detailData.description}</p>
            <h3>${detailData.price}</h3>
            <section className="infoButtons">
              <button onClick={() => handleQuantity("dec")}>-</button>
              <h4>{quantity}</h4>
              <button onClick={() => handleQuantity("inc")}>+</button>
            </section>
            <section className="addToCart">
              <button id="addToCart">Agregar al Carrito</button>
            </section>
          </section>
        </section>
      ) : (
        loader
      )}
    </div>
  );
}
