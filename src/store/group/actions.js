import axios from "axios";
import { apiUrl } from "../../config/constants";

export const fetchGroups = () => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/browse`);

    dispatch(groupsFetched(response.data));
  };
};

export function groupsFetched(groups) {
  return {
    type: "GROUPS_FETCH_SUCCESS",
    payload: groups,
  };
}
