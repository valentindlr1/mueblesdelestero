import React from "react";
import "./Landing.modules.css";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landingContainer">
      <div className="landingMenu">
        <h1>Iniciar Sesión</h1>
        <form className="landingForm">
          <label>
            <input placeholder="Email" />
          </label>
          <label>
            <input placeholder="Contraseña" />
          </label>
          <button onClick={() => navigate("/shop")}>Acceder</button>
        </form>
        <hr/>
        <button onClick={() => navigate("/shop")}>Google</button>
        <hr/>
        <button onClick={() => navigate("/shop")}>Acceder como invitado</button>
        <hr/>
        <div className="landingBottom">
            <img src="" alt="logo"></img>
            <h3>MUEBLES DEL ESTERO</h3>
        </div>
      </div>
    </div>
  );
}
