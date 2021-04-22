import { useLocation } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "../components/header/Header";
// import Footer from "../components/footer/Footer";

import HomeScreen from "../pages/homePage/HomePage";
import ActivityPlanningPage from "../pages/activityPlanningPage/ActivityPlanningPage";

import PageNotFound from "../components/pageNotFound/PageNotFound";
import SymptomLogPage from "../pages/symptomLogPage/SymptomLogPage";
import UserSidebar from "../components/userSidebar/UserSidebar";

export default function MainNavagation() {
  const location = useLocation();
  console.log("location : ", location.pathname.includes("project"));
  return (
    <>
      <div style={{ display: "flex", height: "100%" }}>
        <UserSidebar />
        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <Header />
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route
              exact
              path="/activityPlanning"
              component={ActivityPlanningPage}
            />
            <Route exact path="/symptomLog" component={SymptomLogPage} />

            {/* //Redirects */}
            <Route exact path="/login">
              <Redirect to="/" />
            </Route>
            <Route exact path="/signup">
              <Redirect to="/" />
            </Route>
            <Route exact path="/forgotPassword">
              <Redirect to="/" />
            </Route>
            <Route component={PageNotFound} />
            <Redirect to="/404" />
          </Switch>
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}
