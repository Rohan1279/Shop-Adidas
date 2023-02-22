import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import BannerCard from "../../components/BannerCard/BannerCard";
import { HiArrowDown, HiArrowUp, HiChevronDown, HiStar } from "react-icons/hi2";
import { Disclosure, Transition } from "@headlessui/react";
import Button from "../../components/Button/Button";
import BackButton from "../../components/BackButton/BackButton";
import BorderButton from "../../components/BorderButton/BorderButton";
import Modal from "../../components/Modal";
const ProductDetail = () => {
  const { state } = useLocation();
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [prevSize, setPrevSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
  const handleCurrentSize = (e) => {
    // console.log(e.target.classList[e.target.classList.length - 1]);
    // console.log(prevSize?.innerText);
    // console.log(e.target?.innerText);
    e.target?.classList?.add("shadow-nm-inset");

    if (prevSize && e.target !== prevSize) {
      prevSize.classList.remove("shadow-nm-inset");
    }
    setPrevSize(e.target);
    setSizeError(false);
  };
  console.log(prevSize?.innerText);
  return (
    // ! use carousal for all products of the category
    <div className="px-5 h-screen overflow-auto py-10  ">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-x-2 font-semibold hover:underline cursor-pointer "
      >
        <BackButton classes={"text-lg"}></BackButton>
        <p>Back</p>
      </div>
      {/* <BannerCard data={state} classes={"text-lg"}></BannerCard> */}
      <div className="md:grid grid-cols-2 justify-center items-start ">
        <img
          src={state?.img}
          alt=""
          className="sm:w-full  md:w-[75%] shadow-nm rounded-xl mx-auto"
          loading="lazy"
        />
        <div className="shadow-nm rounded-md p-7 h-fit transition-all duration-700">
          <section className=" sticky top-0">
            <div className="flex justify-between ">
              <p className="">{state?.category}</p>
              <div className="flex items-center justify-center gap-x-2 mb-5">
                <div className="flex">
                  <HiStar></HiStar>
                  <HiStar></HiStar>
                  <HiStar></HiStar>
                  <HiStar></HiStar>
                </div>
                <p className="font-semibold hover:underline cursor-pointer">
                  {state?.reviewsCount} Reviews
                </p>
              </div>
            </div>
            <h2 className="text-4xl font-extrabold mb-5">{state?.name}</h2>
            <p className="font-bold mb-2">${state?.price}</p>
            <p className="mb-3">
              {state.color ? state.color : "No colors available"}
            </p>
            <Disclosure>
              <hr className="border border-gray-300 mb-2" />

              <Disclosure.Button
                onClick={() => setOpen(!open)}
                className={
                  "w-full flex justify-between items-center gap-x-2 font-semibold"
                }
              >
                <span>Description</span>
                <HiChevronDown
                  className={`${open ? "rotate-180 transform" : ""} h-5 w-5 `}
                ></HiChevronDown>
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform opacity-0"
                enterTo="transform  opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform  opacity-100"
                leaveTo="transform opacity-0"
              >
                <Disclosure.Panel>
                  <p className="text-sm">{state?.description}</p>
                </Disclosure.Panel>
              </Transition>
            </Disclosure>
            <hr className="border border-gray-300 mt-2" />
            <div
              className={
                "w-full my-3 mx-auto block bg-primary-color text-green-500 font-extrabold  transition-all py-2 rounded-md text-sm  border border-zinc-300 text-center"
              }
            >
              In stock
            </div>
            <p className="my-3 font-semibold">Sizes</p>
            <div
              className={`${sizeError && "animate-shake"} duration-100  flex`}
            >
              {sizes.map((size) => (
                <>
                  <button
                    key={size}
                    className={`w-16 text-gray-500 transition-all py-2 rounded- text-sm font-medium border border-zinc-300 hover:shadow-nm-inset`}
                    onClick={(e) => {
                      handleCurrentSize(e);
                    }}

                    // handler={handleCurrentSize}
                  >
                    {size}
                  </button>
                </>
              ))}
            </div>
            {sizeError === true ? (
              <p className="text-sm text-red-500">Please select a size.</p>
            ) : (
              ""
            )}
            <Modal
              modalButtonText={"Add to cart"}
              data={state}
              prevSize={prevSize?.innerText}
              sizeError={sizeError}
              setSizeError={setSizeError}
            ></Modal>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
