import React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const BackButton = ({ classes }) => {
  let navigate = useNavigate();
  return (
    <HiArrowLeft
      className={`${classes}`}
      onClick={() => navigate(-1)}
    ></HiArrowLeft>
  );
};

export default BackButton;
