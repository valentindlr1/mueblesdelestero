import React, { useEffect, useState } from "react";
import "./Orders.modules.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminOrders() {
  const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [initLoad, setInitLoad] = useState(true);

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setInitLoad(false);
  }, []);

  useEffect(() => {
    if (!initLoad) {
      if (userInfo && userInfo.email) {
        axios
          .get("/users/admin/isAdmin/" + userInfo?.email)
          .then((a) => a.data)
          .then((res) => {
            setVerified(res);
            if (!res) {
              navigate("/tienda");
            }
          });
      }
    }
  }, [userInfo, initLoad]);

  useEffect(() => {
    axios
      .get("/purchases")
      .then((a) => a.data)
      .then((res) => {
        setOrders(res);
        console.log(res);
      });
    axios
      .get("/products")
      .then((a) => a.data)
      .then((res) => {
        setProducts(res);
        console.log(res);
      });
  }, []);

  return verified ? (
    <div className="admin-orders-container">
      <h1>Administración de pedidos</h1>
      <div className="admin-orders-list">
        {orders.map((order, i) => (
          <div className="admin-order-card" key={i}>
            <div className="admin-order-card uno">
              <h3>{order.name + " " + order.lName}</h3>
              <h3>{order.status}</h3>
            </div>
            <div className="admin-order-card dos">
              <span>DNI: {order.dni}</span>
              <span>Tel: {order.phone}</span>
              <span>Localidad: {order.location}</span>
              <span>Provincia: {order.province}</span>
              <span>Código Postal: {order.ZIPcode}</span>
              <span>Domicilio: {order.address || "Sucursal"}</span>
            </div>
            <div className="admin-order-card">
              <h4>
                Total pagado{" "}
                {Number(order.totalPaid).toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}{" "}
                de{" "}
                {Number(order.totalPrice).toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </h4>
              <span>Comprobantes</span>
              <div className="admin-order-card tres">
                {(JSON.parse(order.comprobantes))?.map((comp, i) => {

                  return <img src={comp} key={i} alt={"comprobante " + (i + 1)} />;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div></div>
  );
}
