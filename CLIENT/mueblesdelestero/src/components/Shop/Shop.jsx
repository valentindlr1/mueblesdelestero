import React, { useEffect, useState } from "react";
import "./Shop.modules.css";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const loader = <div className="customloader"></div>;
  const showProducts = products.map((p, index) => (
    <ProductCard
      key={index}
      name={p.name}
      price={p.price}
      picture={p.picture}
      id={p.id}
    />
  ));

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => res.data)
      .then((prods) => setProducts(prods));
  }, []);
  return (
    <div className="shop">
      <h1>Catálogo</h1>
      <div>{showProducts.length ? showProducts : loader}</div>
    </div>
  );
}
