import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGroupDetails,
  postComment,
} from "../../store/groupDetails/actions";
import { selectGroupDetails } from "../../store/groupDetails/selectors";
import Member from "../../components/Member";
import Comment from "../../components/Comment";
import { selectUser } from "../../store/user/selectors";

export default function GroupDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  useEffect(() => {
    dispatch(fetchGroupDetails(params.id));
  }, [dispatch]);
  const groupDetails = useSelector(selectGroupDetails);
  const user = useSelector(selectUser);

  const addComment = () => {
    dispatch(postComment(comment));
  };

  return (
    <div>
      <h1>Group details</h1>
      <h4>Image: {groupDetails.imageUrl}</h4>
      <h4>Description</h4>
      {groupDetails.description}
      <h4>Members list:</h4>
      {groupDetails.member
        ? groupDetails.member.map((item) => {
            return (
              <div>
                <Member
                  firstName={item.firstName}
                  description={item.description}
                  image={item.imageUrl}
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
        {groupDetails.groupComments
          ? groupDetails.groupComments.map((item) => {
              return (
                <Comment comment={item.comment} name={item.user.firstName} />
              );
            })
          : "Sorry, no comments yet!"}
      </div>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></input>
      <button onClick={addComment}>Add comment!</button>
    </div>
  );
}
