import React, { useEffect, useState } from "react";
import "./Shop.modules.css";
import axios from "axios";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const showProducts = products.map((p, index) => (
    <article key={index}>
      <h3>{p.name}</h3>
      <p>{p.price}</p>
      <img src={p.picture}></img>
    </article>
  ));

  useEffect(() => {
    axios.get("http://localhost:3001/products")
    .then(res=> res.data)
    .then(prods => setProducts(prods))
  }, []);
  return (
    <div className="shop">
      <h1>Catálogo</h1>
      <div>{showProducts}</div>
    </div>
  );
}
