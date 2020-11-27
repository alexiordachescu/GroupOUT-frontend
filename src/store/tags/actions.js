import Axios from "axios";
import { apiUrl } from "../../config/constants";

export const fetchTags = () => {
  return async (dispatch, getState) => {
    const response = await Axios.get(`${apiUrl}/tags`);

    dispatch(tagsFetched(response.data));
  };
};

export function tagsFetched(groups) {
  return {
    type: "TAGS_FETCH_SUCCESS",
    payload: groups,
  };
}
