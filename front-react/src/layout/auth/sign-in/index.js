import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import jwt_decode from "jwt-decode";
import "./login.scss";

import { useAuth } from "../../../auth-context/auth.context";
import AuthApi from "../../../api/auth";

export class FluidInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }
  focusField() {
    const { focused } = this.state;
    this.setState({
      focused: !focused,
    });
  }

  render() {
    const { type, label, style, id } = this.props;
    const { focused, value } = this.state;

    let inputClass = "fluid-input";
    if (focused) {
      inputClass += " fluid-input--focus";
    } else if (value !== "") {
      inputClass += " fluid-input--open";
    }

    return (
      <div className={inputClass} style={style}>
        <div className="fluid-input-holder">
          <input
            className="fluid-input-input"
            type={type}
            id={id}
            onFocus={this.focusField.bind(this)}
            onBlur={this.focusField.bind(this)}
            onChange={this.props.handleChange}
            autoComplete="off"
          />
          <label className="fluid-input-label" forhtml={id}>
            {label}
          </label>
        </div>
      </div>
    );
  }
}

export class Button extends React.Component {
  render() {
    return (
      <div
        className={`button ${this.props.buttonClass}`}
        onClick={this.props.onClick}
      >
        {this.props.buttonText}
      </div>
    );
  }
}

export default function SignIn() {
  let navigate = useNavigate();

  const { user } = useAuth();
  const { setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);
  const [buttonText, setButtonText] = useState("Log in");

  const login = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (user && user.token) {
      return navigate("/news");
    }
    if (username === "") {
      return setError("You should enter your username.");
    }
    if (password === "") {
      return setError("You should enter your password");
    }
    setButtonText("Signing in");
    try {
      let response = await AuthApi.Login({
        username,
        password,
      });
      if (response.data && response.data.success === false) {
        return setError(response.data.msg);
      }
      return setProfile(response);
    } catch (err) {
      if (err.response) {
        return setError(err.response.data.msg);
      }
      return setError("There has been an error.");
    }
  };

  const setProfile = async (response) => {
    let user = { ...response.data.user };
    user.token = response.data.token;
    user = JSON.stringify(user);
    setUser(user);
    localStorage.setItem("user", user);
    return navigate("/news");
  };

  const style = { margin: "15px 0"};
  return (
    <div>
      {user && jwt_decode(user.token).exp > Date.now() / 1000 ? (
        <div className="login-container">
          <h3 style={{paddingTop: "2ch"}}>You are already signed in.</h3>
              <Box width="30ch" ml="6ch" mr="-6ch" mb={1}>
                <Button
                  buttonText={`Let's go`}
                  buttonClass="login-button"
                  onClick={login}
                ></Button>
              </Box>
        </div>
      ) : (
        <div className="login-container">
          <Box mt="-3ch" mb="3ch">
            <div className="title">Log in</div>
          </Box>
          <FluidInput
            type="text"
            label="username"
            id="username"
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
            onClick={login}
          />
          <Box display="flex" mt="-3ch" mb="1ch">
            <p style={{ fontSize: "0.9rem", opacity: "0.9" }}>
              Don't have an account? &nbsp;
            </p>
            <Link
              underline="none"
              component="button"
              variant="body2"
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              Sign up
            </Link>
          </Box>
        </div>
      )}
    </div>
  );
}
