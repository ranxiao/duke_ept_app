import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Auth
import LoginPage from "../pages/auth/loginPage/LoginPage";
// import SignupPage from "../pages/auth/signupPage/SignupPage";

//Error Page
import PageNotFound from "../components/pageNotFound/PageNotFound";

export default function RootNavigation() {
  return (
    <Switch>
      {/* <Route exact path="/signup" component={SignupPage} /> */}
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" component={LoginPage} />
      {/* <Route exact path="/test" component={ProfilePage} /> */}

      <Route component={PageNotFound} />
      <Redirect to="/login" />
    </Switch>
  );
}
