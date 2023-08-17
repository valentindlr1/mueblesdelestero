import React from "react";
import "./Item.modules.css";
import { useNavigate } from "react-router-dom";

export default function PurchaseItem({ products, totalPrice, status, id, trackCode }) {
  const navigate = useNavigate()
  return (
    <div className="purchaseCard">
      <h3>Total: ${totalPrice},00</h3>
      <h3>Estado: {status}</h3>
      {status === "Pago pendiente" ? <button onClick={()=> navigate("/buy-step-2/"+id)}>Ir a pagar</button> : ""}
      {trackCode.length ? <h3>Número de seguimiento: {trackCode}</h3> : ""}
    </div>
  );
}
