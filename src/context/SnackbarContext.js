import React, { createContext, useState } from "react";

import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

export const SnackbarContext = createContext();

export const SnackbarContextProvider = (props) => {
  const [showNotification, setShowNotification] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("success" || "error" || "info");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowNotification(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const Message = (msg, type) => {
    setMsg(msg);
    setType(type);
    setShowNotification(true);
  };

  return (
    <SnackbarContext.Provider
      value={{
        message: setMsg,
        showNotification: setShowNotification,
        msg: setMsg,
        type: setType,
        Message,
      }}
    >
      {props.children}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={showNotification}
        autoHideDuration={5000}
        onClose={handleClose}
        // message={msg}
      >
        <Alert onClose={handleClose} severity={type}>
          {msg}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
