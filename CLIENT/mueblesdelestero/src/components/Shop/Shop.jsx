import React, { useEffect, useState } from "react";
import "./Shop.modules.css";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const loader = <div className="customloader"></div>;
  const showProducts = () => {
    if (products) {
      if (!products.length) return "Error al cargar el catálogo."
      return products.map((p, index) => (
        <ProductCard
          key={index}
          name={p.name}
          price={p.price}
          picture={p.picture}
          id={p.id}
        />
      ));
    } else return loader
  };

  useEffect(() => {
    axios
      .get("/products")
      .then((res) => res.data)
      .then((prods) => setProducts(prods));
  }, []);
  return (
    <div className="shop">
      <section className="products">
      <h1>Catálogo</h1>
      <div className="cards">{showProducts()}</div>
      </section>
    </div>
  );
}
