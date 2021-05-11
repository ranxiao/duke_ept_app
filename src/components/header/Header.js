import "./Header.css";
import logo from "../../assets/logo.svg";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HeaderButton from "./components/HeaderButton";
import httpClient from "../../lib/httpClient";
import {
  endOfWeek,
  formattedDay,
  getFirstDayOfWeek,
} from "../../lib/getFirstDayOfWeek";
import { Alert } from "@material-ui/lab";
import { Button } from "@material-ui/core";

export default function Header() {
  const authContext = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.enableDarkMode
    ? themeContext.dark
    : themeContext.light;

  const [loading, setLoading] = useState();
  // const [showBadge, setShowBadge] = useState();

  useEffect(() => {
    checkSymptomWeek();
    checkActivityPlanningWeek();
  }, []);

  const checkSymptomWeek = async () => {
    setLoading(true);
    console.log("checkWeek");
    await httpClient()
      .post(`/symptoms/checkWeek`, {
        userId: authContext.user?.id || authContext.user?._id,
        startDay: formattedDay(getFirstDayOfWeek()),
      })
      .then((res) => {
        if (!res.data.length > 0) {
          console.log("BIG TRUE");
          if (
            formattedDay(endOfWeek(getFirstDayOfWeek())) ===
            formattedDay(new Date())
          ) {
            authContext.setShowSymptomBadge(true);
          }
        }

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(" ========= >>>>>> checkSymptomWeek : CATCh", err);
      });
  };

  const checkActivityPlanningWeek = async () => {
    setLoading(true);
    console.log("checkWeek");
    await httpClient()
      .post(`/activities/checkWeek`, {
        userId: authContext.user?.id || authContext.user?._id,
        startDay: formattedDay(getFirstDayOfWeek()),
      })
      .then((res) => {
        if (!res.data.length > 0) {
          console.log("BIG TRUE : showActivityPlanningBadge : ", res.data);
          if (formattedDay(getFirstDayOfWeek()) === formattedDay(new Date())) {
            authContext.setShowActivityPlanningBadge(true);
          }
        }

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(" ========= >>>>>> ActivityPlanning : CATCh", err);
        if (formattedDay(getFirstDayOfWeek()) === formattedDay(new Date())) {
          authContext.setShowActivityPlanningBadge(true);
        }
      });
  };

  return (
    <>
      <div className="HeaderContainer" style={{ height: 60 }}>
        <div className="Header">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div
              className="Icon"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: theme.textColor,
              }}
            >
              <img src={logo} alt="Logo" />
              <h2 style={{ marginLeft: 10, fontWeight: 500 }}>DukeHealth</h2>
            </div>
          </Link>

          <div className="HeaderButtons">
            <HeaderButton to="/" label="Home" theme={theme} />
            <HeaderButton
              to="/activityPlanning"
              label="Activity Planning"
              theme={theme}
              showBadge={authContext.showActivityPlanningBadge}
              onClick={() => {
                authContext.setShowActivityPlanningBadge(false);
              }}
            />

            <HeaderButton
              to="/symptomLog"
              label="Symptom Log"
              theme={theme}
              showBadge={authContext.showSymptomBadge}
              onClick={() => {
                authContext.setShowSymptomBadge(false);
              }}
            />

            <HeaderButton
              to="#"
              label="Logout"
              theme={theme}
              onClick={() => authContext.Logout()}
            />
          </div>
        </div>
      </div>

      {authContext.showSymptomBadge && (
        <Alert
          style={{
            disply: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          severity="info"
          // action={
          // }
        >
          Hey, Don't forget to add your symptom log.
          <Link
            to="/symptomLog"
            style={{ textDecoration: "none", color: theme.buttonColor }}
          >
            <Button
              color="inherit"
              size="small"
              style={{ marginLeft: 20, textTransform: "none" }}
              onClick={() => {
                authContext.setShowSymptomBadge(false);
              }}
            >
              Symptom Log
            </Button>
          </Link>
        </Alert>
      )}

      {authContext.showActivityPlanningBadge && (
        <Alert
          style={{
            disply: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          severity="info"
          // action={
          // }
        >
          Don't forget to plan for the week.
          <Link
            to="/activityPlanning"
            style={{ textDecoration: "none", color: theme.buttonColor }}
          >
            <Button
              color="inherit"
              size="small"
              style={{ marginLeft: 20, textTransform: "none" }}
              onClick={() => {
                authContext.setShowActivityPlanningBadge(false);
              }}
            >
              Activity Planning
            </Button>
          </Link>
        </Alert>
      )}
    </>
  );
}
