import React, {useEffect, useState} from "react";
import "./BuyStep2.modules.css"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BuyStep2 () {
    const {id} = useParams()
    const totalPrice = useSelector(state => state.totalPrice)

    return <main className="buyContainer">
        <header>
            <h1>¡Último paso!</h1>
            <h2>Abona el total o una seña del 50% para confirmar tu pedido.</h2>
            <h3>¡IMPORTANTE! El total deberá estar abonado cuando se termine la fabricación para poder realizar el despacho.</h3>
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
            <span>A nombre de:</span>
            <h4>Valentin Herrera De la Rua</h4>

            </label>
            <label>
            <span>Banco:</span>
            <h4>BRUBANK</h4>

            </label>
        </section>
        <hr />
        <section className="paymentTotal">
            <h3>Monto total del pedido</h3>
            <h2>${totalPrice},00</h2>
            <p>No incluye costo de envío, el cual se abona al recibirlo.</p>
            
        </section>
        <hr />
        <section className="paymentFinish">
            <h2>Confirma tu pago</h2>
            <span>Cargar una captura del comprobante</span>
            <input type="file"></input>
            <button>He abonado la seña/el total del pedido</button>
        </section>
        <footer></footer>
    </main>
}