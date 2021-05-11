import { TableCell, TableRow, IconButton, Tooltip } from "@material-ui/core";
import { useEffect, useState } from "react";
import Select from "react-select";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import selfRatedExertion from "../../../../data/selfRatedExertion";
import activitiesData from "../../../../data/activities";
import difficultiesData from "../../../../data/difficulties";

export default function ExciseTable({
  theme,
  item,
  index,
  activities,
  updateData,
  setUpdateData,
}) {
  const [hasCompleted, setHasCompleted] = useState(item.hasCompleted);
  const [exertion, setExertion] = useState();

  console.log({ activities, item });

  useEffect(() => {
    if (hasCompleted !== item.hasCompleted || exertion !== undefined) {
      addDataToUpdater();
    }

    console.log({ hasCompleted });
  }, [hasCompleted, exertion]);

  const addDataToUpdater = (e, isStatus) => {
    // setSelectedWeeks(selectedWeeks.filter((e) => e !== week));
    const tempItems = {
      ...item,
      hasCompleted: hasCompleted,
      exertion: exertion?.value || 0,
    };
    console.log(item, tempItems);
    if (updateData.filter((e) => e.id === item.id)) {
      let data = updateData.filter((e) => e.id !== item.id);
      data.push(tempItems);
      setUpdateData(data);

      // setUpdateData(updateData.filter((e) => e.id !== item.id));
      // setUpdateData((oldArray) => [...oldArray, tempItems]);
    } else {
      setUpdateData((oldArray) => [...oldArray, tempItems]);
    }
  };

  const [activityName, setActivityName] = useState();
  const [difficultyName, setDifficultyName] = useState();

  useEffect(() => {
    {
      activitiesData?.map((activity) => {
        if (activity.id === item.activityId) {
          setActivityName(
            `${activity.activity} - e.g. ${activity.parameterExample}`
          );
        }
      });

      difficultiesData?.map((difficulty) => {
        if (difficulty.id === item.difficultyId) {
          console.log("YOUTUBE :", difficulty.id, item.difficultyId);
          setDifficultyName(`${difficulty.label}`);
        }
      });
    }
  }, [item]);

  return (
    <TableRow className="TableRow" style={{ outline: "none" }}>
      <TableCell
        style={{
          borderBottom: index === activities?.activities?.length - 1 && "none",
          display: "flex",
          alignItems: "center",
        }}
        component="th"
        scope="row"
      >
        {activityName}
      </TableCell>

      <TableCell
        style={{
          borderBottom: index === activities?.activities?.length - 1 && "none",
          display: "flex",
          alignItems: "center",
        }}
        component="th"
        scope="row"
      >
        <Tooltip
          title={
            (item?.difficultyId === 1 &&
              "This is the effort level where you can’t hear your breathing, and you are able to easily talk.") ||
            (item?.difficultyId === 2 &&
              "Start to breathe a little faster in order to have a conversation.") ||
            (item?.difficultyId === 3 &&
              "You start to hear your breathing, not gasping for air.") ||
            (item?.difficultyId === 4 &&
              "You can talk but more challenging.") ||
            "a"
          }
        >
          <div>{difficultyName}</div>
        </Tooltip>
      </TableCell>

      <TableCell
        align="left"
        style={{
          borderBottom: index === activities?.activities?.length - 1 && "none",
          display: "grid",
          alignItems: "center",
        }}
      >
        <Select
          defaultValue={
            selfRatedExertion.find((e) => e.value === item.exertion) || [
              {
                value: 0,
                label: "None",
              },
            ]
          }
          options={selfRatedExertion}
          menuPortalTarget={document.querySelector("body")}
          value={exertion}
          onChange={(e) => {
            setExertion(e);
            // addDataToUpdater(e, false);
          }}
        />
      </TableCell>
      <TableCell
        align="right"
        style={{
          borderBottom: index === activities?.activities?.length - 1 && "none",
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Tooltip title={hasCompleted === 1 ? "Done" : "Undo"}>
          <IconButton
            style={{
              width: 50,
              height: 50,
              // backgroundColor: hasCompleted && theme.buttonColor,
              // color: hasCompleted && theme.buttonTextColor,
            }}
            onClick={() => {
              if (hasCompleted === 1) {
                setHasCompleted(0);
              } else {
                setHasCompleted(1);
              }
            }}
          >
            {hasCompleted === 1 ? (
              <RadioButtonCheckedIcon style={{ color: theme.buttonColor }} />
            ) : (
              <RadioButtonUncheckedIcon style={{ color: theme.textColor2 }} />
            )}
          </IconButton>
          {/* <Button
            style={{
              backgroundColor: hasCompleted && theme.buttonColor,
              color: hasCompleted && theme.buttonTextColor,
            }}
            onClick={() => {
              if (hasCompleted) {
                setHasCompleted(0);
              } else {
                setHasCompleted(1);
              }
              // addDataToUpdater(!hasCompleted, true);
            }}
          >
            {hasCompleted === 0 ? "Undo" : "Done"}
          </Button> */}
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
