import React, { useState } from "react";

const BorderButton = ({ children, classes }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <button
      onClick={() => setIsActive(!isActive)}
      //   onMo={() => setIsActive(false)}
      className={`text-gray-500 transition-all hover:text-gray-800  py-2 rounded- text-sm font-medium border border-zinc-300 ${classes} ${
        isActive ? "border-0 shadow-nm-inset" : ""
      }`}

      // className="text-gray-500 hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded- text-sm font-medium border border-zinc-300 focus:shadow-nm-inset focus:border-0 w-16"
    >
      {children}
    </button>
  );
};

export default BorderButton;
