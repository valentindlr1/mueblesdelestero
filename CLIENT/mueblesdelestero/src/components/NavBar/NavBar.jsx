import React from "react";
import "./NavBar.modules.css";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const user = JSON.parse(window.localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const handleLogOut = () => {
    window.localStorage.removeItem('userInfo')
    navigate('/')
  };
  return (
    <div className="navBar">
      <div>
        <button>boton</button>
        hola navBar
      </div>
      <div>{user && user.name ? user.name : ""}</div>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  );
}
