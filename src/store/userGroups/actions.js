import Axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../user/selectors";

export const fetchAdminGroups = () => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    const response = await Axios.get(`${apiUrl}/mygroups/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchAdminSuccess(response.data));
  };
};

export const fetchAdminSuccess = (response) => ({
  type: "FETCH-ADMIN-SUCCESS",
  payload: response,
});

export const fetchMemberGroups = () => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    const response = await Axios.get(`${apiUrl}/mygroups/member`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchMemberSuccess(response.data));
  };
};

export const fetchMemberSuccess = (response) => ({
  type: "FETCH-MEMBER-SUCCESS",
  payload: response,
});
