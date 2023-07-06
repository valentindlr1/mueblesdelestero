import React, { useState, useEffect } from "react";
import "./Landing.modules.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import validateLogin from "./validateLogin";
import validateRegister from "./validateRegister";

export default function Landing() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    name: "",
    lName: "",
    email: "",
    phone: "",
    dni: "",
    password: "",
    confirmPass: "",
  });
  const [menuType, setMenuType] = useState("login");
  const [errors, setErrors] = useState({ incomplete: true, password: [] });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const loader = <div className="customloader"></div>;
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("userInfo"));
    if (user) navigate("/shop");
  }, []);
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      setLoadingGoogle(true);
      console.log(codeResponse);
      const tokens = await axios.post("/auth/google", {
        code: codeResponse.code,
      });
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokens.data.access_token}` } }
      );
      console.log("User Info: ", userInfo);
      console.log("Tokens: ", tokens);
      const tryLogin = await axios
        .post("/users/login", {
          email: userInfo.data.email,
          password: userInfo.data.given_name + "1",
          tokenId: tokens.data.expiry_date,
        })
        .then((res) => res.data)
        .catch((error) => console.error("ERROR: ", error.message));
      switch (tryLogin) {
        case "Email no registrado":
          await axios.post("/users/register", {
            name: userInfo.data.given_name,
            lName: userInfo.data.family_name || " ",
            email: userInfo.data.email,
            password: userInfo.data.given_name + "1",
            picture: userInfo.data.picture,
            phone: "Sin Telefono",
            dni: "Sin DNI",
            googleToken: tokens.data.expiry_date,
          });
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify(userInfo.data)
          );
          setLoadingGoogle(false);
          navigate("/shop");
        case "Error al acceder: Usuario baneado.":
          setLoading(false);
          setMessage(tryLogin);
          setTimeout(() => {
            setMessage("");
          }, 4000);
      }
      if (typeof tryLogin !== "string") {
        setLoadingGoogle(false);
        window.localStorage.setItem("userInfo", JSON.stringify(tryLogin.user));
        navigate("/shop");
      }
    },
    onError: (errorResponse) => {
      setLoadingGoogle(false);
      setMessage("Error al enviar solicitud");
      setTimeout(() => {
        setMessage("");
      }, 4000);
      console.log(errorResponse);
    },
    // ux_mode: "redirect",
    // redirect_uri: "/home"
  });

  const handleLoginData = (e) => {
    let aux = {
      ...loginData,
      [e.target.name]: e.target.value,
    };
    setErrors(validateLogin(aux));
    setLoginData(aux);
  };
  const handleRegisterData = (e) => {
    let aux = {
      ...registerData,
      [e.target.name]: e.target.value,
    };
    if (e.target.name === "phone") {
      if (e.target.value.length > 2 && !e.target.value.includes("-")) {
        aux.phone = aux.phone.slice(0, 3) + "-" + aux.phone.slice(3);
      }
    }
    setErrors(validateRegister(aux));
    setRegisterData(aux);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/users/login", loginData)
      .then((res) => res.data)
      .then((info) => {
        if (typeof info === "string") {
          setLoading(false);
          setMessage(info);
          setTimeout(() => {
            setMessage("");
          }, 4000);
        } else {
          window.localStorage.setItem("userInfo", JSON.stringify(info.user));
          setLoading(false);
          navigate("/shop");
        }
      })
      .catch((error) => console.error("ERROR: ", error.message));
  };
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/users/register", {
        ...registerData,
        picture:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      })
      .then((res) => res.data)
      .then((info) => {
        setLoading(false);
        setMessage(info);
        setTimeout(() => {
          setMessage("");
        }, 4000);
      })
      .catch((error) => console.error("ERROR: ", error.message));
  };

  const showMessage = message.length ? message : "";
  return (
    <div className="landingContainer">
      {
        /* LOGIN */
        menuType === "login" ? (
          <div className="landingMenu">
            <h1>Iniciar Sesión</h1>
            <form className="landingForm" onSubmit={handleSubmitLogin}>
              <label>
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginData}
                />
                <p>{errors.email ? errors.email : ""}</p>
              </label>
              <label>
                <input
                  placeholder="Contraseña"
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginData}
                  className="passInput"
                />
              </label>
              {loading ? (
                loader
              ) : (
                <button
                  type={
                    Object.keys(errors).length < 3 &&
                    !errors.incomplete &&
                    !errors.password.length
                      ? "submit"
                      : "button"
                  }
                  className={
                    Object.keys(errors).length < 3 &&
                    !errors.incomplete &&
                    !errors.password.length
                      ? "accessButton"
                      : "accessButtonBlock"
                  }
                >
                  Acceder
                </button>
              )}
            </form>
            <div className="textBtns">
              <p>Olvidé mi contraseña</p>
              <p onClick={() => setMenuType("register")}>
                ¿No tienes una cuenta? Regístrate
              </p>
            </div>
            <hr />
            {!loadingGoogle ? (
              <button onClick={googleLogin} className="googleBtn">
                {/* <span className="googleIcon"></span> */}
                <img src="google1.png" className="googleIcon"></img>
                <span className="googleText">Google</span>
              </button>
            ) : (
              loader
            )}
            <hr />
            <button
              onClick={() => navigate("/shop")}
              className="accessButton invite"
            >
              Acceder como invitado
            </button>

            <hr />
              
            
            {showMessage}
          </div>
        ) : (
          ""
        )
      }
      {
        /* REGISTER */
        menuType === "register" ? (
          <div className="landingMenu">
            <h1>Registrarse</h1>
            <form className="landingForm" onSubmit={handleSubmitRegister}>
              <label>
                <input
                  placeholder="Nombre"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterData}
                />
                <p>{errors.name ? errors.name : ""}</p>
              </label>
              <label>
                <input
                  placeholder="Apellido"
                  name="lName"
                  value={registerData.lName}
                  onChange={handleRegisterData}
                />
                <p>{errors.lName ? errors.lName : ""}</p>
              </label>
              <label>
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterData}
                />
                <p>{errors.email ? errors.email : ""}</p>
              </label>
              <label>
                <input
                  placeholder="Teléfono"
                  type="tel"
                  name="phone"
                  value={registerData.phone}
                  onChange={handleRegisterData}
                />
                <p>{errors.phone ? errors.phone : ""}</p>
              </label>
              <label>
                <input
                  placeholder="DNI"
                  type="number"
                  name="dni"
                  value={registerData.dni}
                  onChange={handleRegisterData}
                />
                <p>{errors.dni ? errors.dni : ""}</p>
              </label>
              <label>
                <input
                  placeholder="Contraseña"
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterData}
                />
                <ul>
                  {errors.password.length
                    ? errors.password.map((err, index) => (
                        <li key={index}>{err}</li>
                      ))
                    : ""}
                </ul>
              </label>
              <label>
                <input
                  placeholder="Confirmar contraseña"
                  type="password"
                  name="confirmPass"
                  value={registerData.confirmPass}
                  onChange={handleRegisterData}
                />
                <p>{errors.confirmPass ? errors.confirmPass : ""}</p>
              </label>
              {loading ? (
                loader
              ) : (
                <button
                  type={
                    Object.keys(errors).length < 3 &&
                    !errors.incomplete &&
                    !errors.password.length
                      ? "submit"
                      : "button"
                  }
                  className={
                    Object.keys(errors).length < 3 &&
                    !errors.incomplete &&
                    !errors.password.length
                      ? "accessButton"
                      : "accessButtonBlock"
                  }
                >
                  Registarme
                </button>
              )}
            </form>
            <div className="textBtns">
              <p onClick={() => setMenuType("login")}>
                ¿Ya tienes una cuenta? Iniciar Sesión
              </p>
            </div>
              
            <div className="landingBottom">
            </div>
            {showMessage}
          </div>
        ) : (
          ""
        )
      }
      <img
                src="logo-muebles.png"
                alt="logo"
                className="logoMueblesLanding"
              ></img>
      <div className="landingBottom">
              <p>dskskdskdskdksdksdksdksdksksdksdksdksdk</p>
              <p>dskskdskdskdksdksdksdksdksksdksdksdksdk</p>
              <p>dskskdskdskdksdksdksdksdksksdksdksdksdk</p>
              <p>dskskdskdskdksdksdksdksdksksdksdksdksdk</p>
              <p>dskskdskdskdksdksdksdksdksksdksdksdksdk</p>
              <p>dskskdskdskdksdksdksdksdksksdksdksdksdk</p>
              <p>dskskdskdskdksdksdksdksdksksdksdksdksdk</p>
            </div>
    </div>
  );
}
