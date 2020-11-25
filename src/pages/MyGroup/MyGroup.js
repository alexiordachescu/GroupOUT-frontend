import React, { useEffect } from "react";
import { fetchAdminGroups } from "../../store/userGroups/actions";
import { useDispatch, useSelector } from "react-redux";

export default function MyGroup() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAdminGroups());
  }, [dispatch]);

  return (
    <div>
      <h1>Groups managed by me:</h1>
      <h1>Groups I'm into:</h1>
    </div>
  );
}
