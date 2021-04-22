import { useContext, useEffect, useState } from "react";
import "./DailyExcise.css";

import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";

import CustomCard from "../../../../components/customStyles/CustomCard";

import backButton from "../../../../assets/home/cards/backButton.svg";
import checkButton from "../../../../assets/home/cards/check.svg";
import homeButton from "../../../../assets/home/cards/home.svg";
import plusButton from "../../../../assets/home/cards/plus.svg";
import httpClient from "../../../../lib/httpClient";
import { AuthContext } from "../../../../context/AuthContext";
import { SnackbarContext } from "../../../../context/SnackbarContext";
import WarningDialog from "../../../../components/warningDialog/WarningDialog";
import {
  formattedDay,
  getDayOfWeek,
  getFirstDayOfWeek,
} from "../../../../lib/getFirstDayOfWeek";
import ExciseTable from "./ExciseTable";
import { Skeleton } from "@material-ui/lab";
import { Link } from "react-router-dom";

export default function DailyExcise({ theme }) {
  const authContext = useContext(AuthContext);
  const snackbarContext = useContext(SnackbarContext);

  const [loading, setLoading] = useState();

  const [activities, setActivities] = useState([]);

  // const [toDayRow, setToDayRow] = useState(new Date());
  const [toDay, setToDay] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(toDay);

  const [showWorningDialog, setShowWorningDialog] = useState(false);
  const [worningDialogMessage, setWorningDialogMessage] = useState("");
  const [worningDialogDescription, setWorningDialogDescription] = useState("");

  // getFirstDayOfWeek().toLocaleDateString()

  useEffect(() => {
    getData();
  }, [selectedDay]);

  const backButtonHandler = () => {
    let date = getDayOfWeek(selectedDay, -1);
    setSelectedDay(date);
    // console.log(date.toLocaleDateString());
  };

  const homeButtonHandler = () => {
    setSelectedDay(toDay);
  };

  const getData = () => {
    console.log("formattedDay(selectedDay) : ", formattedDay(selectedDay));
    if (selectedDay) {
      setLoading(true);
      httpClient()
        .post("/activities/get", {
          userId: authContext.user?.id || authContext.user?._id,
          // date: selectedDay.toLocaleDateString(),
          date: formattedDay(selectedDay),
        })
        .then((res) => {
          console.log("DailyExcise :", res.data);
          setActivities(res.data);
          setUpdateData([]);

          setLoading(false);
        })
        .catch((err) => {
          console.log(
            "ERROR from DailyExcise : ",
            {
              userId: authContext.user?.id || authContext.user?._id,
              date: formattedDay(selectedDay),
            },
            err.message
          );
          setActivities(null);
          setUpdateData([]);
          setLoading(false);
        });
    }
  };

  const [updateData, setUpdateData] = useState([]);

  const updateButtonhandler = () => {
    console.log(updateData);
    setLoading(true);
    httpClient()
      .post("/activities/update", {
        userId: authContext.user?.id || authContext.user?._id,
        activities: updateData,
      })
      .then((res) => {
        console.log("UPDATE: DailyExcise :", res.data);
        getData();
        window.location.reload();
        // setSelectedDay(selectedDay);
        setLoading(false);
      })
      .catch((err) => {
        console.log("UPDATE: ERROR from DailyExcise : ", err.message);
        setLoading(false);
      });
  };

  return (
    <CustomCard
      label="Daily Exercise"
      headerStyle={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      subHeader={
        <div>
          <Tooltip title="Back Button">
            <IconButton
              style={{
                backgroundColor: "rgba(0,0,0,.05)",
                height: 40,
                width: 40,
              }}
              onClick={() => backButtonHandler()}
            >
              <img src={backButton} alt="back Button" style={{ height: 14 }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Save Button">
            <IconButton
              // disabled={updateData.length <= 0}
              style={{
                backgroundColor: "rgba(0,0,0,.05)",
                height: 40,
                width: 40,
                marginLeft: 20,
              }}
              onClick={() => {
                if (updateData.length > 0) {
                  console.log("+>>>>>> .updateData", updateData);
                  setShowWorningDialog(true);
                  setWorningDialogMessage("Save Activity?");
                  setWorningDialogDescription(
                    "Are you sure you want to save this activities?"
                  );
                } else {
                  snackbarContext.Message(
                    "You don't have any changed activity.",
                    "info"
                  );
                }
              }}

              //
            >
              <img
                src={checkButton}
                alt="check Button"
                style={{ height: 14 }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Add Activity">
            <Link to="/activityPlanning">
              <IconButton
                style={{
                  backgroundColor: "rgba(0,0,0,.05)",
                  height: 40,
                  width: 40,
                  marginLeft: 20,
                }}
                // onClick={() => plusButtonHandler()}
              >
                <img
                  src={plusButton}
                  alt="Add Activity"
                  style={{ height: 14 }}
                />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip title="Return Home">
            <IconButton
              style={{
                backgroundColor: "rgba(0,0,0,.05)",
                height: 40,
                width: 40,
                marginLeft: 20,
              }}
              onClick={() => homeButtonHandler()}
            >
              <img src={homeButton} alt="home Button" style={{ height: 14 }} />
            </IconButton>
          </Tooltip>
        </div>
      }
    >
      <h5
        style={{
          color: theme.textColor3,
          fontSize: 14,
          marginLeft: 20,
          fontWeight: 500,
        }}
      >
        {activities?.date || ""}
      </h5>
      <div className="DailyExcise">
        {!loading ? (
          <>
            {activities === null ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: 400,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 40,
                }}
              >
                {" "}
                {selectedDay === toDay ? (
                  <div
                    style={{
                      padding: "0px 30px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <p>
                      You don't have any planned activitys. Please go to
                      Activity Planning page or click here.
                    </p>
                    <Link
                      to="/activityPlanning"
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="text"
                        style={{
                          color: theme.buttonColor,
                          height: 40,

                          marginTop: 20,
                        }}
                        onClick={() => homeButtonHandler()}
                      >
                        Activity Planning
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "0px 30px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <p>
                      You don't have any data for{" "}
                      {/* {selectedDay.toLocaleDateString()}. Please click here to */}
                      {formattedDay(selectedDay)}. Please click here to return
                      to today view.
                    </p>

                    <IconButton
                      style={{
                        backgroundColor: "rgba(0,0,0,.05)",
                        height: 40,
                        width: 40,
                        marginTop: 20,
                      }}
                      onClick={() => homeButtonHandler()}
                    >
                      <img
                        src={homeButton}
                        alt="home Button"
                        style={{ height: 14 }}
                      />
                    </IconButton>
                  </div>
                )}
              </div>
            ) : (
              <TableContainer className="TableContainer">
                <Table className="Table" aria-label="simple table">
                  <TableHead>
                    <TableRow className="TableRow">
                      <TableCell>Activity</TableCell>
                      <TableCell>Recommended effort level</TableCell>
                      <TableCell align="left">
                        Perception of difficulty
                      </TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activities && activities?.activities?.length > 0 ? (
                      activities?.activities?.map((item, index) => (
                        <ExciseTable
                          key={index}
                          item={item}
                          index={index}
                          activities={activities}
                          theme={theme}
                          updateData={updateData}
                          setUpdateData={setUpdateData}
                        />
                      ))
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: 360,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 500,
                            fontSize: ".9rem",
                            color: theme.textColor,
                          }}
                        >
                          You don't have any activity today!{" "}
                        </p>
                      </div>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              minHeight: 400,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 30,
            }}
          >
            {/* <Loading /> */}
            <Skeleton
              variant="rect"
              width={"100%"}
              height={340}
              style={{ borderRadius: 10 }}
            />
          </div>
        )}
      </div>
      <WarningDialog
        theme={theme}
        open={showWorningDialog}
        setOpen={setShowWorningDialog}
        message={worningDialogMessage}
        description={worningDialogDescription}
        onClick={() => updateButtonhandler()}
        loading={loading}
      />
    </CustomCard>
  );
}
