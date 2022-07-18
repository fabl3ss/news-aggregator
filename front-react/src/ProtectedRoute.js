import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth-context/auth.context";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";

export const ProtectedRoute = ({ ...rest }) => {
  let { user } = useAuth();

  if (!user || !user.token || user.token === "") {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="">Why do I have this issue?</a>',
    });
  }
  if (jwt_decode(user.token).exp < Date.now() / 1000) {
    localStorage.removeItem("user");
    return <Navigate to="sign-in" />;
  }

  return <Route {...rest} />;
};
