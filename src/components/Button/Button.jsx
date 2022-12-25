import React from "react";
import "./Button.css"
const Button = ({classes, children}) => {
  return (
    <button id="button" 
    className={`p-2 m-4 shadow-nm hover:shadow-nm-inset transition-all ${classes}`}
    
    >
      {children}
    </button>
  );
};
export default Button;
// Transition from inset to outer box-shadow
// https://codepen.io/Probocop/pen/yyrqNG