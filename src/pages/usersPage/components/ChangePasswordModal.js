import React, { useContext, useState } from "react";
import "./ChangePasswordModal.css";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogContent } from "@material-ui/core";
import CustomInput from "../../../components/customStyles/CustomInput/CustomInput";
import CustomButton from "../../../components/customStyles/CustomButton";
import { SnackbarContext } from "../../../context/SnackbarContext";
import { AuthContext } from "../../../context/AuthContext";
import httpClient from "../../../lib/httpClient";

export default function ChangePasswordModal(props) {
  const authContext = useContext(AuthContext);
  const snackbarContext = useContext(SnackbarContext);

  const { open, onClose, theme, user } = props;

  const [loading, setLoading] = useState();

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const chanagePassword = async () => {
    if (password === confirmPassword) {
      setLoading(true);
      await httpClient()
        .post(`/user/changePassword`, {
          userId: user?.id || user?._id,
          password: password,
        })
        .then(({ data }) => {
          setLoading(false);
          snackbarContext.Message("Password changed successfully.", "success");
          onClose(false);
        })
        .catch((err) => {
          console.log("ERROR from ChangePasswordModal : ", err.message);
          snackbarContext.Message(err.message, "error");

          setLoading(false);
        });
    } else {
      snackbarContext.Message("Passwords do not match.", "error");
    }
    // console.log("Password");
  };

  return (
    <Dialog
      onClose={() => onClose(false)}
      open={open}
      className="ChangePasswordModal"
    >
      <DialogTitle
        id="simple-dialog-title"
        className="ChangePasswordModal-Header"
        style={{
          color: theme.textColor,
          backgroundColor: theme.backgroundColor,
        }}
      >
        Change Password
      </DialogTitle>

      <DialogContent
        className="ChangePasswordModal-Body"
        style={{ backgroundColor: theme.ui }}
      >
        <p style={{ color: theme.textColor }}>
          Do you want to chnage password for{" "}
          <span style={{ fontWeight: 600 }}>"{user?.fullName}"</span>.
        </p>
        <p style={{ color: theme.textColor2 }}>{user?.email}</p>

        <CustomInput
          type="password"
          label="Password : "
          placeholder="******"
          autoComplete={true}
          value={password}
          setValue={setPassword}
          required
          theme={theme}
          margin="20px 0px 20px 0px"
        />

        <CustomInput
          type="password"
          label="Confirm Password : "
          placeholder="******"
          autoComplete={true}
          value={confirmPassword}
          setValue={setConfirmPassword}
          required
          theme={theme}
          margin="20px 0px 20px 0px"
        />
      </DialogContent>

      <DialogActions style={{ padding: "0px 20px 20px 20px" }}>
        <CustomButton
          label="Chanage Password"
          borderRadius={5}
          width="100%"
          loading={loading}
          onClick={() => chanagePassword()}
        />
      </DialogActions>
    </Dialog>
  );
}
