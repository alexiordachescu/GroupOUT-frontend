import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupDetails } from "../../store/groupDetails/actions";

export default function GroupDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroupDetails(params.id));
  }, [dispatch]);
  return (
    <div>
      <h1>Group details</h1>
      <h4>Image:</h4>
      <h4>Description:</h4>
      <h4>Members list:</h4>
      <h4>Discussion:</h4>
      <input type="text"></input>
      <button>Add comment!</button>
    </div>
  );
}
