import React, { useContext, useEffect, useState } from "react";
import "./SymptomLogPage.css";

import { ThemeContext } from "../../context/ThemeContext";
import CustomCard from "../../components/customStyles/CustomCard";
import CustomPage from "../../components/customStyles/CustomPage";
import SymptomSlider from "./components/SymptomSlider";
import { Link, useHistory } from "react-router-dom";
import httpClient from "../../lib/httpClient";
import { SnackbarContext } from "../../context/SnackbarContext";
import { AuthContext } from "../../context/AuthContext";
import { Skeleton } from "@material-ui/lab";
import {
  endOfWeek,
  formattedDay,
  getDayOfWeek,
  getFirstDayOfWeek,
} from "../../lib/getFirstDayOfWeek";
import { Button } from "@material-ui/core";
import CustomButton from "../../components/customStyles/CustomButton";

export default function SymptomLogPage() {
  const authContext = useContext(AuthContext);
  const snackbarContext = useContext(SnackbarContext);

  const themeContext = useContext(ThemeContext);
  const theme = themeContext.enableDarkMode
    ? themeContext.dark
    : themeContext.light;

  // START OF symptoms
  //What are your symptoms?
  const [pain, setPain] = useState(5);
  const [fatigue, setFatigue] = useState(5);
  const [nausea, setNausea] = useState(5);
  const [disturbedSleep, setDisturbedSleep] = useState(5);
  const [anxietyOrNervousness, setAnxietyOrNervousness] = useState(5);
  const [shortnessOfBreath, setShortnessOfBreath] = useState(5);
  const [cantRememberThings, setCantRememberThings] = useState(5);
  const [lackOfAppetite, setLackOfAppetite] = useState(5);
  const [drowsy, setDrowsy] = useState(5);
  const [sadness, setSadness] = useState(5);
  const [vomit, setVomit] = useState(5);
  const [numbnessOrTingling, setNumbnessOrTingling] = useState(5);

  //Have your symptoms interfered with your activities?
  const [generalActivity, setGeneralActivity] = useState(5);
  const [mood, setMood] = useState(5);
  const [work, setWork] = useState(5);
  const [relationWithOthers, setRelationWithOthers] = useState(5);
  const [walking, setWalking] = useState(5);
  const [enjoymentOfLife, setEnjoymentOfLife] = useState(5);

  //What do you think about the exercise plan in the last week?
  const [difficultyLevel, setDifficultyLevel] = useState(5);
  // END OF symptoms

  const history = useHistory();
  //CHECK
  const [loading, setLoading] = useState();
  const [hasActivities, setHasActivities] = useState();
  const [statusMessage, setStatusMessage] = useState();

  const [isWeekend, setIsWeekend] = useState(false);

  // const [loadingStatusCheck, setLoadingStatusCheck] = useState(false);
  // const [statusCheck, setStatusCheck] = useState();
  // const [statusMessage, setStatusMessage] = useState();

  useEffect(() => {
    // setStatusCheck(false);
    checkWeek();
  }, []);

  // const formattedDay = (d) => {
  //   let date = new Date(d);

  //   let dd = String(date.getDate()).padStart(2, "0");
  //   let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  //   let yyyy = date.getFullYear();

  //   return mm + "/" + dd + "/" + yyyy;
  // };

  const getPreviousSunday = (today) => {
    // var today = new Date();
    // return new Date().setDate(today.getDate() - today.getDay() - 7);
    return new Date().setDate(today.getDate() - today.getDay());
  };

  const getNextSunday = (today) => {
    // var today = new Date();
    return new Date().setDate(today.getDate() - today.getDay() + 7);
  };

  const getFirstDayOfWeekAWeek = (date) => {
    let d = new Date(date);
    // var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  };

  console.log(
    formattedDay(getFirstDayOfWeekAWeek(getPreviousSunday(new Date()))),
    ">>==========>",
    formattedDay(getFirstDayOfWeekAWeek(getNextSunday(new Date()))),
    "==========>",

    formattedDay(new Date())
  );

  const checkWeek = async () => {
    const d = new Date();
    const curDayIndex = d.getDay();

    // if(n)
    // startDay:
    // (curDayIndex === 0 && formattedDay(getFirstDayOfWeek())) ||
    // (curDayIndex > 0 &&
    //   curDayIndex <= 3 &&
    //   formattedDay(
    //     getFirstDayOfWeekAWeek(getPreviousSunday(new Date()))
    //   )),
    // "checkWeek = ",
    // if (
    //   (curDayIndex === 0 && formattedDay(getFirstDayOfWeek())) ||
    //   (curDayIndex > 0 &&
    //     curDayIndex < 3 &&
    //     formattedDay(getFirstDayOfWeekAWeek(getPreviousSunday(new Date()))))
    // ) {
    //   console.log(
    //     "checkWeek = True : ",
    //     (curDayIndex === 0 && formattedDay(getFirstDayOfWeek())) ||
    //       (curDayIndex > 0 &&
    //         curDayIndex < 3 &&
    //         formattedDay(getFirstDayOfWeekAWeek(getPreviousSunday(new Date()))))
    //   );
    // } else {
    //   console.log("checkWeek = False");
    // }

    setLoading(true);
    // console.log("checkWeek");
    // startDay: formattedDay(getFirstDayOfWeek()),
    await httpClient()
      .post(`/symptoms/checkWeek`, {
        userId: authContext.user?.id || authContext.user?._id,
        startDay:
          curDayIndex === 0
            ? formattedDay(getFirstDayOfWeek())
            : formattedDay(
                getFirstDayOfWeekAWeek(getPreviousSunday(new Date()))
              ),
      })
      .then((res) => {
        let dataasddas = "dsadsa";
        console.log("Check", dataasddas, curDayIndex);
        console.log("Check", dataasddas);

        //   curDayIndex === 0 && formattedDay(getFirstDayOfWeek()),
        //   curDayIndex > 0 && "ads",
        //   curDayIndex < 3 &&
        //     formattedDay(getFirstDayOfWeekAWeek(getPreviousSunday(new Date()))),
        //   "null",
        //   res.data.length > 0 ? true : false,
        //   res.data
        // );
        if (!res.data.length > 0) {
          console.log("BIG TRUE");
          setHasActivities(false);
          if (curDayIndex < 3) {
            setIsWeekend(true);
          } else {
            setIsWeekend(false);
          }
        } else {
          if (
            formattedDay(endOfWeek(getFirstDayOfWeek())) ===
            formattedDay(new Date())
          ) {
            setIsWeekend(true);
          } else {
            setIsWeekend(false);
          }
          setHasActivities(true);
        }
        setStatusMessage(res.data?.error);

        setLoading(false);
      })
      .catch((err) => {
        setHasActivities(false);
        setLoading(false);
        console.log(" ========= >>>>>> SymptomLogPage : CATCh", err);
      });
  };

  const [loadingActivity, setLoadingActivity] = useState();
  const addActivity = () => {
    // if (true) {
    //   console.log("!!!!!!!!!!!!!!!");
    //   return;
    // }
    if (
      pain === undefined ||
      fatigue === undefined ||
      nausea === undefined ||
      disturbedSleep === undefined ||
      anxietyOrNervousness === undefined ||
      shortnessOfBreath === undefined ||
      cantRememberThings === undefined ||
      lackOfAppetite === undefined ||
      drowsy === undefined ||
      sadness === undefined ||
      vomit === undefined ||
      numbnessOrTingling === undefined ||
      generalActivity === undefined ||
      mood === undefined ||
      work === undefined ||
      relationWithOthers === undefined ||
      walking === undefined ||
      enjoymentOfLife === undefined ||
      difficultyLevel === undefined
    ) {
      snackbarContext.Message("Please select your exercise plan", "info");
      setLoadingActivity(false);
    } else {
      const d = new Date();
      const curDayIndex = d.getDay();

      setLoadingActivity(true);
      console.log(getFirstDayOfWeek());
      console.log(
        "78888888888 => ",
        curDayIndex === 0
          ? formattedDay(getFirstDayOfWeek())
          : formattedDay(getFirstDayOfWeekAWeek(getPreviousSunday(new Date())))
      );
      httpClient()
        .post(`/symptoms`, {
          userId: authContext.user?.id || authContext.user?._id,
          startDay:
            curDayIndex === 0
              ? formattedDay(getFirstDayOfWeek())
              : formattedDay(
                  getFirstDayOfWeekAWeek(getPreviousSunday(new Date()))
                ),

          pain: pain,
          fatigue: fatigue,
          nausea: nausea,
          disturbedSleep: disturbedSleep,
          anxiety: anxietyOrNervousness,
          shortnessOfBreath: shortnessOfBreath,
          cantRememberThings: cantRememberThings,
          lackOfAppetite: lackOfAppetite,
          drowsy: drowsy,
          sadness: sadness,
          vomit: vomit,
          numbnessOrTingling: numbnessOrTingling,

          generalActivity: generalActivity,
          mood: mood,
          work: work,
          relationWithOthers: relationWithOthers,
          walking: walking,
          enjoymentOfLife: enjoymentOfLife,

          difficultyLevel: difficultyLevel,
        })
        .then(({ data }) => {
          console.log("Symptoms Added", data);
          snackbarContext.Message("Symptoms added successfully", "success");
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

  return loading ? (
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
      {!hasActivities ? (
        <>
          {isWeekend ? (
            <>
              <div className="SymptomLogPage">
                <CustomCard
                  label="What are your symptoms?"
                  // bodyPadding={20}
                  height="auto"
                >
                  <h5
                    style={{
                      color: theme.textColor3,
                      fontSize: 14,
                      marginLeft: 20,
                      fontWeight: 500,
                      marginTop: 10,
                    }}
                  >
                    On a scale from 0 to 10, please rate in an average across
                    part 7 days?
                  </h5>
                  <div style={{ padding: 20 }}>
                    <SymptomSlider
                      label="Pain"
                      theme={theme}
                      value={pain}
                      setValue={setPain}
                    />
                    <SymptomSlider
                      label="Fatigue"
                      theme={theme}
                      value={fatigue}
                      setValue={setFatigue}
                    />
                    <SymptomSlider
                      label="Nausea"
                      theme={theme}
                      value={nausea}
                      setValue={setNausea}
                    />
                    <SymptomSlider
                      label="Disturbed Sleep"
                      theme={theme}
                      value={disturbedSleep}
                      setValue={setDisturbedSleep}
                    />
                    <SymptomSlider
                      label="Anxiety or Nervousness"
                      theme={theme}
                      value={anxietyOrNervousness}
                      setValue={setAnxietyOrNervousness}
                    />
                    <SymptomSlider
                      label="Shortness of Breath"
                      theme={theme}
                      value={shortnessOfBreath}
                      setValue={setShortnessOfBreath}
                    />
                    <SymptomSlider
                      label="Can’t Remember Things"
                      theme={theme}
                      value={cantRememberThings}
                      setValue={setCantRememberThings}
                    />
                    <SymptomSlider
                      label="Lack of Appetite"
                      theme={theme}
                      value={lackOfAppetite}
                      setValue={setLackOfAppetite}
                    />
                    <SymptomSlider
                      label="Drowsy"
                      theme={theme}
                      value={drowsy}
                      setValue={setDrowsy}
                    />
                    <SymptomSlider
                      label="Sadness"
                      theme={theme}
                      value={sadness}
                      setValue={setSadness}
                    />
                    <SymptomSlider
                      label="Vomit"
                      theme={theme}
                      value={vomit}
                      setValue={setVomit}
                    />
                    <SymptomSlider
                      label="Numbness or Tingling"
                      theme={theme}
                      value={numbnessOrTingling}
                      setValue={setNumbnessOrTingling}
                      paddingBottom="0px"
                    />
                  </div>
                </CustomCard>

                <div>
                  <CustomCard
                    label="Have your symptoms interfered with your activities?"
                    // bodyPadding={20}
                    height="auto"
                  >
                    <h5
                      style={{
                        color: theme.textColor3,
                        fontSize: 14,
                        marginLeft: 20,
                        fontWeight: 500,
                        marginTop: 10,
                      }}
                    >
                      On a scale from 0 to 10, please rate in an average across
                      part 7 days
                    </h5>
                    <div style={{ padding: 20 }}>
                      <SymptomSlider
                        label="General Activity"
                        theme={theme}
                        value={generalActivity}
                        setValue={setGeneralActivity}
                      />
                      <SymptomSlider
                        label="Mood"
                        theme={theme}
                        value={mood}
                        setValue={setMood}
                      />
                      <SymptomSlider
                        label="Work"
                        theme={theme}
                        value={work}
                        setValue={setWork}
                      />
                      <SymptomSlider
                        label="Relation With Others"
                        theme={theme}
                        value={relationWithOthers}
                        setValue={setRelationWithOthers}
                      />
                      <SymptomSlider
                        label="Walking"
                        theme={theme}
                        value={walking}
                        setValue={setWalking}
                      />
                      <SymptomSlider
                        label="Enjoyment of Life"
                        theme={theme}
                        value={enjoymentOfLife}
                        setValue={setEnjoymentOfLife}
                        paddingBottom="0px"
                      />
                    </div>
                  </CustomCard>

                  <CustomCard
                    label="What do you think about the exercise plan in the last week?"
                    // bodyPadding={20}
                    height="auto"
                  >
                    <h5
                      style={{
                        color: theme.textColor3,
                        fontSize: 14,
                        marginLeft: 20,
                        fontWeight: 500,
                        marginTop: 10,
                      }}
                    >
                      On a scale from 0 to 10, please rate in an average across
                      part 7 days
                    </h5>
                    <div style={{ padding: 20 }}>
                      <SymptomSlider
                        label="Difficulty Level"
                        theme={theme}
                        value={difficultyLevel}
                        setValue={setDifficultyLevel}
                        text1="Too easy"
                        text2="Extremely Hard"
                        paddingBottom="0px"
                      />
                    </div>
                  </CustomCard>

                  <CustomButton
                    label="Save"
                    width="100%"
                    marginTop={20}
                    borderRadius={10}
                    loading={loadingActivity}
                    onClick={() => addActivity()}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <CustomCard
                height="auto"
                // label="Exercise Plan - Week #1"
                bodyPadding="0px 20px 20px 20px"
                height={500}
              >
                <div
                  style={{
                    height: 460,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p>
                    {`Please comeback on ${formattedDay(
                      endOfWeek(getFirstDayOfWeek())
                    )} to log your symptoms.`}
                  </p>
                </div>
              </CustomCard>
            </>
          )}
        </>
      ) : (
        <div>
          <CustomCard
            height="auto"
            // label="Exercise Plan - Week #1"
            bodyPadding="0px 20px 20px 20px"
            height={500}
          >
            <div
              style={{
                height: 460,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>
                {statusMessage ||
                  "You have finished the log for this week, come back next week"}
              </p>

              {statusMessage && (
                <Link
                  to="/activityPlanning"
                  style={{ marginTop: 20, textDecoration: "none" }}
                >
                  <Button style={{ color: theme.buttonColor }}>
                    Activity Planning
                  </Button>
                </Link>
              )}
            </div>
          </CustomCard>
        </div>
      )}
    </CustomPage>
  );
}
