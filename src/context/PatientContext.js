import React, { createContext, useState, useEffect } from "react";

export const PatientContext = createContext();

export const PatientContextProvider = (props) => {
  const [selectedUserId, setSelectedUserId] = useState();
  const [selectedWeekId, setSelectedWeekId] = useState();
  const [selectedWeek, setSelectedWeekItem] = useState();

  //   useEffect(() => {
  //     setSelectedWeekId();
  //   }, [selectedUserId]);

  const setSelectedWeek = (userId, weekId, week) => {
    setSelectedUserId(userId);
    setSelectedWeekId(weekId);
    setSelectedWeekItem(week);
  };

  return (
    <PatientContext.Provider
      value={{
        selectedUserId,
        selectedWeekId,
        selectedWeek,
        setSelectedWeek,
      }}
    >
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;
