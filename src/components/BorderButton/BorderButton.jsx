import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const BorderButton = ({ children, classes, handler }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <button
      onClick={(e) => {
        setIsActive(!isActive);
        handler(e);
      }}
      className={`text-gray-500 transition-all hover:text-gray-800  py-2 rounded- text-sm font-medium border border-zinc-300 ${classes} active:focus:shadow-nm-inset
      }`}
    >
      {children}
    </button>
  );
};

export default BorderButton;
