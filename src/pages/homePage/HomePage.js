import "./HomePage.css";

import React, { useContext } from "react";
import CustomPage from "../../components/customStyles/CustomPage";
import { ThemeContext } from "../../context/ThemeContext";

import DailyExcise from "./components/dailyExcise/DailyExcise";
import DailySummary from "./components/dailySummary/DailySummary";

export default function HomePage() {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.enableDarkMode
    ? themeContext.dark
    : themeContext.light;

  return (
    <CustomPage backgroundColor={theme.backgroundColor}>
      <div className="HomePage">
        <DailyExcise theme={theme} />
        <DailySummary theme={theme} />
      </div>
    </CustomPage>
  );
}
