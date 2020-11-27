import Axios from "axios";
import { apiUrl } from "../../config/constants";

export const fetchTags = () => {
  return async (dispatch, getState) => {
    const response = await Axios.get(`${apiUrl}/tags`);

    dispatch(groupsFetched(response.data));
  };
};

export function groupsFetched(groups) {
  return {
    type: "TAGS_FETCH_SUCCESS",
    payload: groups,
  };
}
