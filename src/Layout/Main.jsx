import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const Main = () => {
  return (
    <div className="bg-secondary-color relative pt-24 h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
