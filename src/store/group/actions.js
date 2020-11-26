import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../user/selectors";

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

export const joinGroup = (id) => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());

    const response = await axios.post(
      `${apiUrl}/browse/${id}/join`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 201) {
      dispatch(joinSuccess(response.data.joined));
    }
  };
};

export const joinSuccess = (response) => ({
  type: "JOIN-SUCCESS",
  payload: response,
});
