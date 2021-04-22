import React from "react";
import "./Loading.css";

import LoadingIcon from "../../assets/loading/Loading.svg";

export default function Loading(props) {
  return (
    <div
      className="Loading_Container"
      style={{
        width: props.fullSize ? "100vw" : props.size || "100px",
        height: props.fullSize ? "100vh" : props.size || "100px",
        backgroundColor: props.fullSize ? "#FFF" : "",
        position: props.fullSize ? "absolute" : "",
        zIndex: props.fullSize ? 2000 : 1900,
      }}
    >
      <div className="Loading">
        <img
          className="LoadingIcon"
          style={{ width: props.size, height: props.size }}
          src={LoadingIcon}
          alt="loading"
        />
      </div>
    </div>
  );
}
