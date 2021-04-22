import { useContext } from "react";
import "./DashboardPage.css";

import CustomPage from "../../components/customStyles/CustomPage";
import NoUser from "../../assets/dashboard/noUser.svg";
import ExcercisePlanning from "./components/excercisePlanning/ExcercisePlanning";
import Symptoms from "./components/symptoms/Symptoms";
import { ThemeContext } from "../../context/ThemeContext";
import { PatientContext } from "../../context/PatientContext";

export default function DashboardPage() {
  const patientContext = useContext(PatientContext);

  const themeContext = useContext(ThemeContext);
  const theme = themeContext.enableDarkMode
    ? themeContext.dark
    : themeContext.light;

  // const selectedUser = true;

  if (patientContext.selectedWeekId) {
    return (
      <CustomPage backgroundColor={theme.backgroundColor}>
        <div className="DashboardPage">
          <ExcercisePlanning theme={theme} />
          <Symptoms theme={theme} />
        </div>
      </CustomPage>
    );
  } else {
    return (
      <CustomPage backgroundColor={theme.backgroundColor}>
        <div
          style={{
            // backgroundColor: "red",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={NoUser} alt="No User" />

          <h2 style={{ color: "#B8B8B8", fontWeight: 500 }}>
            Select a patient to see analytics
          </h2>
        </div>
      </CustomPage>
    );
  }
}
