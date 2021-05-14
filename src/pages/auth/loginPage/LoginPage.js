import "./LoginPage.css";

import { useContext, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { SnackbarContext } from "../../../context/SnackbarContext";

import CustomButton from "../../../components/customStyles/CustomButton";

// import backgroudArt from "../../assets/loginPage/backgroud_art.svg";
import logo from "../../../assets/logo.png";
import httpClient from "../../../lib/httpClient";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const authContext = useContext(AuthContext);
  const snackbarContext = useContext(SnackbarContext);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.enableDarkMode
    ? themeContext.dark
    : themeContext.light;

  const [loading, setLoading] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async (e) => {
    e && e.preventDefault();

    if (email.length < 2 || password.length < 2) {
      snackbarContext.Message("Invalid email or password", "info");
      return;
    }
    setLoading(true);

    const obj = {
      email: email,
      password: password,
    };

    httpClient()
      .post("/auth/login", obj)
      .then((res) => {
        if (res.data.accessToken) {
          console.log(res.data.accessToken);
          SaveUserData(res.data);
          setLoading(false);
          snackbarContext.Message(
            `Welcome back, ${res.data.fullName}`,
            "success"
          );
        } else {
          snackbarContext.Message(res.data.error, "error");
          setLoading(false);
        }
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

          <div style={{ margin: "20px 0px" }}>
            <p
              style={{
                color: theme.textColor2,
                textAlign: "center",
                fontWeight: 500,
                fontSize: ".85rem",
              }}
            >
              Welcome to the EPT website, an online exercise planning and
              tracking (EPT) tool designed to promote physical activities. <br />
              <br />
              Start to leverage the EPT tool as easy as one-two-three: <br />
              Step 1: Every Monday morning, go to "Activity Planning" page to plan the daily exercise for every day in the current weekly cycle (Monday-Sunday)<br />
              Step 2: Everyday, go to "Home" page to complete scheduled activities for the day and track your exercise progress.<br />
              Step 3: Every Sunday, go to "Symptom Log" page to input your perceived symptoms averaged across the past week. <br />
              <br />
              Please refer to the EPT user manual for more help information, and contact the study coordinator if you have any questions.<br />
            </p>
          </div>

          <div className="InputField">
            <input
              type="userName"
              autoComplete="true"
              className="Input"
              style={{
                backgroundColor: "#E8F0FF",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username"
            />
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
            label="Login"
            onClick={handleLogin}
            loading={loading}
          />

          {/* <Link
            to="/signup"
            style={{
              color: theme.textColor2,
              textDecoration: "none",
              marginTop: 20,
            }}
          >
            <h5>
              Don't have an account?{" "}
              <span style={{ color: theme.buttonColor }}>Signup</span>
            </h5>
          </Link> */}
        </form>
      </div>
    </div>
  );
}
