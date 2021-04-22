import React, { useContext, useState } from "react";
import CustomCard from "../../../../components/customStyles/CustomCard";
import "./ExercisePlan.css";

import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { Divider, IconButton } from "@material-ui/core";
import Activities from "../../../../data/activities";
import Categories from "../../../../data/categories";
import CustomButton from "../../../../components/customStyles/CustomButton";
import WarningDialog from "../../../../components/warningDialog/WarningDialog";
import {
  getFirstDayOfWeek,
  endOfWeek,
  formattedDay,
} from "../../../../lib/getFirstDayOfWeek";
import { SnackbarContext } from "../../../../context/SnackbarContext";

export default function ExercisePlan({
  theme,
  addActivity,
  loadingActivity,

  sundayActivities,
  mondayActivities,
  tuesdayActivities,
  wednesdayActivities,
  thursdayActivities,
  fridayActivities,
  saturdayActivities,
  removeActivity,

  sundayActivitiesTemp,
  mondayActivitiesTemp,
  tuesdayActivitiesTemp,
  wednesdayActivitiesTemp,
  thursdayActivitiesTemp,
  fridayActivitiesTemp,
  saturdayActivitiesTemp,
}) {
  const snackbarContext = useContext(SnackbarContext);

  const activities = Activities;
  const categories = Categories;
  const days = [
    {
      id: 0,
      name: "Monday",
      tamp: mondayActivitiesTemp,
      value: mondayActivities,
    },
    {
      id: 1,
      name: "Tuesday",
      tamp: tuesdayActivitiesTemp,
      value: tuesdayActivities,
    },
    {
      id: 2,
      name: "Wednesday",
      tamp: wednesdayActivitiesTemp,
      value: wednesdayActivities,
    },
    {
      id: 3,
      name: "Thursday",
      tamp: thursdayActivitiesTemp,
      value: thursdayActivities,
    },
    {
      id: 4,
      name: "Friday",
      tamp: fridayActivitiesTemp,
      value: fridayActivities,
    },
    {
      id: 5,
      name: "Saturday",
      tamp: saturdayActivitiesTemp,
      value: saturdayActivities,
    },
    {
      id: 6,
      name: "Sunday",
      tamp: sundayActivitiesTemp,
      value: sundayActivities,
    },
  ];

  console.log("DAYS : ", days);

  const [showWorningDialog, setShowWorningDialog] = useState(false);
  // useEffect(() => {
  //   console.log(days);
  // }, [days]);
  //

  const handleActionButton = () => {
    if (
      sundayActivities.length === 0 &&
      mondayActivities.length === 0 &&
      tuesdayActivities.length === 0 &&
      wednesdayActivities.length === 0 &&
      thursdayActivities.length === 0 &&
      fridayActivities.length === 0 &&
      saturdayActivities.length === 0
    ) {
      snackbarContext.Message("You dont have any activities selectd.", "info");
      setShowWorningDialog(false);
    } else {
      setShowWorningDialog(true);
    }
  };

  return (
    <CustomCard
      height="auto"
      label="Exercise Plan"
      // bodyPadding={20}
      headerStyle={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      subHeader={
        <CustomButton
          borderRadius={25}
          width={100}
          label="Save"
          onClick={() => handleActionButton()}
          loading={loadingActivity}
        />
      }
    >
      <h5
        style={{
          color: theme.textColor3,
          fontSize: 14,
          fontWeight: 500,
          paddingLeft: 20,
        }}
      >
        {"( " +
          formattedDay(getFirstDayOfWeek()) +
          " - " +
          formattedDay(endOfWeek(getFirstDayOfWeek())) +
          " )"}
      </h5>

      <div className="ExercisePlan" style={{ padding: 20 }}>
        {days.map((day) => (
          <div
            key={day.id}
            className="Day"
            style={{
              // marginBottom: index !== days.length - 1 && 25,
              marginBottom: 10,
            }}
          >
            <div className="Name">
              <p style={{ color: theme.textColor2 }}>{day.name}</p>
            </div>

            {day.tamp?.length > 0 &&
              day.tamp?.map((vlu, index) => (
                <div
                  key={index}
                  className="Data"
                  style={{
                    // marginBottom: index !== day.tamp.length - 1 && 20,
                    marginBottom: 20,
                  }}
                >
                  <p style={{ color: theme.textColor2 }}>
                    {" "}
                    <span style={{ fontWeight: 600, color: theme.textColor }}>
                      {categories[vlu?.categoryId - 1]?.value + " - "}
                    </span>{" "}
                    <span>
                      {/* {`${activities[vlu?.activityId - 1]?.activity} - ${
                        activities[vlu?.activityId - 1]?.parameterExample
                      } `} */}
                      {activities?.map((activity) => {
                        if (activity.id === vlu.activityId) {
                          return `${activity.activity} - e.g. ${activity.parameterExample}`;
                        }
                      })}
                    </span>
                  </p>
                </div>
              ))}
            {day.value.length > 0 ? (
              day.value.map((vlu, index) => (
                <div
                  key={index}
                  className="Data"
                  style={{
                    marginBottom: index !== day.value.length - 1 && 20,
                  }}
                >
                  <p style={{ color: theme.textColor2 }}>
                    {" "}
                    <span style={{ fontWeight: 600, color: theme.textColor }}>
                      {categories[vlu?.categoryId - 1]?.value + " - "}
                    </span>{" "}
                    {`${vlu?.activity} - e.g. ${vlu?.parameterExample}`}
                  </p>
                  <IconButton
                    style={{
                      padding: 0,
                      margin: 0,
                      // marginTop: 10,
                      height: 30,
                      width: 30,
                    }}
                    onClick={() => {
                      removeActivity(day.name, vlu);
                    }}
                  >
                    <CloseRoundedIcon
                      style={{ color: theme.buttonColor, fontSize: "1.25rem" }}
                    />
                  </IconButton>
                </div>
              ))
            ) : (
              <div />
              // <div
              //   className="Data"
              //   style={{
              //     backgroundColor: "rgba(0,0,0,.05)",
              //     justifyContent: "center",
              //   }}
              // >
              //   <p style={{ color: theme.textColor2, opacity: 0.75 }}>N/A</p>
              // </div>
            )}
          </div>
        ))}
        <CustomButton
          borderRadius={25}
          marginTop={40}
          width={"100%"}
          label="Save"
          onClick={() => handleActionButton()}
          loading={loadingActivity}
        />
      </div>

      <WarningDialog
        theme={theme}
        open={showWorningDialog}
        setOpen={setShowWorningDialog}
        message="Add Activity?"
        description="Are you sure you want to add activities?"
        onClick={() => {
          addActivity();
          setShowWorningDialog(false);
        }}
        loading={loadingActivity}
      />
    </CustomCard>
  );
}
