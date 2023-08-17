import React, { useEffect, useState } from "react";
import "./MyOrders.modules.css";
import axios from "axios";
import { pushNotifMessage, shiftNotifMessage } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PurchaseItem from "./Item";

export default function MyOrders() {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const email = JSON.parse(window.localStorage.getItem("userInfo"))?.email;
  const dispatch = useDispatch();
  const loader = <div className="customloader"></div>;
  const navigate = useNavigate();

  const showPurchases =
    typeof purchases !== "string"
      ? purchases.map((purchase, index) => {
          return (
            <PurchaseItem
              key={index}
              totalPrice={purchase.totalPrice}
              status={purchase.status}
              id={purchase.id}
              trackCode={purchase.trackCode}
            />
          );
        })
      : [];

  useEffect(() => {
    if (email) {
      axios
        .get("/users/" + email)
        .then((res) => res.data)
        .then((user) => user.id)
        .then((id) => {
          axios
            .get("/purchases/user/" + id)
            .then((res) => res.data)
            .then((orders) => {
              setPurchases(orders);
              setIsLoading(false);
            })
            .catch((err) => {
              throw new Error(err);
            });
        })
        .catch((err) => {
          console.error(err.message);
          dispatch(pushNotifMessage("Error al cargar los pedidos"));
          setIsLoading(false);
          setTimeout(() => {
            dispatch(shiftNotifMessage());
          });
        });
    }
  }, []);
  if (!email)
    return (
      <main className="myOrdersContainer">
        <h2>Inicia sesión para ver tus pedidos</h2>
        <button
          className="accountSesion"
          onClick={() => navigate("/?myOrders=true")}
        >
          Iniciar Sesion
        </button>
      </main>
    );
  return (
    <main className="myOrdersContainer">
      {!isLoading ? (
        typeof purchases === "string" ? (
          <section>
            <h2>{purchases}</h2>
          </section>
        ) : (
          <section>{showPurchases}</section>
        )
      ) : (
        loader
      )}
    </main>
  );
}

//TODO: Actualizar estado de compra como Admin