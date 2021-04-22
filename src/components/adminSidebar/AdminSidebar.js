import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Hamburger from "hamburger-react";
import logo from "../../assets/logo.svg";
import CustomButton from "../customStyles/CustomButton";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import DrawerItemButton from "./components/DrawerItemButton";

import "./AdminSidebar.css";
import httpClient from "../../lib/httpClient";

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

function AdminSidebar(props) {
  const authContext = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.enableDarkMode
    ? themeContext.dark
    : themeContext.light;

  const { window } = props;
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    httpClient()
      .get("/admin/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR from AdminSidebar : ", err.message);
        setUsers(null);
        setLoading(false);
      });
  };

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
          Welcome back,{" "}
          {authContext.user?.name ||
            authContext.user?.fullName ||
            authContext.user?.email}
        </h5>

        <div className="DrawerItems">
          <div className="DrawerBottomSection">
            <CustomButton
              label="Users"
              backgroundColor={theme.textColor}
              borderRadius={25}
              to="/users"
            />
            <CustomButton
              label="Logout"
              borderRadius={25}
              onClick={() => authContext.Logout()}
            />
          </div>

          <div className="DrawerItemButtons">
            <h3
              style={{
                color: theme.textColor,
                padding: "25px 0px 20px 20px",
              }}
            >
              Patients
            </h3>
            {users?.map((user, index) => (
              <DrawerItemButton key={index} user={user} theme={theme} />
            ))}
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
            color="#FFF"
            rounded
            toggled={mobileOpen}
            toggle={setMobileOpen}
          />
        </IconButton>
      </div>

      <CssBaseline />

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
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
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
}

AdminSidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminSidebar;
