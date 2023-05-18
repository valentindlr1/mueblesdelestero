import React, { useState, useEffect } from "react";
import "./Landing.modules.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";

export default function Landing() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(
    window.localStorage.getItem("loginData")
      ? JSON.parse(window.localStorage.getItem("loginData"))
      : null
  );

  useEffect(()=>{
    const user = JSON.parse(window.localStorage.getItem("loginData"))
    if (user) navigate('/shop')
  },[])
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const tokens = await axios.post("http://localhost:3001/auth/google", {
        code: codeResponse.code,
      });
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokens.data.access_token}` } }
      );

      console.log("User Info: ", userInfo);

      console.log("Tokens: ", tokens);
      setLoginData(userInfo.data);
      window.localStorage.setItem("loginData", JSON.stringify(userInfo.data));
      navigate("/shop");
    },
    onError: (errorResponse) => console.log(errorResponse),
    // ux_mode: "redirect",
    // redirect_uri: "/home"
  });

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
        <hr />
        <button onClick={googleLogin}>Google</button>
        {/* <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          type="icon"
        /> */}
        <hr />
        <button onClick={() => navigate("/shop")}>Acceder como invitado</button>
        <hr />
        <div className="landingBottom">
          <img
            src="logo-muebles.webp"
            alt="logo"
            className="logoMueblesLanding"
          ></img>
        </div>
      </div>
    </div>
  );
}
