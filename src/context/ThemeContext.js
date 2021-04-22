import React, { useState, createContext } from "react";

import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

export const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
  const [noLayout, setNoLayout] = useState(false);
  const [enableDarkMode, setEnableDarkMode] = useState(false);
  const light = {
    textColor: "#222222",
    textColor2: "#444444",
    textColor3: "#646464",
    textColor4: "#fff",

    buttonColor: "#00509D",

    buttonTextColor: "#fff",

    ui: "#ffffff",
    backgroundColor: "#F5F5F5",

    name: "light",
  };

  const dark = {
    textColor: "#ececec",
    textColor2: "#c0c0c0",
    textColor3: "#d0d0d0",
    textColor4: "#a0a0a0",

    buttonColor: "#00509D",

    buttonTextColor: "#fff",

    ui: "#30475e",

    backgroundColor: "#222831",
    backgroundColor2: "#000",

    name: "dark",
  };

  const ToggleDarkMode = () => {
    setEnableDarkMode(!enableDarkMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        enableDarkMode,
        light,
        dark,
        ToggleDarkMode,
        noLayout,
        setNoLayout,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

// A custom theme for this app
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00509D",
    },
    secondary: {
      main: "#52BA55",
    },
    tertiary: {
      main: "#FFB1B1",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});
