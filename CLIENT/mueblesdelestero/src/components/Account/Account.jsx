import React, { useState, useEffect } from "react";
import "./Account.modules.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Account() {
  const { user } = JSON.parse(window.localStorage.getItem("userInfo"));
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/" + user.email)
      // TODO: crear getById en back
      .then((res) => res.data)
      .then((data) => setUserData(data))
      .catch((error) => console.error(error.message));
  }, [editing]);

  function toggleEdit() {
    if (editing) {
      // TODO: verificar si hubo cambios
      const change = window.confirm(
        "¿Quieres cancelar la edición? Se perderán los cambios"
      );
      if (change) {
        setEditing(false);
      }
    } else {
      setEditing(true);
    }
  }
  console.log(userData);
  return (
    <main className="accountContainer">
      <header>
        <h1>Datos Personales</h1>
        {!user && <h3>Inicia sesión para gestionar tus datos</h3>}
        <p>Tus datos personales serán utilizados para despachar tu pedido.</p>
        {user && <img src={userData.picture}></img>}
      </header>
      <section>
        {!user && (
          <button className="accountSesion" onClick={() => navigate("/")}>
            Iniciar Sesion
          </button>
        )}
        {user &&
          (editing ? (
            <form>
              <label></label>
            </form>
          ) : (
            <form>
              <label>
                <h4>Nombre:</h4>
                <h3>{userData.name}</h3>
              </label>
              <label>
                <h4>Apellido:</h4>
                <h3>{userData.lName}</h3>
              </label>
              <label>
                <h4>DNI:</h4>
                <h3>{userData.dni}</h3>
              </label>
              <label>
                <h4>Teléfono:</h4>
                <h3>{userData.phone}</h3>
              </label>
            </form>
          ))}
        <button type="button" onClick={toggleEdit}>
          {!editing ? "Editar" : "Cancelar Edición"}
        </button>
      </section>
    </main>
  );
}
