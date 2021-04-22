import { Switch, Route, Redirect } from "react-router-dom";

import Header from "../components/header/Header";

// Home / Dashboard
import DashboardPage from "../pages/dashboardPage/DashboardPage";
import UsersPage from "../pages/usersPage/UsersPage";

import PageNotFound from "../components/pageNotFound/PageNotFound";
import AdminSidebar from "../components/adminSidebar/AdminSidebar";
import AddUserPage from "../pages/addUserPage/AddUserPage";

import { useLocation } from "react-router-dom";
import PatientContextProvider from "../context/PatientContext";

export default function MainNavagation() {
  const location = useLocation();
  return (
    <>
      <PatientContextProvider>
        <div style={{ display: "flex", height: "100%" }}>
          {!location.pathname.includes("project") && <AdminSidebar />}
          <Switch>
            <Route exact path="/" component={DashboardPage} />
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/users/add" component={AddUserPage} />

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
        </div>
      </PatientContextProvider>
    </>
  );
}
