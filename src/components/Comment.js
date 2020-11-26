import React from "react";

export default function Comment(props) {
  return (
    <div>
      <h6>
        {props.name} : {props.comment}
      </h6>
    </div>
  );
}
