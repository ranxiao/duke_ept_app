import { useState, useEffect, useContext } from "react";
import "./DrawerItemButton.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  ButtonBase,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import httpClient from "../../../lib/httpClient";
import { Skeleton } from "@material-ui/lab";
import { PatientContext } from "../../../context/PatientContext";
import { Link, useHistory } from "react-router-dom";

export default function DrawerItemButton({ user, theme }) {
  const patientContext = useContext(PatientContext);

  const [expanded, setExpanded] = useState(true);
  const [weeks, setWeeks] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  // let week;
  const getData = () => {
    setLoading(true);
    httpClient()
      .get(`/admin/users/${user.id}`)
      .then((res) => {
        setWeeks(res.data);
        // res.data.map((user) => {
        //   setWeeks((oldArray) => [...oldArray, user]);
        // });
        // setWeeks(res.data);
        // console.log(" setWeeks : ", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR from AdminSidebar : ", err);
        setWeeks([]);
        setLoading(false);
      });
  };
  const history = useHistory();

  return (
    <Accordion
      defaultExpanded
      className="Accordion"
      expanded={expanded}
      onChange={(e, expanded) => {
        setExpanded(expanded);
      }}
    >
      <AccordionSummary
        className="AccordionSummary"
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1c-content"
      >
        <div className="AccordionSummary-Body">
          <Avatar
            className="Avatar"
            style={{
              textTransform: "capitalize",
            }}
          >
            {(user?.fullName && user?.fullName[0].toUpperCase()) ||
              (user && user?.email && user?.email[0].toUpperCase())}
          </Avatar>

          <h4
            style={{ color: theme.textColor, fontWeight: 500, paddingLeft: 10 }}
          >
            {(user && user?.fullName && user?.fullName) ||
              (user && user?.email && user?.email)}
          </h4>
        </div>
      </AccordionSummary>

      <AccordionDetails style={{ alignItems: "center" }}>
        <div className="AccordionDetails-Body">
          {weeks.length > 0 && (
            <h5
              style={{
                color: theme.textColor3,
                fontWeight: 500,
                marginBottom: 10,
                padding: "0px 20px",
              }}
            >
              Select a Week
            </h5>
          )}

          {!loading ? (
            weeks.length > 0 ? (
              weeks?.map((week, index) => {
                // console.log("WEEK : ", week, weeks);
                return (
                  <>
                    <Link
                      to="/"
                      style={{
                        textDecoration: "none",
                        color: theme.textColor2,
                        width: "100%",
                      }}
                    >
                      <ButtonBase
                        className="WeekButton"
                        style={{
                          width: "100%",
                          color: theme.textColor2,
                        }}
                        onClick={() => {
                          // history.push("/");

                          // user.id
                          // week.id
                          console.log(user.id, week.id, week);
                          patientContext.setSelectedWeek(
                            user.id,
                            week.id,
                            week
                          );
                        }}
                      >
                        {week.startDay} <ArrowRightRoundedIcon />
                      </ButtonBase>
                    </Link>
                  </>
                );
              })
            ) : (
              <div
                style={{
                  width: "100%",
                  // height: 40,
                  display: "flex",
                  justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <h5
                  style={{
                    color: theme.textColor3,
                    fontWeight: 500,
                    // marginBottom: 10,
                    // padding: "0px 20px",
                  }}
                >
                  Not Found
                </h5>
              </div>
            )
          ) : (
            <div>
              <Skeleton
                variant="rect"
                width={"100%"}
                height={"40px"}
                style={{ borderRadius: 10 }}
              />
              <Skeleton
                variant="rect"
                width={"100%"}
                height={"40px"}
                style={{ borderRadius: 10, marginTop: 10 }}
              />
            </div>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
