import { Card } from "@material-ui/core";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function CustomCard(props) {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.enableDarkMode
    ? themeContext.dark
    : themeContext.light;

  return (
    <Card
      style={{
        marginTop: props.marginTop ? props.marginTop : 20,
        // height: "calc(100% - 25px)",
        height: props.height || "100%",

        backgroundColor: theme.ui || props.backgroundColor,
        borderRadius: 10 || props.borderRadius,
        boxShadow: "none",
      }}
    >
      <div
        style={{
          margin: "20px 20px 0px 20px",
          ...props.headerStyle,
        }}
      >
        <h3
          style={{
            color: theme.textColor2,
            fontSize: "1.17em",
            fontWeight: 600,
          }}
        >
          {props.label}
        </h3>

        {props.subHeader}
      </div>

      <div style={{ padding: props.bodyPadding, margin: props.bodyMargin }}>
        {props.children}
      </div>
    </Card>
  );
}
