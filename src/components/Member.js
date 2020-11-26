import React from "react";

export default function Member(props) {
  return (
    <div>
      <h3>{props.firstName}</h3>
      <p>
        {props.description} {props.image}
      </p>
    </div>
  );
}
