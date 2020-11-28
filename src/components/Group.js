import React from "react";

export default function Group(props) {
  return (
    <div>
      <img src={props.image} style={{ height: "300px" }} alt="image"></img>
      <h4>{props.description}</h4>
      <h6>{props.date}</h6>
      <h6>
        Members: {props.size}/{props.maxSize}
      </h6>
      <p>Tags: {props.tags} </p>
    </div>
  );
}
