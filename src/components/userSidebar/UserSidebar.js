import React, { useContext } from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Hamburger from "hamburger-react";
import logo from "../../assets/logo.svg";
import CustomButton from "../customStyles/CustomButton";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";

import "./UserSidebar.css";
import HeaderButton from "../header/components/HeaderButton";
const drawerWidth = 310;

// const users = [
//   { name: "Saidul Badhon", weeks: ["Week 1", "Week 2", "Week 3", "Week 4"] },
//   { name: "Saidul Vai", weeks: ["Week 1", "Week 2"] },
//   { name: "Saidul Abba", weeks: ["Week 1", "Week 2", "Week 3"] },
// ];

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function UserSidebar(props) {
  const authContext = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.enableDarkMode
    ? themeContext.dark
    : themeContext.light;

  const { window } = props;
  const classes = useStyles();
  // const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="DrawerContainer" style={{ backgroundColor: theme.ui }}>
      <img
        className="Logo"
        style={{ width: 75, marginTop: "50px" }}
        src={logo}
        alt="Logo"
      />
      <div className="Drawer">
        <h5
          style={{
            fontWeight: 500,
            color: theme.textColor,
            textAlign: "center",
            paddingTop: 20,
            marginBottom: 25,
          }}
        >
          Welcome back, {authContext.user?.name || authContext.user?.fullName}
        </h5>

        <div className="DrawerItems">
          <div className="DrawerItemButtons">
            <HeaderButton width="100%" to="/" label="Home" theme={theme} />
            <HeaderButton
              width="100%"
              to="/activityPlanning"
              label="Activity Planning"
              theme={theme}
            />
            <HeaderButton
              width="100%"
              to="/symptomLog"
              label="Symptom Log"
              theme={theme}
            />
            <HeaderButton
              width="100%"
              to="#"
              label="Logout"
              theme={theme}
              onClick={() => authContext.Logout()}
            />
          </div>

          <div className="DrawerBottomSection">
            <CustomButton
              label="Help"
              backgroundColor={theme.textColor}
              borderRadius={25}
            />
            <CustomButton
              label="Logout"
              borderRadius={25}
              onClick={() => authContext.Logout()}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <div className="AnchorHanbargerButton">
        <IconButton style={{ padding: 0 }}>
          <Hamburger
            size={20}
            color={theme.buttonColor}
            rounded
            toggled={mobileOpen}
            toggle={setMobileOpen}
          />
        </IconButton>
      </div>

      <Drawer
        container={container}
        variant="temporary"
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

UserSidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default UserSidebar;
