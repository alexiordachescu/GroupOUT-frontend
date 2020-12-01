import "./App.css";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import MyGroup from "./pages/MyGroup/MyGroup";
import GroupDetails from "./pages/GroupDetails/GroupDetails";
import MyProfile from "./pages/MyProfile/MyProfile";
import CreateGroup from "./pages/CreateGroup/CreateGroup";
import { bootstrapLogin, logOut } from "./store/user/actions";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { selectUser } from "./store/user/selectors";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import ExploreIcon from "@material-ui/icons/Explore";
import GroupIcon from "@material-ui/icons/Group";
import AddIcon from "@material-ui/icons/Add";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import LockOpenIcon from "@material-ui/icons/LockOpen";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(bootstrapLogin());
  }, [dispatch]);

  const routes = [
    "/explore",
    "/mygroups",
    "/creategroup",
    "/profile",
    "/login",
  ];
  const { token } = useSelector(selectUser);
  return (
    <div className="App">
      <BrowserRouter>
        <Route
          path="/"
          render={(history) => (
            <AppBar position="static" color="secondary">
              <Tabs
                centered="true"
                value={
                  history.location.pathname !== "/"
                    ? history.location.pathname
                    : false
                }
              >
                <Tab
                  label="Explore Groups"
                  value={routes[0]}
                  component={Link}
                  to={routes[0]}
                  icon={<ExploreIcon fontSize="small" />}
                />
                {token ? (
                  <div>
                    <Tab
                      label="My Groups"
                      value={routes[1]}
                      component={Link}
                      to={routes[1]}
                      icon={<GroupIcon fontSize="small" />}
                    />
                    <Tab
                      label="Create Group"
                      value={routes[2]}
                      component={Link}
                      to={routes[2]}
                      icon={<AddIcon fontSize="small" />}
                    />
                    <Tab
                      label="My Profile"
                      value={routes[3]}
                      component={Link}
                      to={routes[3]}
                      icon={<AssignmentIndIcon fontSize="small" />}
                    />
                  </div>
                ) : null}

                {!token ? (
                  <Tab
                    label="Login"
                    value={routes[4]}
                    component={Link}
                    to={routes[4]}
                    icon={<LockOpenIcon fontSize="small" />}
                  />
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => dispatch(logOut())}
                    endIcon={<MeetingRoomIcon />}
                  >
                    Logout
                  </Button>
                )}
              </Tabs>
            </AppBar>
          )}
        />

        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route path="/mygroups" component={MyGroup} />
          <Route path="/group/:id" component={GroupDetails} />
          <Route path="/profile" component={MyProfile} />
          <Route path="/creategroup" component={CreateGroup} />
          <Route path="/explore" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
