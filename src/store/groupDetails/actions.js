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
    if (response.status === 201) {
      dispatch(addCommentSuccess(response.data.newGroup));
    }
  };
};

export const addCommentSuccess = (response) => ({
  type: "ADD-COMMENT-SUCCESS",
  payload: response,
});

export const deleteUser = (id, groupId) => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    const response = await Axios.delete(`${apiUrl}/groups/user/${id}/remove`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { groupId },
    });
    if (response.status === 201) {
      dispatch(deleteUserSuccess(response.data.updatedGroup));
    }
  };
};

export const leaveChosenGroup = (id, groupId) => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    const response = await Axios.delete(`${apiUrl}/groups/user/${id}/leave`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { groupId },
    });
    console.log(response);
    if (response.status === 201) {
      dispatch(deleteUserSuccess(response.data.updatedGroup));
    }
  };
};

export const deleteUserSuccess = (response) => ({
  type: "DELETE-USER-SUCCESS",
  payload: response,
});
