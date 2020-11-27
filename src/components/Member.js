import React from "react";

export default function Member(props) {
  return (
    <div>
      {props.image}
      <h3>
        {props.firstName} {props.lastName}
      </h3>
      <p>{props.description}</p>
      <p>{props.email}</p>
    </div>
  );
}
