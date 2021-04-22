import { useContext, useEffect, useState } from "react";
import "./AddUserPage.css";

import { Link, useHistory } from "react-router-dom";
import httpClient from "../../lib/httpClient";

import { SnackbarContext } from "../../context/SnackbarContext";
import { ThemeContext } from "../../context/ThemeContext";

import CustomPage from "../../components/customStyles/CustomPage";
import CustomCard from "../../components/customStyles/CustomCard";

import {
  Avatar,
  ButtonBase,
  IconButton,
  Card,
  CardContent,
  List,
  ListItem,
  Grow,
  Button,
  ListItemSecondaryAction,
  Tooltip,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CustomButton from "../../components/customStyles/CustomButton";

const ListItemWithWiderSecondaryAction = withStyles({
  secondaryAction: {
    paddingRight: 96,
  },
})(ListItem);

export default function AddUserPage() {
  // const patientContext = useContext(PatientContext);

  const snackbarContext = useContext(SnackbarContext);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.enableDarkMode
    ? themeContext.dark
    : themeContext.light;

  const [loading, setLoading] = useState();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleLogin = async (e) => {
    e && e.preventDefault();

    if (role.length < 2) {
      snackbarContext.Message("Select your Role", "info");
      return;
    }

    if (fullName.length < 2) {
      snackbarContext.Message("Invalid Full Name", "info");
      return;
    }

    if (email.length < 2 || password.length < 2) {
      snackbarContext.Message("Invalid username or password", "info");
      return;
    }
    setLoading(true);

    const obj = {
      fullName: fullName,
      email: email,
      role: role,
      password: password,
    };

    httpClient()
      .post("/auth/signup", obj)
      .then((res) => {
        if (res.data.error) {
          snackbarContext.Message(res.data.error, "error");
        } else {
          snackbarContext.Message(
            `Account Created succesfully, ${fullName || email}.`,
            "success"
          );
          history.push("/users");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR : ", err.message);
        snackbarContext.Message(err.message, "error");
        // snackbarContext.Message("Invalid email or password", "error");
        setLoading(false);
      });
  };

  return (
    <CustomPage backgroundColor={theme.backgroundColor}>
      <div className="UsersPage">
        <CustomCard height="auto" label="Add User" bodyPadding={20}>
          <form className="Form" onSubmit={handleLogin}>
            <div className="InputField">
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  padding: "0px 0px 5px 0px",
                  color: theme.textColor2,
                }}
              >
                Full Name:
              </p>
              <input
                type="userName"
                autoComplete="true"
                className="Input"
                style={{
                  backgroundColor: "#E8F0FF",
                }}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
              />
            </div>

            <div className="InputField">
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  padding: "0px 0px 5px 0px",
                  color: theme.textColor2,
                }}
              >
                Username / Email:
              </p>
              <input
                // type="email"
                autoComplete="true"
                className="Input"
                style={{
                  backgroundColor: "#E8F0FF",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            <p
              style={{
                fontWeight: 600,
                fontSize: "0.85rem",
                padding: "0px 0px 5px 0px",
                color: theme.textColor2,
              }}
            >
              Role:
            </p>

            <div
              className="InputField"
              style={{
                height: 45,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  margin: 0,
                  height: "100%",
                  width: "calc(50% - 10px)",
                  borderRadius: 10,
                  backgroundColor:
                    role === "ADMIN" ? theme.buttonColor : "#E8F0FF",
                  color:
                    role === "ADMIN" ? theme.buttonTextColor : theme.textColor,
                  textTransform: "none",
                }}
                onClick={() => setRole("ADMIN")}
              >
                Admin
              </Button>
              <Button
                style={{
                  margin: 0,
                  height: "100%",
                  width: "calc(50% - 10px)",
                  borderRadius: 10,
                  backgroundColor:
                    role === "USER" ? theme.buttonColor : "#E8F0FF",
                  color:
                    role === "USER" ? theme.buttonTextColor : theme.textColor,
                  textTransform: "none",
                }}
                onClick={() => setRole("USER")}
              >
                User
              </Button>
            </div>

            <div className="InputField">
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  padding: "0px 0px 5px 0px",
                  color: theme.textColor2,
                }}
              >
                Password:
              </p>
              <input
                type="password"
                autoComplete="true"
                className="Input"
                style={{
                  backgroundColor: "#E8F0FF",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            <CustomButton
              type="submit"
              width="100%"
              borderRadius={10}
              height={45}
              label="Add User"
              onClick={handleLogin}
              loading={loading}
            />
          </form>
        </CustomCard>
      </div>
    </CustomPage>
  );
}
