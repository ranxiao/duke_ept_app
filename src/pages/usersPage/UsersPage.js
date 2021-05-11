import { useContext, useEffect, useState } from "react";
import "./UsersPage.css";

import CustomPage from "../../components/customStyles/CustomPage";
import { ThemeContext } from "../../context/ThemeContext";
import CustomCard from "../../components/customStyles/CustomCard";
import httpClient from "../../lib/httpClient";

import {
  Avatar,
  ButtonBase,
  IconButton,
  Card,
  CardContent,
  List,
  ListItem,
  Grow,
  Button,
  ListItemSecondaryAction,
  Tooltip,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { Link } from "react-router-dom";
import ChangePasswordModal from "./components/ChangePasswordModal";
import { AuthContext } from "../../context/AuthContext";

const ListItemWithWiderSecondaryAction = withStyles({
  secondaryAction: {
    paddingRight: 96,
  },
})(ListItem);

export default function UsersPage() {
  // const patientContext = useContext(PatientContext);

  const authContext = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.enableDarkMode
    ? themeContext.dark
    : themeContext.light;

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState();

  const [loading, setLoading] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // let getDayData;
  const getData = () => {
    setLoading(true);
    httpClient()
      .get(`/user`)
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR from AdminSidebar : ", err);
        setUsers([]);
        setLoading(false);
      });
  };

  const deleteUser = (userId) => {
    setLoading(true);
    httpClient()
      .delete(`/user/${userId}`)
      .then((res) => {
        getData();
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR from AdminSidebar : ", err);
        setLoading(false);
      });
  };

  return (
    <CustomPage backgroundColor={theme.backgroundColor}>
      <div className="UsersPage">
        <CustomCard
          height="auto"
          label="Users"
          // bodyPadding={20}
          headerStyle={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          subHeader={
            <div>
              <Tooltip title="Add User">
                <Link to="/users/add" style={{ textDecoration: "none" }}>
                  <Button
                    startIcon={<AddRoundedIcon />}
                    style={{ textTransform: "none", color: theme.buttonColor }}
                  >
                    Add User
                  </Button>
                </Link>
              </Tooltip>
            </div>
          }
        >
          <List component="nav" style={{ paddingBottom: 0 }}>
            {!loading && users && users.map ? (
              users.length > 0 ? (
                users
                  .slice(0)
                  .reverse()
                  .map((user, index) => {
                    console.log(" *************** ", user.role);
                    if (user.role === "ADMIN") {
                      return (
                        <Grow
                          key={index}
                          in={user !== null}
                          style={{ transformOrigin: "0 0 0" }}
                          {...(user ? { timeout: 250 * index } : {})}
                        >
                          <ListItemWithWiderSecondaryAction
                            dense
                            // button
                            style={{
                              paddingLeft: 20,
                              minHeight: 60,
                              borderBottom: "1px rgba(0, 0, 0, 0.05) solid",
                            }}
                            // component={Link}
                            // to={`/users/${user._id || user.id}`}
                            draggable={false}
                          >
                            <div
                              className="ListTableBody"
                              style={{
                                color: theme.textColor,
                              }}
                            >
                              <h3
                                style={{
                                  color: theme.textColor,
                                  fontWeight: 600,
                                }}
                              >
                                {user.fullName && user.fullName}
                              </h3>
                              <p style={{ color: theme.textColor2 }}>
                                <span style={{ fontWeight: 500, fontSize: 14 }}>
                                  {user.role &&
                                    user.role === "ADMIN" &&
                                    "Admin - "}
                                </span>{" "}
                                {user.email && user.email}
                              </p>
                            </div>

                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                aria-label="comments"
                                style={{ marginRight: 20 }}
                                onClick={() => {
                                  setShowChangePasswordModal(true);
                                  setSelectedUsers(user);
                                }}
                              >
                                <EditRoundedIcon
                                  style={{ color: theme.buttonColor }}
                                />
                              </IconButton>

                              {user.id !== authContext.user.id && (
                                <IconButton
                                  edge="end"
                                  aria-label="comments"
                                  style={{ marginRight: 0 }}
                                  onClick={() => {
                                    // deleteUser(user._id);
                                    deleteUser(user.id || user._id);
                                    // setShowDeleteModal(!showDeleteModal);
                                  }}
                                >
                                  <DeleteRoundedIcon
                                    style={{ color: "rgba(220,20,60,1)" }}
                                  />
                                </IconButton>
                              )}
                            </ListItemSecondaryAction>
                          </ListItemWithWiderSecondaryAction>
                        </Grow>
                      );
                    }
                    if (user.role === "USER") {
                      return (
                        <Grow
                          key={index}
                          in={user !== null}
                          style={{ transformOrigin: "0 0 0" }}
                          {...(user ? { timeout: 250 * index } : {})}
                        >
                          <ListItemWithWiderSecondaryAction
                            dense
                            // button
                            style={{
                              paddingLeft: 20,
                              minHeight: 60,
                              borderBottom: "1px rgba(0, 0, 0, 0.05) solid",
                            }}
                            // component={Link}
                            // to={`/users/${user._id || user.id}`}
                            draggable={false}
                          >
                            <div
                              className="ListTableBody"
                              style={{
                                color: theme.textColor,
                              }}
                            >
                              <h3
                                style={{
                                  color: theme.textColor,
                                  fontWeight: 600,
                                }}
                              >
                                {user.fullName && user.fullName}
                              </h3>
                              <p style={{ color: theme.textColor2 }}>
                                <span style={{ fontWeight: 500, fontSize: 14 }}>
                                  {user.role &&
                                    user.role === "USER" &&
                                    "User - "}
                                </span>{" "}
                                {user.email && user.email}
                              </p>
                            </div>

                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                aria-label="comments"
                                style={{ marginRight: 20 }}
                                onClick={() => {
                                  setShowChangePasswordModal(true);
                                  setSelectedUsers(user);
                                }}
                              >
                                <EditRoundedIcon
                                  style={{ color: theme.buttonColor }}
                                />
                              </IconButton>

                              {user.id !== authContext.user.id && (
                                <IconButton
                                  edge="end"
                                  aria-label="comments"
                                  style={{ marginRight: 0 }}
                                  onClick={() => {
                                    // deleteUser(user._id);
                                    deleteUser(user.id || user._id);
                                    // setShowDeleteModal(!showDeleteModal);
                                  }}
                                >
                                  <DeleteRoundedIcon
                                    style={{ color: "rgba(220,20,60,1)" }}
                                  />
                                </IconButton>
                              )}
                            </ListItemSecondaryAction>
                          </ListItemWithWiderSecondaryAction>
                        </Grow>
                      );
                    }
                  })
                  .sort((a, b) => a.id - b.id)
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: 300,
                  }}
                ></div>
              )
            ) : (
              <div className={{ margin: "0px 5px" }}>
                <Skeleton
                  variant="rect"
                  width={"100%"}
                  height={50}
                  style={{ borderRadius: 10, marginTop: 20 }}
                />
                <Skeleton
                  variant="rect"
                  width={"100%"}
                  height={50}
                  style={{ borderRadius: 10, marginTop: 20 }}
                />
                <Skeleton
                  variant="rect"
                  width={"100%"}
                  height={50}
                  style={{ borderRadius: 10, marginTop: 20 }}
                />
              </div>
            )}
          </List>
        </CustomCard>
      </div>

      <ChangePasswordModal
        theme={theme}
        open={showChangePasswordModal}
        onClose={setShowChangePasswordModal}
        user={selectedUsers}
      />
    </CustomPage>
  );
}
