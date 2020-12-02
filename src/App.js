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
import { useEffect } from "react";
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
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MailIcon from "@material-ui/icons/Mail";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

// STYLING:
const useStyles = makeStyles((theme) => ({
  footerContainer: { width: "100%" },
  footer: {
    backgroundColor: "#f50057",
    height: "3%",
  },
  headerTypography: { fontSize: "1rem" },
  typography: { color: "white" },
  footerIcons: { color: "white" },
}));

function App() {
  const classes = useStyles();
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
              <Grid container justify={"space-between"}>
                <Grid
                  item
                  container
                  direction={"row"}
                  sm={12}
                  lg={2}
                  alignItems={"center"}
                  justify={"center"}
                >
                  <Typography
                    variant="overline"
                    className={classes.headerTypography}
                  >
                    Group OUT
                  </Typography>
                </Grid>
                <Grid item>
                  <Tabs
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
                </Grid>
              </Grid>
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
      <footer className={classes.footer}>
        <Grid
          container
          direction="row"
          xs={12}
          className={classes.footerContainer}
        >
          <Grid item xs={2} container justify="center" alignItems="center">
            <Typography variant="overline" className={classes.typography}>
              Alex Iordachescu, 2020
            </Typography>
          </Grid>
          <Grid item xs={10} container justify="flex-end">
            <IconButton
              onClick={(event) =>
                window.open(
                  "https://www.linkedin.com/in/alexandru-ionut-iordachescu/",
                  "_blank"
                )
              }
            >
              <LinkedInIcon className={classes.footerIcons} fontSize="small" />
            </IconButton>
            <IconButton
              onClick={(event) =>
                window.open(
                  "mailto:alex.iordachescu27@gmail.com?cc=&subject=Hello Alex&body=",
                  "_self"
                )
              }
            >
              <MailIcon className={classes.footerIcons} fontSize="small" />
            </IconButton>
            <IconButton
              onClick={(event) =>
                window.open("https://github.com/alexiordachescu/", "_blank")
              }
            >
              <GitHubIcon className={classes.footerIcons} fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </footer>
    </div>
  );
}

export default App;
