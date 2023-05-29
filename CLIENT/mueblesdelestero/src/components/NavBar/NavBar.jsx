import React from "react";
import "./NavBar.modules.css";
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage} from "@fortawesome/free-regular-svg-icons";
import {faMobileAlt, faCartShopping, faUser, faMoneyCheck, faBars, faQuestion} from "@fortawesome/free-solid-svg-icons";
const phone = <FontAwesomeIcon className="icon" icon={faMobileAlt} style={{height: "4rem", marginLeft: "0.5rem"}} />
const cart = <FontAwesomeIcon className="icon" icon={faCartShopping} style={{height: "4rem" , marginLeft: "0.5rem"}} />
const profile = <FontAwesomeIcon className="icon" icon={faUser} style={{height: "4rem" , marginLeft: "0.5rem"}} />
const purchases = <FontAwesomeIcon className="icon" icon={faMoneyCheck} style={{height: "4rem" , marginLeft: "0.5rem"}} />
const info = <FontAwesomeIcon className="icon" icon={faQuestion} style={{height: "4rem" , marginLeft: "0.5rem"}} />

export default function NavBar() {
  const user = JSON.parse(window.localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const handleLogOut = () => {
    window.localStorage.removeItem("userInfo");
    navigate("/");
  };
  const cartNumber = useSelector(state => state.cartNumber)
  return (
    <div className="navBar">
      <ul className="navButtons">
        <li className="navItem" onClick={()=>navigate("/shop")}>
          <img src="/logo-muebles.png" alt="Logo mueblesdelestero" id="logoNav"></img>
        <h2>MUEBLES DEL ESTERO</h2>
        </li>
        <li className="navItem" onClick={()=>navigate("/account")}>
          {profile}
          <h4>Mi cuenta</h4>
        </li>
        <li className="navItem" onClick={()=>navigate("/cart")}>
          <p className="cartNumber">{cartNumber > 0 && cartNumber}</p>
          {cart}
          <h4>Carrito</h4>
        </li>
        <li className="navItem" onClick={()=>navigate("/purchases")}>
          {purchases}
          <h4>Mis compras</h4>
        </li>
        <li className="navItem" onClick={()=>navigate("/info")}>
        {info}
          <h4>Cómo comprar</h4>
        </li>
        <li className="navItem" onClick={()=>navigate("/contact")}>
          {phone}
          <h4>Contáctanos</h4>
        </li>
        <li className="navItem sesion" onClick={handleLogOut}>
          <button>{user ? "Cerrar Sesión" : "Iniciar Sesión"}</button>
        </li>
      </ul>
    </div>
  );
}
