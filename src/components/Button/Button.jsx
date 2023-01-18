import React from "react";
import "./Button.css";
const Button = ({ classes, children, handler, data }) => {
  return (
    <button
      onClick={() => handler(data._id)}
      id="button"
      className={` p-2 border bg-inherit shadow-nm active:shadow-nm-inset transition-all ${classes}`}
    >
      {children}
    </button>
  );
};
export default Button;
// Transition from inset to outer box-shadow
// https://codepen.io/Probocop/pen/yyrqNG
