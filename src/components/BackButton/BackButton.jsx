import React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const BackButton = ({ classes }) => {
  return (
    <HiArrowLeft
      className={`${classes}`}
    ></HiArrowLeft>
  );
};

export default BackButton;
