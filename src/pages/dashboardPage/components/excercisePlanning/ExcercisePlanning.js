import { Skeleton } from "@material-ui/lab";
import { useContext, useState, useEffect } from "react";
import CustomButton from "../../../../components/customStyles/CustomButton";
import CustomCard from "../../../../components/customStyles/CustomCard";
import { PatientContext } from "../../../../context/PatientContext";

import {
  endOfWeek,
  formattedDay,
  getFirstDayOfWeek,
} from "../../../../lib/getFirstDayOfWeek";
import httpClient from "../../../../lib/httpClient";
import "./ExcercisePlanning.css";
import ExcercisePlanningItem from "./ExcercisePlanningItem";

export default function ExcercisePlanning({ theme }) {
  const patientContext = useContext(PatientContext);

  const [loading, setLoading] = useState();
  const [days, setDays] = useState([]);

  useEffect(() => {
    getData(patientContext.selectedUserId, patientContext.selectedWeekId);
  }, [patientContext.selectedWeekId]);

  // let getDayData;
  const getData = (userId, weekId) => {
    setLoading(true);
    httpClient()
      .get(`/admin/users/${userId}/weekId/${weekId}`)
      .then((res) => {
        setDays(res.data);
        // console.log("ExcercisePlanning : Days Data : ", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR from AdminSidebar : ", err);
        setDays([]);
        setLoading(false);
      });
  };

  // return <CustomCard label="Excercise Planning" bodyPadding={20}></CustomCard>;
  return (
    <CustomCard
      height="auto"
      label={`Exercise Plan - ${
        patientContext.selectedWeek?.startDay || "Loading..."
      }`}
      // bodyPadding={20}
      headerStyle={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {!loading && days && days?.length > 0 ? (
        <h5
          style={{
            color: theme.textColor3,
            fontSize: 14,
            fontWeight: 500,
            paddingLeft: 20,
          }}
        >
          {"( " + days[0]?.date + " - " + days[days?.length - 1]?.date + " )"}
        </h5>
      ) : (
        <div
          style={{
            paddingLeft: 20,
          }}
        >
          <Skeleton
            variant="rect"
            width={Math.floor(Math.random() * (150 - 75 + 1)) + 75}
            height={"20px"}
            style={{ borderRadius: 10, marginTop: 10 }}
          />
        </div>
      )}

      <div className="ExercisePlan" style={{ padding: 20 }}>
        {!loading ? (
          days?.map((day, index) => (
            <ExcercisePlanningItem key={index} day={day} theme={theme} />
          ))
        ) : (
          <div>
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <div key={index}>
                <div>
                  <Skeleton
                    variant="rect"
                    width={Math.floor(Math.random() * (150 - 75 + 1)) + 75}
                    height={"20px"}
                    style={{ borderRadius: 10, marginTop: 10 }}
                  />
                </div>
                <Skeleton
                  variant="rect"
                  width={"100%"}
                  height={"40px"}
                  style={{ borderRadius: 10, marginTop: 10 }}
                />
              </div>
            ))}
          </div>
        )}

        {/* <CustomButton
          borderRadius={25}
          marginTop={40}
          width={"100%"}
          label="Save"
          // onClick={() => addActivity()}
          // loading={loadingActivity}
        /> */}
      </div>
    </CustomCard>
  );
}
