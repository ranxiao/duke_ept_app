import { LinearProgress } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import CustomCard from "../../../../components/customStyles/CustomCard";
import { PatientContext } from "../../../../context/PatientContext";
import httpClient from "../../../../lib/httpClient";
import "./Symptoms.css";

export default function Symptoms({ theme }) {
  const patientContext = useContext(PatientContext);

  const [loading, setLoading] = useState();
  const [symptoms, setSymptoms] = useState();

  useEffect(() => {
    getData(
      patientContext.selectedUserId,
      patientContext.selectedWeek.startDay
    );
  }, [patientContext.selectedWeek.startDay]);

  const getData = (userId, startDay) => {
    setLoading(true);
    httpClient()
      .post(`/symptoms/get`, { userId: userId, startDay: startDay })
      .then((res) => {
        console.log("Symptoms =======> : ", res.data);
        setSymptoms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR from Symptoms : ", err);
        // setDays([]);
        setSymptoms();
        setLoading(false);
      });
  };

  return loading ? (
    <div>
      <Skeleton
        variant="rect"
        width={"100%"}
        height={"250px"}
        style={{ borderRadius: 10, marginTop: 10 }}
      />
    </div>
  ) : (
    <>
      {symptoms ? (
        <CustomCard
          height="auto"
          label="Symptoms"
          bodyPadding={20}
          headerStyle={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3
              style={{
                color: theme.textColor2,
                fontSize: "1.17em",
                fontWeight: 600,
              }}
            >
              What are your symptoms?
            </h3>

            <h4
              style={{
                color: theme.textColor3,
                fontSize: 14,
                // marginLeft: 20,
                fontWeight: 500,
                marginTop: 10,
              }}
            >
              On a scale from 0 to 10, please rate in an average across part 7
              days?
            </h4>

            {symptoms?.symptoms &&
              Object.keys(symptoms.symptoms).map((symp, index) => {
                return (
                  <div key={index}>
                    <p
                      style={{
                        textTransform: "capitalize",

                        color: theme.textColor3,
                        fontSize: 14,
                        fontWeight: 600,
                        marginTop: 15,
                      }}
                    >
                      {symp
                        .replace(/([A-Z]+)/g, " $1")
                        .replace(/([A-Z][a-z])/g, " $1")}
                    </p>
                    <LinearProgress
                      variant="determinate"
                      style={{ height: 6, borderRadius: 3, marginTop: 5 }}
                      value={Object.values(symptoms.symptoms)[index] || 0}
                    />
                  </div>
                );
              })}
          </div>

          <div style={{ marginTop: 50 }}>
            {" "}
            <h3
              style={{
                color: theme.textColor2,
                fontSize: "1.17em",
                fontWeight: 600,
              }}
            >
              Have your symptoms interfered with your activities?{" "}
            </h3>
            <h4
              style={{
                color: theme.textColor3,
                fontSize: 14,
                // marginLeft: 20,
                fontWeight: 500,
                marginTop: 10,
              }}
            >
              On a scale from 0 to 10, please rate in an average across part 7
              days?
            </h4>
            {symptoms?.activities &&
              Object.keys(symptoms.activities).map((symp, index) => {
                return (
                  <div key={index}>
                    <p
                      style={{
                        textTransform: "capitalize",

                        color: theme.textColor3,
                        fontSize: 14,
                        fontWeight: 600,
                        marginTop: 15,
                      }}
                    >
                      {symp
                        .replace(/([A-Z]+)/g, " $1")
                        .replace(/([A-Z][a-z])/g, " $1")}
                    </p>
                    <LinearProgress
                      variant="determinate"
                      style={{ height: 6, borderRadius: 3, marginTop: 5 }}
                      value={Object.values(symptoms.activities)[index] || 0}
                    />
                  </div>
                );
              })}
          </div>

          <div style={{ marginTop: 50 }}>
            <h3
              style={{
                color: theme.textColor2,
                fontSize: "1.17em",
                fontWeight: 600,
              }}
            >
              What do you think about the exercise plan in the last week?{" "}
            </h3>

            <h4
              style={{
                color: theme.textColor3,
                fontSize: 14,
                // marginLeft: 20,
                fontWeight: 500,
                marginTop: 10,
              }}
            >
              On a scale from 0 to 10, please rate in an average across part 7
              days?
            </h4>

            {symptoms?.exercise &&
              Object.keys(symptoms.exercise).map((symp, index) => {
                return (
                  <div key={index}>
                    <p
                      style={{
                        textTransform: "capitalize",

                        color: theme.textColor3,
                        fontSize: 14,
                        fontWeight: 600,
                        marginTop: 15,
                      }}
                    >
                      {symp
                        .replace(/([A-Z]+)/g, " $1")
                        .replace(/([A-Z][a-z])/g, " $1")}
                    </p>
                    <LinearProgress
                      variant="determinate"
                      style={{ height: 6, borderRadius: 3, marginTop: 5 }}
                      value={Object.values(symptoms.exercise)[index] || 0}
                    />
                  </div>
                );
              })}
          </div>

          {/* {JSON.stringify(symptoms)} */}
        </CustomCard>
      ) : (
        <div></div>
      )}
    </>
  );
}
