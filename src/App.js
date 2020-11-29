import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Navigation from "./components/Navigation";
import MyGroup from "./pages/MyGroup/MyGroup";
import GroupDetails from "./pages/GroupDetails/GroupDetails";
import MyProfile from "./pages/MyProfile/MyProfile";
import CreateGroup from "./pages/CreateGroup/CreateGroup";
import { bootstrapLogin } from "./store/user/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(bootstrapLogin());
  }, [dispatch]);
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route path="/mygroups" component={MyGroup} />
        <Route path="/group/:id" component={GroupDetails} />
        <Route path="/profile" component={MyProfile} />
        <Route path="/creategroup" component={CreateGroup} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
