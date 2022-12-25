import React from "react";

const Button = ({classes, children}) => {
  return (
    <button className={`border border-zinc-200 p-2 m-4 shadow-nm hover:shadow-nm-inset transition-all ${classes}`}>
      {children}
    </button>
  );
};

export default Button;
