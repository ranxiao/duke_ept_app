import { useContext, useEffect, useState } from "react";
import httpClient from "../../../../lib/httpClient";
import Categories from "../../../../data/categories";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { Button, IconButton } from "@material-ui/core";
import { PatientContext } from "../../../../context/PatientContext";
import { Skeleton } from "@material-ui/lab";
import selfRatedExertion from "../../../../data/selfRatedExertion";
import ActivitiesData from "../../../../data/activities";

export default function ExcercisePlanningItem({ day, theme }) {
  const patientContext = useContext(PatientContext);
  const categories = Categories;

  const [activities, setActivities] = useState([]);
  const activitiesData = ActivitiesData;

  const [loading, setLoading] = useState();

  // let getActivityData;

  //   const getActivityData = async (userId, dayId) => {
  useEffect(() => {
    setLoading(true);
    // console.log("activities ; ", activities);

    httpClient()
      .get(`/admin/users/${patientContext.selectedUserId}/dayId/${day.id}`)
      .then((res) => {
        setActivities(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR from AdminSidebar : ", err);
        setActivities([]);
        setLoading(false);
      });
  }, [day]);

  return (
    <div
      key={day.id}
      className="Day"
      style={{
        // marginBottom: index !== days.length - 1 && 25,
        marginBottom: 10,
      }}
    >
      <div className="Name">
        <p style={{ color: theme.textColor2 }}>{day.dateName}</p>
      </div>

      {activities.length > 0 ? (
        activities?.map((activity, index) => (
          <div
            key={index}
            className="Data"
            style={{
              marginBottom: index !== activities?.length - 1 && 20,
            }}
          >
            <p style={{ color: theme.textColor2, paddingRight: 10 }}>
              <span style={{ fontWeight: 600, color: theme.textColor }}>
                {"MET - " + activity?.mET + " - "}
              </span>{" "}
              <span style={{ fontWeight: 600, color: theme.textColor }}>
                {categories[activity?.categoryId - 1]?.value + " - "}
              </span>{" "}
              {/* {`${activitiesData[activity?.activityId - 1].activity} - ${
                activitiesData[activity?.activityId - 1].parameterExample
              } `} */}
              {activitiesData?.map((activityData) => {
                if (activityData.id === activity?.activityId) {
                  return `${activityData.activity} - ${activityData.parameterExample}`;
                }
              })}
              <span style={{ fontWeight: 600, color: theme.textColor }}>
                {" - RFE: " + selfRatedExertion[activity?.exertion]?.label}
              </span>
            </p>
            <Button
              disabled
              style={{
                // padding: "0px 25px",
                margin: 0,
                height: 30,
                // width: 75,
                borderRadius: 7.5,
                color: theme.buttonTextColor,

                backgroundColor:
                  activity.hasCompleted === 1
                    ? theme.buttonColor
                    : "rgba(220, 20, 60, .85)",

                fontWeight: 600,
                textTransform: "none",
              }}
              // onClick={() => {
              //   removeActivity(day.name, activity);
              // }}
            >
              {activity.hasCompleted === 1 ? "Done" : "Undone"}
            </Button>
          </div>
        ))
      ) : (
        // <Skeleton
        //   variant="rect"
        //   width={"100%"}
        //   height={"40px"}
        //   style={{ borderRadius: 10, marginTop: 10 }}
        // />

        <div
          className="Data"
          style={{
            backgroundColor: "rgba(0,0,0,.05)",
            justifyContent: "center",
          }}
        >
          <p style={{ color: theme.textColor2, opacity: 0.75 }}>N/A</p>
        </div>
      )}
    </div>
  );
}
