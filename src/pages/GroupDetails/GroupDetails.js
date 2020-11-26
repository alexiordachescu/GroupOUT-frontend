import React from "react";
import { useParams } from "react-router-dom";

export default function GroupDetails() {
  const params = useParams();
  return (
    <div>
      <h1>Group details</h1>
      <h4>Image:</h4>
      <h4>Description:</h4>
      <h4>Members list:</h4>
      <h4>Discussion:</h4>
    </div>
  );
}
