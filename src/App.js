import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

import ThemeContextProvider from "./context/ThemeContext";
import AuthContextProvider from "./context/AuthContext";
import SnackbarContextProvider from "./context/SnackbarContext";

import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./context/ThemeContext";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <ThemeContextProvider>
          <AuthContextProvider>
            <SnackbarContextProvider>
              <Routes />
            </SnackbarContextProvider>
          </AuthContextProvider>
        </ThemeContextProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
