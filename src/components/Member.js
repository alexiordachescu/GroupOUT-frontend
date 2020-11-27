import React from "react";

export default function Member(props) {
  return (
    <div>
      <img src={props.image} style={{ width: "40%", height: "10%" }}></img>
      <h3>
        {props.firstName} {props.lastName}
      </h3>
      <p>{props.description}</p>
      <p>{props.email}</p>
    </div>
  );
}
