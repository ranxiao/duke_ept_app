import "./SignupPage.css";

import { useContext, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { SnackbarContext } from "../../../context/SnackbarContext";

import CustomButton from "../../../components/customStyles/CustomButton";

// import backgroudArt from "../../assets/loginPage/backgroud_art.svg";
import logo from "../../../assets/logo.png";
import httpClient from "../../../lib/httpClient";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

export default function SignupPage() {
  const authContext = useContext(AuthContext);
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
      snackbarContext.Message("Invalid email or password", "info");
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
            `Account Created succesfully, ${fullName || email}. Please Login!`,
            "success"
          );
          history.push("/");
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

  const SaveUserData = async (res) => {
    try {
      await localStorage.setItem("accessToken", res.accessToken);
      await localStorage.setItem("id", res.id);
      await localStorage.setItem("user", JSON.stringify(res));
      authContext.ToggleAuth();
    } catch (error) {
      alert("Error Saving Data.");
      setLoading(false);
    }
  };

  return (
    <div className="LoginPageContainer">
      <div className="LoginPage">
        <form className="Form" onSubmit={handleLogin}>
          <img className="Logo" src={logo} alt="Logo" />

          <div className="InputField">
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
            <input
              type="email"
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
            borderRadius={25}
            height={45}
            label="Signup"
            onClick={handleLogin}
            loading={loading}
          />

          <Link
            to="/login"
            style={{
              color: theme.textColor2,
              textDecoration: "none",
              marginTop: 20,
            }}
          >
            <h5>
              Already have an account?{" "}
              <span style={{ color: theme.buttonColor }}>Login</span>
            </h5>
          </Link>
        </form>
      </div>
    </div>
  );
}
