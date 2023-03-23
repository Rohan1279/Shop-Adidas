import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 rounded-full animate-pulse dark:bg-primary"></div>
      <div className="w-4 h-4 rounded-full animate-pulse  dark:bg-primary"></div>
      <div className="w-4 h-4 rounded-full animate-pulse  dark:bg-primary"></div>
    </div>
  );
};

export default Loader;
