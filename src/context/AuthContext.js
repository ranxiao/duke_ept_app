import React, { createContext, useState } from "react";

// import Axios from 'axios'

import Loading from "../components/loading/Loading";

import httpClient from "../lib/httpClient";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const [userId, setUserId] = useState();
  const [role, setRole] = useState();
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [showSymptomBadge, setShowSymptomBadge] = useState();
  const [showActivityPlanningBadge, setShowActivityPlanningBadge] = useState();

  const history = useHistory();

  const ToggleAuth = async () => {
    setIsLoading(true);
    if (
      (await localStorage.getItem("accessToken")) &&
      (await localStorage.getItem("id"))
    ) {
      const _id = await localStorage.getItem("id");

      httpClient()
        .get(`/user/${_id}`)
        .then(({data}) => {
          console.log("Data from ToggleAuth", data);
          SaveUserData(data);
          setIsAuthenticated(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("ERROR from ToggleAuth : ", err.message);
          Logout();
        });

      setIsLoading(false);
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
      return false;
    }
    setIsLoading(false);
  };

  const SaveUserData = async (data) => {
    setUser(data);
    setRole(data?.role);
    setUserId(data?.id || data?._id);

    // setUserId(JSON.parse(await localStorage.getItem("id")));
    setToken(await localStorage.getItem("accessToken"));
  };

  const Logout = async () => {
    setIsLoading(true);

    await localStorage.clear();
    setIsAuthenticated(false);

    setIsLoading(false);
    // window.location = "/";
    history.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        userId,
        role,
        token,
        ToggleAuth,
        SaveUserData,
        Logout,
        showSymptomBadge,
        setShowSymptomBadge,
        showActivityPlanningBadge,
        setShowActivityPlanningBadge,
      }}
    >
      {isLoading === true && <Loading />}
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;

export default AuthContextProvider;
