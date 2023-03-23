import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 rounded-full animate-pulse shadow-nm-inset"></div>
      <div className="w-4 h-4 rounded-full animate-pulse shadow-nm-inset"></div>
      <div className="w-4 h-4 rounded-full animate-pulse shadow-nm-inset"></div>
    </div>
  );
};

export default Loader;
