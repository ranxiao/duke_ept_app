import { Skeleton } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import CustomCard from "../../components/customStyles/CustomCard";
import CustomPage from "../../components/customStyles/CustomPage";
import Loading from "../../components/loading/Loading";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { SnackbarContext } from "../../context/SnackbarContext";
import {
  formattedDay,
  getDayOfWeek,
  getFirstDayOfWeek,
} from "../../lib/getFirstDayOfWeek";
import httpClient from "../../lib/httpClient";
import "./ActivityPlanningPage.css";
import ExercisePlan from "./components/exercisePlan/ExercisePlan";
import WeekltPlan from "./components/weeklyPlan/WeekltPlan";
import { useHistory } from "react-router-dom";

export default function ActivityPlanningPage() {
  const authContext = useContext(AuthContext);
  const snackbarContext = useContext(SnackbarContext);

  const themeContext = useContext(ThemeContext);
  const theme = themeContext.enableDarkMode
    ? themeContext.dark
    : themeContext.light;

  const [loadingStatusCheck, setLoadingStatusCheck] = useState(false);

  const [statusCheck, setStatusCheck] = useState();
  // const [curWeekData, setCurWeekData] = useState();
  const history = useHistory();

  useEffect(() => {
    checkWeek();
  }, []);

  const checkWeek = () => {
    setLoadingStatusCheck(true);
    httpClient()
      .post(`/activities/checkWeek`, {
        userId: authContext.user?.id || authContext.user?._id,
        // startDay: getFirstDayOfWeek().toLocaleDateString(),
        startDay: formattedDay(getFirstDayOfWeek()),
      })
      .then((res) => {
        console.log(
          "YOLO: ",
          {
            userId: authContext.user?.id || authContext.user?._id,
            startDay: formattedDay(getFirstDayOfWeek()),
            data: res.data?.length > 0,
          },
          res.data
        );
        if (res.data?.id) {
          console.log("YOLO: Life is true");
          // setCurWeekData(res.data);
          // setStatusCheck(true);
          setStatusCheck(true);
          getAllActivity(res.data?.id);
        } else {
          setStatusCheck(false);
        }
        setLoadingStatusCheck(false);
      })
      .catch((err) => {
        setStatusCheck(false);
        setLoadingStatusCheck(false);
      });
  };

  const [sundayActivities, setSundayActivities] = useState([]);
  const [mondayActivities, setMondayActivities] = useState([]);
  const [tuesdayActivities, setTuesdayActivities] = useState([]);
  const [wednesdayActivities, setWednesdayActivities] = useState([]);
  const [thursdayActivities, setThursdayActivities] = useState([]);
  const [fridayActivities, setFridayActivities] = useState([]);
  const [saturdayActivities, setSaturdayActivities] = useState([]);

  const [sundayActivitiesTemp, setSundayActivitiesTemp] = useState();
  const [mondayActivitiesTemp, setMondayActivitiesTemp] = useState();
  const [tuesdayActivitiesTemp, setTuesdayActivitiesTemp] = useState();
  const [wednesdayActivitiesTemp, setWednesdayActivitiesTemp] = useState();
  const [thursdayActivitiesTemp, setThursdayActivitiesTemp] = useState();
  const [fridayActivitiesTemp, setFridayActivitiesTemp] = useState();
  const [saturdayActivitiesTemp, setSaturdayActivitiesTemp] = useState();

  const removeActivity = (dayName, item) => {
    if (dayName === "Sunday") {
      setSundayActivities(sundayActivities.filter((e) => e !== item));
    } else if (dayName === "Monday") {
      setMondayActivities(mondayActivities.filter((e) => e !== item));
    } else if (dayName === "Tuesday") {
      setTuesdayActivities(tuesdayActivities.filter((e) => e !== item));
    } else if (dayName === "Wednesday") {
      setWednesdayActivities(wednesdayActivities.filter((e) => e !== item));
    } else if (dayName === "Thursday") {
      setThursdayActivities(thursdayActivities.filter((e) => e !== item));
    } else if (dayName === "Friday") {
      setFridayActivities(fridayActivities.filter((e) => e !== item));
    } else if (dayName === "Saturday") {
      setSaturdayActivities(saturdayActivities.filter((e) => e !== item));
    }
    // setSelectedWeeks(selectedWeeks.filter((e) => e !== week));
  };

  const actionButton = () => {
    statusCheck ? addMoreActivity() : addActivity();
  };

  // IF statusCheck === FALSE
  const [loadingActivity, setLoadingActivity] = useState();
  const addActivity = () => {
    if (
      sundayActivities.length === 0 &&
      mondayActivities.length === 0 &&
      tuesdayActivities.length === 0 &&
      wednesdayActivities.length === 0 &&
      thursdayActivities.length === 0 &&
      fridayActivities.length === 0 &&
      saturdayActivities.length === 0
    ) {
      snackbarContext.Message("Please select your exercise plan", "info");
      setLoadingActivity(false);
    } else {
      setLoadingActivity(true);
      console.log(getFirstDayOfWeek());

      console.log("FINAL UPLOAD : ", {
        userId: authContext.user?.id || authContext.user?._id,
        // startDay: getFirstDayOfWeek().toLocaleDateString(),
        startDay: formattedDay(getFirstDayOfWeek()),
        rowStartDay: getFirstDayOfWeek(),

        sundayActivities: sundayActivities,
        mondayActivities: mondayActivities,
        tuesdayActivities: tuesdayActivities,
        wednesdayActivities: wednesdayActivities,
        thursdayActivities: thursdayActivities,
        fridayActivities: fridayActivities,
        saturdayActivities: saturdayActivities,
      });
      httpClient()
        .post(`/activities/add`, {
          userId: authContext.user?.id || authContext.user?._id,
          // startDay: getFirstDayOfWeek().toLocaleDateString(),
          startDay: formattedDay(getFirstDayOfWeek()),
          rowStartDay: getFirstDayOfWeek(),

          sundayActivities: sundayActivities,
          mondayActivities: mondayActivities,
          tuesdayActivities: tuesdayActivities,
          wednesdayActivities: wednesdayActivities,
          thursdayActivities: thursdayActivities,
          fridayActivities: fridayActivities,
          saturdayActivities: saturdayActivities,
        })
        .then(({ data }) => {
          console.log("Add Activity", data);
          snackbarContext.Message("Activities added successfully", "success");
          checkWeek();
          history.push("/");

          setLoadingActivity(false);
        })
        .catch((err) => {
          console.log("ERROR from ToggleAuth : ", err.message);
          setLoadingActivity(false);
        });
    }
  };
  // END OF IF statusCheck === FALSE

  // IF statusCheck === TRUE
  const [sundayId, setSundayId] = useState();
  const [mondayId, setMondayId] = useState();
  const [tuesdayId, setTuesdayId] = useState();
  const [wednesdayId, setWednesdayId] = useState();
  const [thursdayId, setThursdayId] = useState();
  const [fridayId, setFridayId] = useState();
  const [saturdayId, setSaturdayId] = useState();

  const getAllActivity = async (curWeekDataId) => {
    console.log("DAAAAA: getAllActivity", curWeekDataId);

    await httpClient()
      .post(`/activities/getActivityDays`, {
        userId: authContext.user?.id || authContext.user?._id,
        weekId: curWeekDataId,
      })
      .then(({ data }) => {
        data.map(async (day) => {
          await httpClient()
            .post(`/activities/get`, {
              userId: authContext.user?.id || authContext.user?._id,
              date: day.date,
            })
            .then((res) => {
              console.log("DAAAAA: ", res.data.dateName, res.data);
              if (res.data?.dateName === "Sunday") {
                setSundayActivitiesTemp(res.data?.activities);
                setSundayId(res.data?.id);
              } else if (res.data?.dateName === "Monday") {
                setMondayActivitiesTemp(res.data?.activities);
                setMondayId(res.data?.id);
              } else if (res.data?.dateName === "Tuesday") {
                setTuesdayActivitiesTemp(res.data?.activities);
                setTuesdayId(res.data?.id);
              } else if (res.data?.dateName === "Wednesday") {
                setWednesdayActivitiesTemp(res.data?.activities);
                setWednesdayId(res.data?.id);
              } else if (res.data?.dateName === "Thursday") {
                setThursdayActivitiesTemp(res.data?.activities);
                setThursdayId(res.data?.id);
              } else if (res.data?.dateName === "Friday") {
                setFridayActivitiesTemp(res.data?.activities);
                setFridayId(res.data?.id);
              } else if (res.data?.dateName === "Saturday") {
                setSaturdayActivitiesTemp(res.data?.activities);
                setSaturdayId(res.data?.id);
              }
            })
            .catch((err) => console.log(err));
        });

        setLoadingActivity(false);
      })
      .catch((err) => {
        console.log("ERROR from ToggleAuth : ", err.message);
        setLoadingActivity(false);
      });
  };

  // const [loadingAddMoreActivity, setLoadingAddMoreActivity] = useState();
  const addMoreActivity = () => {
    if (
      sundayActivities.length === 0 &&
      mondayActivities.length === 0 &&
      tuesdayActivities.length === 0 &&
      wednesdayActivities.length === 0 &&
      thursdayActivities.length === 0 &&
      fridayActivities.length === 0 &&
      saturdayActivities.length === 0
    ) {
      snackbarContext.Message("Please select your exercise plan", "info");
      setLoadingActivity(false);
    } else {
      setLoadingActivity(true);
      httpClient()
        .post(`/activities/addMore`, {
          userId: authContext.user?.id || authContext.user?._id,

          sundayId: sundayId,
          mondayId: mondayId,
          tuesdayId: tuesdayId,
          wednesdayId: wednesdayId,
          thursdayId: thursdayId,
          fridayId: fridayId,
          saturdayId: saturdayId,

          sundayActivities: sundayActivities,
          mondayActivities: mondayActivities,
          tuesdayActivities: tuesdayActivities,
          wednesdayActivities: wednesdayActivities,
          thursdayActivities: thursdayActivities,
          fridayActivities: fridayActivities,
          saturdayActivities: saturdayActivities,
        })
        .then((res) => {
          setLoadingActivity(false);
          snackbarContext.Message(
            "New activities added successfully",
            "success"
          );
          console.log("ActivityPlanningPage- addMoreActivity : ", res.data);
        })
        .catch((err) => {
          setLoadingActivity(false);
          console.log("ActivityPlanningPage- addMoreActivity : ", err);
        });
    }
  };

  // END OF IF statusCheck === TRUE

  return loadingStatusCheck ? (
    <CustomPage backgroundColor={theme.backgroundColor}>
      <div
        className="ActivityPlanningPage"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        <Skeleton
          variant="rect"
          width={"100%"}
          height={"88vh"}
          style={{ borderRadius: 10 }}
        />
        <Skeleton
          variant="rect"
          width={"100%"}
          height={"88vh"}
          style={{ borderRadius: 10 }}
        />
      </div>
    </CustomPage>
  ) : (
    <CustomPage backgroundColor={theme.backgroundColor}>
      {/* {statusCheck === false ? ( */}
      <div className="ActivityPlanningPage">
        <WeekltPlan
          theme={theme}
          setSundayActivities={setSundayActivities}
          setMondayActivities={setMondayActivities}
          setTuesdayActivities={setTuesdayActivities}
          setWednesdayActivities={setWednesdayActivities}
          setThursdayActivities={setThursdayActivities}
          setFridayActivities={setFridayActivities}
          setSaturdayActivities={setSaturdayActivities}
        />

        <ExercisePlan
          theme={theme}
          addActivity={actionButton}
          sundayActivities={sundayActivities}
          mondayActivities={mondayActivities}
          tuesdayActivities={tuesdayActivities}
          wednesdayActivities={wednesdayActivities}
          thursdayActivities={thursdayActivities}
          fridayActivities={fridayActivities}
          saturdayActivities={saturdayActivities}
          removeActivity={removeActivity}
          loadingActivity={loadingActivity}
          sundayActivitiesTemp={sundayActivitiesTemp}
          mondayActivitiesTemp={mondayActivitiesTemp}
          tuesdayActivitiesTemp={tuesdayActivitiesTemp}
          wednesdayActivitiesTemp={wednesdayActivitiesTemp}
          thursdayActivitiesTemp={thursdayActivitiesTemp}
          fridayActivitiesTemp={fridayActivitiesTemp}
          saturdayActivitiesTemp={saturdayActivitiesTemp}
        />
      </div>
      {/* // ) : (
      //   <div>
      //     <CustomCard
      //       height="auto"
      //       // label="Exercise Plan - Week #1"
      //       bodyPadding="0px 20px 20px 20px"
      //       height={500}
      //     >
      //       <div
      //         style={{
      //           height: 460,
      //           display: "flex",
      //           justifyContent: "center",
      //           alignItems: "center",
      //         }}
      //       >
      //         <p>
      //           You already have set workouts for this week. Please come back
      //           again next week to add new workouts.
      //         </p>
      //       </div>
      //     </CustomCard>
      //   </div>
      // )} */}
    </CustomPage>
  );
}
