import { useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import AdminNavigation from "./routes/AdminNavigation";
import UserNavigation from "./routes/UserNavigation";
import RootNavigation from "./routes/RootNavigation";

import Loading from "./components/loading/Loading";

export default function Routes() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, role } = authContext;

  const OnAuthStateChanged = async () => {
    authContext.ToggleAuth();
  };
  useEffect(OnAuthStateChanged, []);

  // useEffect(() => {
  //   authContext.ToggleAuth();
  // }, []);

  // const isAuthenticated = true;
  // const loading = false;
  // const role = "asd";

  // super => Dashboard, Journeys, Rubrics, Users, Company, Settings, logout
  if (
    (loading === false && isAuthenticated !== undefined) ||
    isAuthenticated !== null
  ) {
    if (isAuthenticated === true) {
      return role === "ADMIN" ? <AdminNavigation /> : <UserNavigation />;
    } else {
      return <RootNavigation />;
    }
  } else {
    return <Loading fullSize={true} />;
  }
}
