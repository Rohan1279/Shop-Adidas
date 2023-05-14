import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../../../components/BackButton/BackButton";
import { Transition } from "@headlessui/react";

const EditProduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <Transition
      show={true}
      appear={true}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <div className="w-full  min-h-screen ">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-x-2 font-semibold hover:underline cursor-pointer "
        >
          <BackButton classes={"text-lg"}></BackButton>
          <p>Back</p>
        </div>
        <h1 className="px-6 py-3  text-lg text-center font-medium text-gray-500 uppercase tracking-wider flex items-center justify-evenly transition-all ">
          Edit Product
        </h1>
        <p>{state.name}</p>
      </div>
    </Transition>
  );
};

export default EditProduct;
