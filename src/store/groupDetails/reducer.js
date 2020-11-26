import { bindActionCreators } from "redux";

const initialState = { groupInfo: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH-DETAILS-SUCCESS":
      return { groupInfo: action.payload };

    default:
      return state;
  }
};
