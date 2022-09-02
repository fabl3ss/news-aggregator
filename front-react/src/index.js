import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth-context/auth.context";

let user = JSON.parse(localStorage.getItem("user"));

ReactDOM.render(
  <AuthProvider userData={user}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
