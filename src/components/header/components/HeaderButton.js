import { Badge, ButtonBase } from "@material-ui/core";
import React, { useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

export default function HeaderButton({
  to,
  label,
  theme,
  width,
  onClick,
  showBadge,
}) {
  let location = useLocation();

  useEffect(() => {
    console.log();
  }, [location.pathname]);

  //   useEffect(() => {
  //       effect
  //       return () => {
  //           cleanup
  //       }
  //   }, [input])
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        padding: "0px 10px",
      }}
    >
      <ButtonBase
        style={{
          width: width,
          height: 60,
          fontWeight: 600,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onClick={onClick}
      >
        <div style={{ height: 5, width: "100%" }} />

        <Badge
          invisible={!showBadge}
          badgeContent=" "
          variant="dot"
          // overlap={showBadge && "circle"}
          color="primary"
        >
          <div
            style={{
              padding: "0px 20px",
              color: location.pathname === to ? theme.buttonColor : "#959595",
              fontWeight: location.pathname !== to && 600,
            }}
          >
            {label}
          </div>
        </Badge>

        <div
          style={{
            height: 5,
            borderRadius: 10,
            width: "100%",
            backgroundColor: location.pathname === to && theme.buttonColor,
          }}
        />
      </ButtonBase>
    </Link>
  );
}
