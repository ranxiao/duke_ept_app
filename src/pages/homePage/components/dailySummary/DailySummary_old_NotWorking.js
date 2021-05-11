import { IconButton, Tooltip } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import CustomCard from "../../../../components/customStyles/CustomCard";
import { AuthContext } from "../../../../context/AuthContext";
import {
  formattedDay,
  getFirstDayOfWeek,
} from "../../../../lib/getFirstDayOfWeek";
import httpClient from "../../../../lib/httpClient";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";

export default function DailySummary({ theme }) {
  const [yourData, setYourData] = useState([]);

  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState();

  const [showMonthlyView, setShowMonthlyView] = useState(false);

  // const [summary, setSummary] = useState();
  const [activities, setActivities] = useState([]);
  // const [days, setDays] = useState();
  // const [alreadyShifted, setAlreadyShifted] = useState(false);

  useEffect(() => {
    getData();
  }, [showMonthlyView]);

  function cumSum(a) {
    let result = [a[0]];

    for (let i = 1; i < a.length; i++) {
      result[i] = result[i - 1] + a[i];
    }

    return result;
  }

  useEffect(() => {
    // console.log("activities: ", activities);

    let tempActivities = [];

    activities?.map((activity) => {
      tempActivities.push([activity.date, activity.mET]);
    });

    console.log("tempActivities : ", tempActivities);
  }, [activities]);

  // new Date(date.getFullYear(), date.getMonth(), 1)
  const getData = () => {
    setLoading(true);
    // const date = new Date();

    httpClient()
      .post("/activities/summary", {
        userId: authContext.user?.id || authContext.user?._id,
        // startDay: getFirstDayOfWeek().toLocaleDateString(),
        startDay: showMonthlyView ? "0" : formattedDay(getFirstDayOfWeek()),
        showMonthlyView: showMonthlyView,
      })
      .then((res) => {
        // console.log("DailySummary :,", showMonthlyView, res.data);
        // setSummary(res.data);

        // setActivities(res.data?.activities);
        setActivities(res.data);

        // {
        //   showMonthlyView === true && setDays(res.data?.days);
        // }

        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR from DailySummary : ", err.message);
        //   setSummary(null);
      });
  };

  const getDaysInMonth = (month, year) => {
    let today = new Date();

    return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  };

  // console.log(getDaysInMonth());

  const [getWeekDays, setGetWeekDays] = useState([
    "Day 1",
    "Day 2",
    "Day 3",
    "Day 4",
    "Day 5",
    "Day 6",
    "Day 7",
  ]);
  const [getMonthDays, setGetMonthDays] = useState([]);

  useEffect(() => {
    // if(!loading) {

    // console.log("yourData : ", yourData);
    // setGetMonthDays()
    if (showMonthlyView === true && getMonthDays.length === 0) {
      // let daysCount = getDaysInMonth();
      let daysCount = 30;
      for (let i = 0; i < daysCount; i++) {
        // console.log(i + 1);
        setGetMonthDays((oldArray) => [...oldArray, `Day ${i + 1}`]);
      }
    }
    // }
  }, [showMonthlyView]);

  return (
    <CustomCard
      label="Daily Summary"
      bodyPadding={20}
      headerStyle={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      subHeader={
        <div>
          <Tooltip title={showMonthlyView ? "Weekly View" : "Monthly View"}>
            <IconButton
              style={{
                backgroundColor: "rgba(0,0,0,.05)",
                height: 40,
                width: 40,
              }}
              onClick={() => {
                // getData();
                setShowMonthlyView((e) => !e);
              }}
            >
              <AssignmentRoundedIcon
                style={{
                  fontSize: 20,
                  color: showMonthlyView ? theme.buttonColor : theme.textColor2,
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
      }
    >
      <div
        style={{
          width: "100%",
          height: "275px",
        }}
      >
        {/* <button onClick={() => getData()}>LOAD</button> */}
        {/* <Chart data={data} axes={axes} series={series} tooltip /> */}
        <Line
          data={{
            // labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            labels: showMonthlyView ? getMonthDays : getWeekDays,
            datasets: [
              {
                label: "Workout Summary",
                data: yourData,
                backgroundColor: "#00509D44",
                borderColor: theme.buttonColor,
              },
            ],
          }}
          height="100%"
          width="100%"
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // beginAtZero: true,
                    max:
                      Math.ceil((yourData[yourData.length - 1] + 30) / 10) * 10,
                    // min: 0,
                    stepSize: 10,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </CustomCard>
  );
}
