import Axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../user/selectors";

export const fetchGroupDetails = (id) => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    const response = await Axios.get(`${apiUrl}/browse/group/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchGroupDetailsSuccess(response.data));
  };
};

export const fetchGroupDetailsSuccess = (response) => ({
  type: "FETCH-DETAILS-SUCCESS",
  payload: response,
});
