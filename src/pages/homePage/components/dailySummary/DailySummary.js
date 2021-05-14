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

  const [summary, setSummary] = useState();
  const [activities, setActivities] = useState([]);
  const [days, setDays] = useState();
  const [alreadyShifted, setAlreadyShifted] = useState(false);

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
    console.log("activities: ", activities);
    const result = activities?.reduce((acc, d) => {
      const found = acc.find((a) => a.dayId === d.dayId);
      //const value = { name: d.name, val: d.value };
      const value = d.mET; // the element in data property
      // const value = acc.reduce((acc, cur) => acc + cur.mET, 0)
      if (!found) {
        //acc.push(...value);
        acc.push({ dayId: d.dayId, data: [value] }); // not found, so need to add data property
      } else {
        //acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] });
        found.data.push(value); // if found, that means data property exists, so just push new element to found.data.
      }
      return acc;
    }, []);

    let newSortedData = [];
    let sortedData = result;

    // newSortedData = sortedData.reduce((acc, cur) => acc + cur.data, 0)
    sortedData?.map((sd, index) => {
      newSortedData.push(sd.data.reduce((acc, cur) => acc + cur, 0));
    });

    // console.log(
    //   " ==========>>>>>",
    //
    // );

    let prevDayyCount = parseInt(
      (summary?.days && summary?.days[0]?.date?.substring(3, 5)) || 0
    );

    // unshift
    let newNewSortedData = newSortedData.slice(
      Math.max(newSortedData.length - 30, 0)
    );

    // if (newNewSortedData.length < 30) {
    //   for (let i = 0; i < 30; i++) {
    //     newNewSortedData.push(0);
    //   }
    //   // setAlreadyShifted(true);
    // }
    setYourData(cumSum(newNewSortedData));

    console.log(
      "newNewSortedData: ",
      { prevDayyCount },
      summary,
      summary?.days,
      newNewSortedData
    );
  }, [activities]);

  // new Date(date.getFullYear(), date.getMonth(), 1)
  const getData = () => {
    setLoading(true);
    // const date = new Date();
    const dateForCurrentMonth = new Date();
    const currentMonthCount = new Date(
      dateForCurrentMonth.getFullYear(),
      dateForCurrentMonth.getMonth(),
      1
    ).getMonth();

    let currentMonthCountString;

    if (currentMonthCount < 10) {
      currentMonthCountString = "0" + (currentMonthCount + 1);
    } else {
      currentMonthCountString = currentMonthCount + 1;
    }

    httpClient()
      .post("/activities/summary", {
        userId: authContext.user?.id || authContext.user?._id,
        // startDay: getFirstDayOfWeek().toLocaleDateString(),
        startDay: showMonthlyView ? "0" : formattedDay(getFirstDayOfWeek()),
        showMonthlyView: showMonthlyView,
      })
      .then((res) => {
        console.log("DailySummary :,", showMonthlyView, res.data);
        setSummary(res.data);

        // setActivities(res.data?.activities);
        setActivities(res.data);

        {
          showMonthlyView === true && setDays(res.data?.days);
        }

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

  console.log(getDaysInMonth());

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
      label="Excise Tracking"
      bodyPadding={20}
      headerStyle={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      subHeader={
        <div>
          <Tooltip title={showMonthlyView ? "Monthly View" : "Weekly View"}>
            <IconButton
              style={{
                backgroundColor: "rgba(0,0,0,.05)",
                height: 40,
                width: 40,
              }}
              onClick={() => {
                getData();
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
                label: "Cumulative Effort (measured in MET)",
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
