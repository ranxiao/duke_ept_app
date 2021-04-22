import React from "react";

export default function CustomPage(props) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        ...props,
      }}
    >
      <div
        style={{
          backgroundColor: props.color,

          minHeight: "calc(100vh - 60px)",
          // minHeight: "100vh",
          height: "100%",
          width: "100%",
          maxWidth: "1240px",

          padding: props.pagePadding || "0px 20px",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
