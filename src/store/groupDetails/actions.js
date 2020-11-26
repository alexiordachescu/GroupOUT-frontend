import Axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../user/selectors";
import { selectGroupDetails } from "./selectors";

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

export const postComment = (comment) => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    const { id } = selectGroupDetails(getState());
    const response = await Axios.post(
      `${apiUrl}/groups/${id}/comment`,
      { comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch(addCommentSuccess(response.data.newGroup));
  };
};

export const addCommentSuccess = (response) => ({
  type: "ADD-COMMENT-SUCCESS",
  payload: response,
});
