import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId = "99007043570-iuu55f8hkpg3qcil543v3v9b1cbjii2v.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
      <App />
      </Provider>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
