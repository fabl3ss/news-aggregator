import React, { useState } from "react";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

import { useAuth } from "../../../auth-context/auth.context";
import { FluidInput, Button } from "../sign-in";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../../api/auth";
import "./sign-up.scss";

export default function SignUp() {
  let navigate = useNavigate();
  const { setUser } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);
  const [buttonText, setButtonText] = useState("Sign up");

  setUser(null);

  const register = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (name === "") {
      return setError("You should enter your name.");
    }
    if (username === "") {
      return setError("You should enter username.");
    }
    if (password === "") {
      return setError("You should enter a password.");
    }
    try {
      setButtonText("Signing up");
      await AuthApi.Register({
        name,
        username,
        password,
      })
        .then((response) => {
          if (response.data && response.data.success === false) {
            setButtonText("Sign up");
            return setError(response.data);
          }
        })
        .catch((response) => {
          setButtonText("Sign up");
          return setError(response.data);
        });
      return navigate("/sign-in", { replace: true });
    } catch (err) {
      setButtonText("Sign up");
      if (err) {
        return setError("Something went wrong :(");
      }
      return setError("There has been an error.");
    }
  };

  const style = {
    margin: "15px 0",
  };

  return (
    <div className="login-container">
      <Box mt="-3ch" mb="3ch">
        <div className="title">Sign up</div>
      </Box>
      <FluidInput
        type="text"
        label="name"
        id="name"
        style={style}
        handleChange={(e) => setName(e.target.value)}
      />
      <FluidInput
        type="text"
        label="username"
        id="name"
        style={style}
        handleChange={(e) => setUsername(e.target.value)}
      />
      <FluidInput
        type="password"
        label="password"
        id="password"
        style={style}
        handleChange={(e) => setPassword(e.target.value)}
      />
      <h6
        style={{
          fontSize: ".8em",
          color: "#B00020",
          textAlign: "center",
          fontWeight: 400,
          transition: ".2s all",
        }}
      >
        {error}
      </h6>
      <Button
        buttonText={buttonText}
        buttonClass="login-button"
        onClick={register}
      />
      <Box display="flex" mt="-3ch" mb="1ch">
        <p style={{ fontSize: "0.9rem", opacity: "0.9" }}>
          Have an account? &nbsp;
        </p>
        <Link
          underline="none"
          component="button"
          variant="body2"
          onClick={() => {
            navigate("/sign-in");
          }}
        >
          Sign in
        </Link>
      </Box>
    </div>
  );
}
