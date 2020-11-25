import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import groupReducer from "./group/reducer";
import userGroupReducer from "./userGroups/reducer";

export default combineReducers({
  appState,
  user,
  groupReducer,
  userGroupReducer,
});
