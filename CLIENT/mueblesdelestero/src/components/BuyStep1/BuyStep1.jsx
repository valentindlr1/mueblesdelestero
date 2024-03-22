import React from "react";
import "./BuyStep1.modules.css";
import { useState, useEffect } from "react";
import axios from "axios";
import validateShippingInfo from "./validateShippingInfo";
import NotifMessage from "../NotifMessage/NotifMessage";
import { pushNotifMessage, shiftNotifMessage } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BuyStep1() {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    lName: "",
    dni: "",
    phone: "",
    email: "",
    address: "",
    location: "",
    province: "",
    ZIPcode: "",
    details: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    dni: "",
    phone: "",
  });
  const [infoErrors, setInfoErrors] = useState({
    dni: "",
    phone: "",
    province: "",
    location: "",
    ZIPcode: "",
  });
  const [showAddress, setShowAddress] = useState(true);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.notifMessages);
  const user = JSON.parse(window.localStorage.getItem("userInfo"));
  const [userID, setUserID] = useState(null);
  const cart = JSON.parse(window.localStorage.getItem("cart"));
  const totalPrice = useSelector((state) => state.totalPrice);
  const loader = <div className="customLoader"></div>;

  useEffect(() => {
    axios
      .get("/users/" + user.email)
      .then((res) => res.data)
      .then((info) => {
        setUserData({
          ...userData,
          dni: info.dni,
          phone: info.phone,
        });
        setUserID(info.id);
        setIsLoading(false);
      })
      .catch((err) => console.error(err.message));
  }, []);

  function handleShippingInfo(event) {
    setShippingInfo({
      ...shippingInfo,
      [event.target.name]: event.target.value,
    });
    setInfoErrors({
      ...infoErrors,
      ...validateShippingInfo({ [event.target.name]: event.target.value || 1 }),
    });
  }

  function handleCheckbox(e) {
    let checked = e.target.checked;
    if (checked) {
      setShowAddress(false);
    } else {
      setShowAddress(true);
    }
  }

  function handleInfoSubmit(e) {
    e.preventDefault();
    let auxErrors = validateShippingInfo({
      dni: shippingInfo.dni.length ? shippingInfo.dni : userData.dni,
      phone: shippingInfo.phone.length ? shippingInfo.phone : userData.phone,
      province: shippingInfo.province.length ? shippingInfo.province : "1",
      location: shippingInfo.location.length ? shippingInfo.location : "1",
      ZIPcode: shippingInfo.ZIPcode.length ? shippingInfo.ZIPcode : "1",
    });
    let isError = false;
    Object.values(auxErrors).forEach((error) => {
      if (error.length) {
        isError = true;
      }
    });
    if (isError) {
      dispatch(pushNotifMessage("Complete todos los campos correctamente"));
      setTimeout(() => {
        dispatch(shiftNotifMessage());
      }, 3990);
    } else {
      setIsLoading(true);
      axios
        .post("/purchases/" + userID, {
          name: shippingInfo.name.length
            ? shippingInfo.name
            : user.name.split(" ")[0],
          lName: shippingInfo.lName.length
            ? shippingInfo.lName
            : user.lName
            ? user.lName
            : user.name.split(" ")[user.name.split(" ").length - 1],
          dni: shippingInfo.dni.length ? shippingInfo.dni : userData.dni,
          phone: shippingInfo.phone.length
            ? shippingInfo.phone
            : userData.phone,
          email: shippingInfo.email.length ? shippingInfo.email : user.email,
          products: cart,
          limitDate: "",
          address: showAddress ? shippingInfo.address : "Sucursal",
          location: shippingInfo.location,
          ZIPcode: shippingInfo.ZIPcode,
          province: shippingInfo.province,
          details: shippingInfo.details,
          totalPrice,
        })
        .then((res) => {
          dispatch(pushNotifMessage("Pedido creado con éxito"));
          setTimeout(() => {
            dispatch(shiftNotifMessage());
          }, 3990);
          setIsLoading(false);
          let buyId = res.data.id;
          window.localStorage.setItem("cart", JSON.stringify([]));
          navigate("/pago/" + buyId);
        })
        .catch((err) => console.error(err.message));
    }
  }

  const showMessage = messages.length
    ? messages.map((msg, index) => <NotifMessage message={msg} key={index} />)
    : "";

  return isLoading ? (
    <main className="buyContainer">{loader}</main>
  ) : (
    <main className="buyContainer">
      <div className="backToCartDiv">
        <button>Volver al carrito</button>
      </div>

      <section className="shippingForm">
        <h2>¿Quién recibe el envío?</h2>
        <form onSubmit={handleInfoSubmit} className="theForm">
          <label>
            <h4>Nombre</h4>
            <input
              type="text"
              placeholder={user.name.split(" ")[0]}
              value={shippingInfo.name}
              name="name"
              onChange={handleShippingInfo}
            ></input>
          </label>
          <label>
            <h4>Apellido</h4>
            <input
              type="text"
              placeholder={
                user.lName
                  ? user.lName
                  : user.name.split(" ")[user.name.split(" ").length - 1]
              }
              value={shippingInfo.lName}
              name="lName"
              onChange={handleShippingInfo}
            ></input>
          </label>
          <label>
            <h4>Email</h4>
            <input
              type="text"
              placeholder={user.email}
              value={shippingInfo.email}
              name="email"
              onChange={handleShippingInfo}
            ></input>
          </label>
          <label>
            <h4>DNI</h4>
            <input
              type="text"
              placeholder={userData.dni}
              value={shippingInfo.dni}
              name="dni"
              onChange={handleShippingInfo}
            ></input>
            {infoErrors.dni && infoErrors.dni.length ? (
              <p className="warning">{infoErrors.dni}</p>
            ) : (
              ""
            )}
          </label>
          <label>
            <h4>Teléfono</h4>
            <input
              type="text"
              placeholder={userData.phone}
              value={shippingInfo.phone}
              name="phone"
              onChange={handleShippingInfo}
            ></input>
            {infoErrors.phone ? (
              <p className="warning">{infoErrors.phone}</p>
            ) : (
              ""
            )}
          </label>
          <label>
            <h4>Provincia</h4>
            <input
              type="text"
              placeholder="Ejemplo: Buenos Aires"
              value={shippingInfo.province}
              name="province"
              onChange={handleShippingInfo}
            ></input>
            {infoErrors.province && infoErrors.province.length ? (
              <p className="warning">{infoErrors.province}</p>
            ) : (
              ""
            )}
          </label>
          <label>
            <h4>Localidad o Distrito</h4>
            {/* <span>Aclarar si es en CABA</span> */}
            <input
              type="text"
              placeholder="Ejemplo: Avellaneda"
              value={shippingInfo.location}
              name="location"
              onChange={handleShippingInfo}
            ></input>
            {infoErrors.location && infoErrors.location.length ? (
              <p className="warning">{infoErrors.location}</p>
            ) : (
              ""
            )}
          </label>
          <label>
            <h4>Código Postal</h4>
            <input
              type="text"
              placeholder="Ejemplo: 1870"
              value={shippingInfo.ZIPcode}
              name="ZIPcode"
              onChange={handleShippingInfo}
            ></input>
            {infoErrors.ZIPcode && infoErrors.ZIPcode.length ? (
              <p className="warning">{infoErrors.ZIPcode}</p>
            ) : (
              ""
            )}
          </label>
          <label>
            <h4>Domicilio</h4>
            <div className="retirarCheck">
              <input
                type="checkbox"
                className="checkbox"
                onChange={handleCheckbox}
              ></input>
              <span>Prefiero retirarlo de sucursal.</span>
            </div>
            {showAddress ? (
              <input
                type="text"
                placeholder="Calle, Altura, Depto"
                value={shippingInfo.address}
                name="address"
                onChange={handleShippingInfo}
                required
              ></input>
            ) : (
              ""
            )}
          </label>
          <label>
            <h4>Aclaraciones</h4>
            <textarea
              value={shippingInfo.details}
              placeholder="Detalles sobre el domicilio, horarios de entrega, etc..."
              name="details"
              onChange={handleShippingInfo}
            ></textarea>
          </label>

          <button type="submit" className="step1Button">
            Ir a pagar
          </button>
        </form>
      </section>
      {showMessage}
    </main>
  );
}
