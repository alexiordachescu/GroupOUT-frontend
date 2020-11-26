import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupDetails } from "../../store/groupDetails/actions";
import { selectGroupDetails } from "../../store/groupDetails/selectors";
import Member from "../../components/Member";
import Comment from "../../components/Comment";
import { selectUser } from "../../store/user/selectors";

export default function GroupDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroupDetails(params.id));
  }, [dispatch]);
  const groupDetails = useSelector(selectGroupDetails);
  const user = useSelector(selectUser);

  return (
    <div>
      <h1>Group details</h1>
      <h4>Image:</h4>
      <h4>Description</h4>
      {groupDetails.description}
      <h4>Members list:</h4>
      {groupDetails
        ? groupDetails.member.map((item) => {
            return (
              <div>
                <Member
                  firstName={item.firstName}
                  description={item.description}
                />{" "}
                {groupDetails.userId === user.id ? (
                  <button>Remove user</button>
                ) : null}
              </div>
            );
          })
        : "loading...."}

      <h4>Discussion:</h4>
      <div style={{ borderStyle: "solid" }}>
        {groupDetails.groupComments.length === 0
          ? "Sorry, no messages yet. Please use the `Add comment` button bellow to post something."
          : groupDetails.groupComments.map((item) => {
              return (
                <Comment comment={item.comment} name={item.user.firstName} />
              );
            })}
      </div>
      <input type="text"></input>
      <button>Add comment!</button>
    </div>
  );
}
