// import React, { useContext, useState } from "react";
import "./WarningDialog.css";

import { Button, Dialog, DialogActions } from "@material-ui/core";

import CustomButton from "../customStyles/CustomButton";

import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";

export default function FeatureRequests({
  open,
  setOpen,
  message,
  description,

  primaryButton,
  secondaryButton,
  theme,
  onClick,
  loading,
}) {
  //   const [message, setMessage] = useState("");
  //   const [description, setDescription] = useState("");

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <div className="WarningDialog">
        <div className="WarningDialog-Header">
          <h1 style={{ color: theme.textColor2, marginLeft: 0 }}>{message}</h1>
        </div>

        <div className="WarningDialog-Body">
          <h4
            style={{
              color: theme.textColor3,
              fontSize: "1rem",
              fontWeight: 500,
              // marginTop: 15,
              marginBottom: 15,
            }}
          >
            {description}
          </h4>
        </div>
      </div>

      <DialogActions
        className="WarningDialog-Action"
        style={{ margin: "0px 10px 10px 0px" }}
      >
        <div className="Buttons">
          <Button
            variant="text"
            // className="ExitButton"
            onClick={() => setOpen(false)}
            style={{
              color: theme.textColor2,
              fontWeight: 600,
              marginRight: 15,
              paddingLeft: 10,
              paddingRight: 10,
            }}
            size="small"
          >
            {secondaryButton || "Cancel"}
          </Button>

          <CustomButton
            loading={loading}
            onClick={onClick}
            label={primaryButton || "Save"}
            width={150}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
}
