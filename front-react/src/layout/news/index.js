import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";

import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import ParserApi from "../../api/parser";
import { useAuth } from "../../auth-context/auth.context";

import "./index.css";

function Alert(props) {
  return <div className="alertMessage">{props.alertText}</div>;
}

function News() {
  const navigate = useNavigate();
  const [kwords, setKwords] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [state, setState] = useState({
    infoWindows: Array(9).fill("infoWindowNest"),
    content: Array(9).fill("null"),
    alertText: "",
    submitAt: "",
    getText: "",
    parserText: "",
  });
  const { user } = useAuth();
  if (!user || !user.token || user.token === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      confirmButtonColor: "#a0a0a0",
    }).then(() => {
      navigate("/sign-in");
      localStorage.removeItem("user");
    });
  } else if (jwt_decode(user.token).exp < Date.now() / 1000) {
    localStorage.removeItem("user");
    return navigate("/sign-in");
  }

  const handleClear = (i) => {
    const infoWindowsCopy = state.infoWindows.slice();
    const content = state.content.slice();

    infoWindowsCopy[i] = "infoWindowNest";
    content[i] = "";

    for (let j = i + 1; j < 9; j++) {
      if (infoWindowsCopy[j] === "infoWindowNestBusy") {
        infoWindowsCopy[j - 1] = "infoWindowNestBusy";
        content[j - 1] = content[j];

        infoWindowsCopy[j] = "infoWindowNest";
        content[j] = "";
      }
    }
    setState({ infoWindows: infoWindowsCopy, content: content });
  };

  const InfoWindow = (props) => {
    const [open, setOpen] = useState(false);
    if (props.content && props.content !== "null") {
      const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 550,
        bgcolor: "background.paper",
        border: "1px solid #000",
        boxShadow: 24,
        borderRadius: "15px",
        p: 4,
      };

      let first15 = props.content.split(" ").slice(0, 15).join(" ");
      return (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {props.content}
                </Typography>
              </Box>
            </Fade>
          </Modal>
          <div className="infoWindowBusy">
            <Grid container xl={6}>
              <Box height="15ch">
                <p>{first15}...</p>
              </Box>
              <Box ml="1ch" display="flex">
                <Box width="7ch">
                  <Link
                    underline="none"
                    component="button"
                    variant="body2"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Read full
                  </Link>
                </Box>

                <Box mt="-0.5ch" ml="10ch">
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      handleClear(props.index);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </div>
        </div>
      );
    }
    return <></>;
  };

  const handleSubmit = async () => {
    const data = {
      kwords: kwords.split(" "),
      language: language,
      category: category,
      country: "",
    };

    await ParserApi.ProcessNews(data).then((response) => {
      const infoWindowsCopy = state.infoWindows.slice();
      let i = 0;
      while (true) {
        if (infoWindowsCopy[i] === "infoWindowNest") {
          infoWindowsCopy[i] = "infoWindowNestBusy";
          break;
        }
        if (i === 8) {
          setState({ alertText: "Limit on parallel feeds is exceeded" });
          break;
        }
        i++;
      }
      const newContent = state.content.slice();
      newContent[i] = response.data.response;
      setState({
        content: newContent,
        parserText: response.data,
        infoWindows: infoWindowsCopy,
      });
    });
  };

  const renderInfoWindow = (i) => {
    return (
      <InfoWindow
        busy={state.infoWindows[i]}
        content={state.content[i]}
        index={i}
      />
    );
  };

  return (
    <div>
      <Grid container justifyContent="center" mt="2ch">
        <Grid container justifyContent="flex-end">
          <Box mt="-1ch" mr="1ch">
            <Button
              variant="text"
              onClick={() => navigate("/log-out")}
              startIcon={<LogoutIcon />}
              style={{
                color: "#c7c7c7",
              }}
            >
              Log out
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box width="100vw">
            <Box margin="auto">
              <div
                className="form-content"
                style={{ margin: "auto", width: "30ch" }}
              >
                <input
                  type="text"
                  id="kwords"
                  name="kwords"
                  placeholder="Keywords"
                  required
                  onChange={(e) => setKwords(e.target.value)}
                />
                <div className="valid-feedback">Please enter keywords!</div>
                <div className="invalid-feedback">KeyWords was entered!</div>
                <div className="col-md-12">
                  <select
                    defaultValue="default"
                    className="form-select mt-3"
                    id="language"
                    name="language"
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option disabled value="default">
                      Language
                    </option>
                    <option value="ar">Arabic</option>
                    <option value="zh">Chinese</option>
                    <option value="en">English</option>
                    <option value="it">Italian</option>
                    <option value="pl">Polish</option>
                    <option value="ru">Russian</option>
                    <option value="uk">Ukrainian</option>
                  </select>
                </div>
                <div className="col-md-12">
                  <select
                    defaultValue="default"
                    className="form-select mt-3"
                    id="category"
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option disabled value="default">
                      Category
                    </option>
                    <option value="business">Business</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="environment">Environment</option>
                    <option value="food">Food</option>
                    <option value="health">Health</option>
                    <option value="politics">Politics</option>
                    <option value="science">Science</option>
                    <option value="sports">Sports</option>
                    <option value="technology">Technology</option>
                    <option value="top">Top</option>
                    <option value="world">World</option>
                  </select>
                </div>
                <div className="form-button mt-3">
                  <button
                    id="submit"
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Add News
                  </button>
                </div>
              </div>
            </Box>
          </Box>
        </Grid>

        <div className="alert">
          <Alert alertText={state.alertText} />
        </div>
        <Box width="100vw" mt="-2ch" mb="2ch">
          <div className="frame" style={{ margin: "auto" }}>
            <div className="frameRow">
              <div className={state.infoWindows[0]}>{renderInfoWindow(0)}</div>
              <div className={state.infoWindows[1]}>{renderInfoWindow(1)}</div>
              <div className={state.infoWindows[2]}>{renderInfoWindow(2)}</div>
            </div>
            <div className="frameRow">
              <div className={state.infoWindows[3]}>{renderInfoWindow(3)}</div>
              <div className={state.infoWindows[4]}>{renderInfoWindow(4)}</div>
              <div className={state.infoWindows[5]}>{renderInfoWindow(5)}</div>
            </div>
            <div className="frameRow">
              <div className={state.infoWindows[6]}>{renderInfoWindow(6)}</div>
              <div className={state.infoWindows[7]}>{renderInfoWindow(7)}</div>
              <div className={state.infoWindows[8]}>{renderInfoWindow(8)}</div>
            </div>
          </div>
        </Box>
      </Grid>
    </div>
  );
}

export default News;
