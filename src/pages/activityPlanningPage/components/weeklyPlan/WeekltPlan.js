import { IconButton } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";

import "./WeekltPlan.css";

import CustomCard from "../../../../components/customStyles/CustomCard";

import convartDataToSelect from "../../../../lib/convartDataToSelect";
import difficulties from "../../../../data/difficulties";
import categories from "../../../../data/categories";
import activities from "../../../../data/activities";
import CustomButton from "../../../../components/customStyles/CustomButton";
import { SnackbarContext } from "../../../../context/SnackbarContext";

// SUPER, ADMIN, MENTOR, MENTEE
const convartActivityDataToSelect = (data, label) => {
  if (!data) return [];

  let tempD = [];
  data?.map((d) => {
    tempD.push({ value: d, label: `${d.activity} - ${d.parameterExample}` });
  });

  return tempD;
};

export default function WeekltPlan({
  theme,
  setSundayActivities,
  setMondayActivities,
  setTuesdayActivities,
  setWednesdayActivities,
  setThursdayActivities,
  setFridayActivities,
  setSaturdayActivities,
}) {
  const snackbarContext = useContext(SnackbarContext);

  const [selectedDifficulty, setSelectedDifficulty] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedActivity, setSelectedActivity] = useState();

  const [sunday, setSunday] = useState(false);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);

  const sortedActivities = () => {
    let data;

    if (selectedDifficulty?.value && selectedCategory?.value) {
      data = activities.filter(
        (obj) =>
          obj.categoryId == selectedCategory.value.id &&
          obj.difficultyId == selectedDifficulty.value.id
      );
    } else {
      data = [];
    }

    // console.log(data);
    return data;
  };

  const handleAddWeek = () => {
    // if (!selectedWeeks.includes(week)) {
    //   setSelectedWeeks((oldArray) => [...oldArray, week]);
    // } else {
    //   setSelectedWeeks(selectedWeeks.filter((e) => e !== week));
    // }

    if (selectedActivity?.label && selectedDifficulty && selectedCategory) {
      if (
        sunday === true ||
        monday === true ||
        tuesday === true ||
        wednesday === true ||
        thursday === true ||
        friday === true ||
        saturday === true
      ) {
        try {
          if (sunday) {
            setSundayActivities((oldArray) => [
              ...oldArray,
              selectedActivity.value,
            ]);
          }
          if (monday) {
            setMondayActivities((oldArray) => [
              ...oldArray,
              selectedActivity.value,
            ]);
          }
          if (tuesday) {
            setTuesdayActivities((oldArray) => [
              ...oldArray,
              selectedActivity.value,
            ]);
          }
          if (wednesday) {
            setWednesdayActivities((oldArray) => [
              ...oldArray,
              selectedActivity.value,
            ]);
          }
          if (thursday) {
            setThursdayActivities((oldArray) => [
              ...oldArray,
              selectedActivity.value,
            ]);
          }
          if (friday) {
            setFridayActivities((oldArray) => [
              ...oldArray,
              selectedActivity.value,
            ]);
          }
          if (saturday) {
            setSaturdayActivities((oldArray) => [
              ...oldArray,
              selectedActivity.value,
            ]);
          }

          setSunday(null);
          setMonday(null);
          setTuesday(null);
          setWednesday(null);
          setThursday(null);
          setFriday(null);
          setSaturday(null);

          setSelectedDifficulty([]);
          setSelectedCategory([]);
          setSelectedActivity([]);
        } catch (error) {
          console.log("WeeklyPlan: ", error);
        }
      } else {
        snackbarContext.Message("Please at least select one day.", "info");
      }
    } else {
      snackbarContext.Message("Please Select a Activity", "info");
    }
  };

  // console.table(activities);

  return (
    <div>
      <CustomCard
        label="Define your weekly plan here "
        bodyPadding={20}
        height="auto"
      >
        <div className="WeekltPlan">
          <div className="TopSection">
            <div className="Selector">
              <p style={{ color: theme.textColor3 }}>Difficulty Level</p>
              <Select
                value={selectedDifficulty}
                options={convartDataToSelect(difficulties, true)}
                menuPortalTarget={document.querySelector("body")}
                onChange={(e) => {
                  setSelectedDifficulty(e);
                  setSelectedActivity([]);
                }}
              />
            </div>
            <div className="Selector">
              <p style={{ color: theme.textColor3 }}>Category</p>
              <Select
                value={selectedCategory}
                options={convartDataToSelect(categories)}
                menuPortalTarget={document.querySelector("body")}
                onChange={(e) => {
                  setSelectedCategory(e);
                  setSelectedActivity([]);
                }}
              />
            </div>
            <div className="Selector">
              <p style={{ color: theme.textColor3 }}>Activity</p>
              <Select
                value={selectedActivity}
                options={convartActivityDataToSelect(sortedActivities())}
                menuPortalTarget={document.querySelector("body")}
                onChange={(e) => setSelectedActivity(e)}
              />
            </div>
          </div>

          <div className="BottomSection">
            <h3
              style={{
                color: theme.textColor2,
                fontSize: "1.17em",
                fontWeight: 600,
              }}
            >
              Day Selector ( Multiple Choices )
            </h3>

            <div className="WeekButtons">
              <IconButton
                className="WeekButton"
                onClick={() => setMonday((e) => !e)}
                style={{
                  backgroundColor: monday && theme.buttonColor,
                  color: monday && theme.buttonTextColor,
                }}
              >
                M
              </IconButton>

              <IconButton
                className="WeekButton"
                onClick={() => setTuesday((e) => !e)}
                style={{
                  backgroundColor: tuesday && theme.buttonColor,
                  color: tuesday && theme.buttonTextColor,
                }}
              >
                T
              </IconButton>

              <IconButton
                className="WeekButton"
                onClick={() => setWednesday((e) => !e)}
                style={{
                  backgroundColor: wednesday && theme.buttonColor,
                  color: wednesday && theme.buttonTextColor,
                }}
              >
                W
              </IconButton>

              <IconButton
                className="WeekButton"
                onClick={() => setThursday((e) => !e)}
                style={{
                  backgroundColor: thursday && theme.buttonColor,
                  color: thursday && theme.buttonTextColor,
                }}
              >
                T
              </IconButton>
              <IconButton
                className="WeekButton"
                onClick={() => setFriday((e) => !e)}
                style={{
                  backgroundColor: friday && theme.buttonColor,
                  color: friday && theme.buttonTextColor,
                }}
              >
                F
              </IconButton>
              <IconButton
                className="WeekButton"
                onClick={() => setSaturday((e) => !e)}
                style={{
                  backgroundColor: saturday && theme.buttonColor,
                  color: saturday && theme.buttonTextColor,
                }}
              >
                S
              </IconButton>
              <IconButton
                className="WeekButton"
                onClick={() => setSunday((e) => !e)}
                style={{
                  backgroundColor: sunday && theme.buttonColor,
                  color: sunday && theme.buttonTextColor,
                }}
              >
                S
              </IconButton>
            </div>
          </div>

          <CustomButton
            label="Add"
            width="100%"
            backgroundColor={theme.buttonColor}
            borderRadius={25}
            marginTop={25}
            onClick={() => handleAddWeek()}
          />
        </div>
      </CustomCard>
    </div>
  );
}
