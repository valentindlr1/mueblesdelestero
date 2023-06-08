import React, { useEffect, useState } from "react";
import "./Shop.modules.css";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const loader = <div className="customloader"></div>;
  const showProducts = () => {
    if (products) {
      if (!products.length) return <h3>Error al cargar el catálogo.</h3>;
      return products.map((p, index) => (
        <ProductCard
          key={index}
          name={p.name}
          price={p.price}
          picture={p.picture}
          id={p.id}
        />
      ));
    } else return loader;
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
        <div className={products.length ? "cards" : ""}>{showProducts()}</div>
      </section>
    </div>
  );
}
