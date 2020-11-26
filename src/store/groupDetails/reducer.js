import { bindActionCreators } from "redux";

const initialState = { groupInfo: [], groupComm: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH-DETAILS-SUCCESS":
      return { groupInfo: action.payload };
    case "ADD-COMMENT-SUCCESS":
      return { groupInfo: action.payload };
    case "DELETE-USER-SUCCESS":
      return { groupInfo: action.payload };
    default:
      return state;
  }
};
