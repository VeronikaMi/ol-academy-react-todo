import React from "react";
import "./Error.scss";

export default function Error(props) {
  return (
    <div className="error">
      <p className="error-text"> {props.error} </p>
    </div>
  );
}
