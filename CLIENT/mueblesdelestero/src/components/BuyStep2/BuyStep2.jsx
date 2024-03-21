import React, { useEffect, useState } from "react";
import "./BuyStep2.modules.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { cartQuantity } from "../../redux/actions";

export default function BuyStep2() {
  const { id } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPaid, setIsPaid] = useState(0);
  const [loadingPayment, setLoadingPayment] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const dispatch = useDispatch();
  const loader = <div className="customloader"></div>;
  const [paymentLeft, setPaymentLeft] = useState(0);

  useEffect(() => {
    axios
      .get("/purchases/" + id)
      .then((res) => res.data)
      .then((purchase) => {
        setTotalPrice(purchase.totalPrice);
        setPaymentLeft(purchase.totalPrice - purchase.totalPaid);
        if (purchase.status === "Pago en revisión") setIsPaid(-1);
        else if (purchase.status === "Señado") setIsPaid(1);
        else if (purchase.status === "Abonado") setIsPaid(2);
        else if (purchase.status === "Pago pendiente") setIsPaid(0);
        else setIsPaid(2);
        setLoadingData(false);
        setLoadingPayment(false);
      })
      .catch((err) => {
        console.error(err.message);
        setLoadingData(false);
        setLoadingPayment(false);
      });
  }, []);

  function confirmPartPay() {
    setLoadingPayment(true);
    axios
      .put("/purchases/status/" + id, { status: "Pago en revisión" })
      .then((res) => res.data)
      .then((info) => {
        setIsPaid(-1);
        window.localStorage.setItem("cart", JSON.stringify([]));
        dispatch(cartQuantity(0));
        setLoadingPayment(false);
      })
      .catch((err) => {
        console.error(err.message);
        setLoadingPayment(false);
      });
  }

  return (
    <main className="buyContainer">
      <header>
        <h1>¡Último paso!</h1>
        <h2>Abona el total o una seña del 50% para confirmar tu pedido.</h2>
        <h3>
          ¡IMPORTANTE! El total deberá estar abonado cuando se termine la
          fabricación para poder realizar el despacho.
        </h3>
      </header>
      <hr />

      <section className="paymentData">
        <h3>Datos para la transferencia</h3>
        <label>
          <span>Alias:</span>
          <h4>VALENTINHR</h4>
        </label>
        <label>
          <span>CBU:</span>
          <h4>XXXXXXXXXXXXXXXX</h4>
        </label>
        <label>
          <span>Titular:</span>
          <h4>Valentín Herrera De la Rúa</h4>
        </label>
        <label>
          <span>Banco:</span>
          <h4>BRUBANK</h4>
        </label>
      </section>
      <hr />
      {!loadingData && totalPrice ? (
        <section className="paymentTotal">
          <h3>Monto total del pedido</h3>
          <h2>
            {Number(totalPrice).toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
            })}
          </h2>
          <p>No incluye costo de envío, el cual se abona al recibirlo.</p>
          {paymentLeft < totalPrice ? (
            <span>Restante a abonar: {paymentLeft.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
            })}</span>
          ) : (
            ""
          )}
        </section>
      ) : (
        <section className="paymentTotal">
          <h3>Error al cargar la información del pedido</h3>
        </section>
      )}
      <hr />
      {!loadingPayment ? (
        isPaid === 0 ? (
          <section className="paymentFinish">
            <h2>Confirma tu pago</h2>
            <span>Cargar una captura del comprobante</span>
            <input type="file"></input>
            <button onClick={() => confirmPartPay()}>
              He abonado la seña/el total del pedido
            </button>
          </section>
        ) : isPaid === 1 ? (
          <section className="paymentFinish">
            <h2>Tu seña ha sido cargada</h2>
            <span>Carga aquí el comprobante del nuevo pago</span>
            <input type="file"></input>
            <button>Confirmo que he abonado el total del pedido</button>
            <button>Ver el estado de mi pedido</button>
          </section>
        ) : isPaid === 2 ? (
          <section className="paymentFinish">
            <h2>Pago completado</h2>
            <button>Ver el estado de mi pedido</button>
          </section>
        ) : (
          <section className="paymentFinish">
            <h2>Gracias por su confirmación</h2>
            <h3>Su pago está en revisión...</h3>
          </section>
        )
      ) : (
        loader
      )}
    </main>
  );
}
