import { Button, CircularProgress, Zoom } from "@material-ui/core";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

export default function CustomButton(props) {
  const {
    label,
    loading,
    width,
    height,
    padding,
    margin,
    onClick,
    type,
    disabled,
  } = props;
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.enableDarkMode
    ? themeContext.dark
    : themeContext.light;

  return (
    <Button
      type={type}
      startIcon={!loading && props.startIcon}
      style={{
        color: theme.buttonTextColor,
        backgroundColor: props.noBackground ? undefined : theme.buttonColor,
        width: width,
        height: height,
        padding: padding,
        margin: margin,
        textTransform: "none",
        fontWeight: 600,
        textAlign: "center",
        ...props,
      }}
      onClick={() => onClick && onClick()}
      disabled={disabled || loading}
      component={props.to && Link}
      to={props.to && props.to}
    >
      <Zoom in={loading}>
        <CircularProgress
          style={{
            width: 20,
            height: 20,

            color: props.noBackground ? undefined : "#fff",
            position: "absolute",
          }}
          thickness={6}
          size={20}
        />
      </Zoom>
      <Zoom in={!loading}>
        <h3 style={{ fontWeight: 500, fontSize: props.fontSize }}>{label}</h3>
      </Zoom>
    </Button>
  );
}
