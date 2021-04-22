import React, { useContext, useEffect } from "react";
import "./PageNotFound.css";

import { Link } from "react-router-dom";

import Page404 from "../../assets/pageNotFound/404.svg";
import { Button } from "@material-ui/core";

import { ThemeContext } from "../../context/ThemeContext";

const PageNotFound = ({ canNotShow, isHidden }) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.enableDarkMode
    ? themeContext.dark
    : themeContext.light;

  return (
    <>
      {canNotShow ? (
        <div className="NotFoundBody">
          <h1 style={{ color: theme.textColor2, fontSize: 40 }}>Oops!</h1>
          <h2 style={{ color: theme.textColor3, margin: "20px 0px 10px 0px" }}>
            {isHidden
              ? "Content has not been published"
              : "Max Traffic Limit Exceeded"}
          </h2>

          <p style={{ color: theme.textColor3 }}>
            Please contuct the creator to view the content.
          </p>

          <div className="Button" style={{ marginTop: "20px" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button style={{ textTransform: "none", height: 45 }}>
                <h4 style={{ fontWeight: 500, fontSize: 16 }}>Return Home</h4>
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="NotFoundBody">
          <div className="Image">
            <img src={Page404} alt="404 Background" />
          </div>

          <div className="Button">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button style={{ textTransform: "none", height: 45 }}>
                <h4 style={{ fontWeight: 500, fontSize: 16 }}>Return Home</h4>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default PageNotFound;
