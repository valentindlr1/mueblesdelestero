import React, { useState, useEffect } from "react";
import "./Account.modules.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Account() {
  const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  const user = userInfo ? userInfo.user : false;
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    lName: "",
    dni: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const loader = <div className="customloader"></div>;

  useEffect(() => {
    axios
      .get("/users/" + user.email)
      // TODO: crear getById en back
      .then((res) => res.data)
      .then((data) => setUserData(data))
      .catch((error) => console.error(error.message));
  }, [editing]);

  function toggleEdit() {
    if (editing) {
      if (
        editData.name.length ||
        editData.dni.length ||
        editData.lName.length ||
        editData.phone.length
      ) {
        const cancel = window.confirm(
          "¿Quieres cancelar la edición? Se perderán los cambios"
        );
        if (cancel) {
          setEditing(false);
          setEditData({
            name: "",
            lName: "",
            dni: "",
            phone: "",
          });
        }
      } else setEditing(false);
    } else {
      setEditing(true);
    }
  }
  const handleEditData = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put("/users/update/" + userData.id, {
        name: editData.name.length ? editData.name : userData.name,
        lName: editData.lName.length ? editData.lName : userData.lName,
        dni: editData.dni.length ? editData.dni : userData.dni,
        phone: editData.phone.length ? editData.phone : userData.phone,
        picture: userData.picture,
      })
      .then((res) => res.data)
      .then((data) => {
        setMessage(data);
        setEditData({
          name: "",
          lName: "",
          dni: "",
          phone: "",
        });
        setEditing(false);
        setLoading(false);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        setMessage("Error al actualizar los datos");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };
  return (
    <main className="accountContainer">
      <header>
        <h1>Datos Personales</h1>
        {!user && <h3>Inicia sesión para gestionar tus datos</h3>}
        <p>Tus datos personales serán utilizados para despachar tu pedido.</p>
        {user && <img src={userData.picture} className="userPic"></img>}
        {user && <span>{userData.email}</span>}
      </header>
      <section className="formContainer">
        {!user && (
          <button className="accountSesion" onClick={() => navigate("/")}>
            Iniciar Sesion
          </button>
        )}
        {user &&
          (editing ? (
            <form className="userInfo" onSubmit={handleEditSubmit}>
              <label>
                <h4>Nombre:</h4>
                <input
                  placeholder={userData.name}
                  type="text"
                  value={editData.name}
                  name="name"
                  onChange={handleEditData}
                ></input>
              </label>
              <label>
                <h4>Apellido:</h4>
                <input
                  placeholder={userData.lName}
                  type="text"
                  value={editData.lName}
                  name="lName"
                  onChange={handleEditData}
                ></input>
              </label>
              <label>
                <h4>DNI:</h4>
                <input
                  placeholder={userData.dni}
                  type="number"
                  value={editData.dni}
                  name="dni"
                  onChange={handleEditData}
                ></input>
              </label>
              <label>
                <h4>Teléfono:</h4>
                <input
                  placeholder={userData.phone}
                  type="number"
                  value={editData.phone}
                  name="phone"
                  onChange={handleEditData}
                ></input>
              </label>
              {loading ? (
                loader
              ) : (
                <button type="submit" className="editUserButtons">
                  Guardar
                </button>
              )}
            </form>
          ) : (
            <form className="userInfo">
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
        {user && (
          <button
            type="button"
            onClick={toggleEdit}
            className="editUserButtons"
          >
            {!editing ? "Editar" : "Cancelar Edición"}
          </button>
        )}
      </section>
      {message.length ? <span>{message}</span> : ""}
    </main>
  );
}
