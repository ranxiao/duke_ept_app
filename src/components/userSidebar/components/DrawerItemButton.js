import { useState } from "react";
import "./DrawerItemButton.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  ButtonBase,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

export default function DrawerItemButton({ user, theme }) {
  const [expanded, setExpanded] = useState(true);
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
            {user.name[0]}
          </Avatar>

          <h4
            style={{ color: theme.textColor, fontWeight: 500, paddingLeft: 10 }}
          >
            {user.name}
          </h4>
        </div>
      </AccordionSummary>

      <AccordionDetails style={{ alignItems: "center" }}>
        <div className="AccordionDetails-Body">
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

          {user.weeks?.map((week, index) => (
            <ButtonBase
              className="WeekButton"
              stye={{ width: "100%", color: theme.textColor2 }}
            >
              {week} <ArrowRightRoundedIcon />
            </ButtonBase>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
