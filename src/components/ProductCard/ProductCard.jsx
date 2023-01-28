import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Button from "../Button/Button";
import MyComponent from "../MyComponent";

const ProductCard = ({ classes, data, handler }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-all duration-[400ms] "
      enterFrom="opacity-0 translate-x-10 scale-95 "
      enterTo="opacity-100 translate-x-0 scale-100 "
      leave="transition-all duration-[400ms] "
      leaveFrom="opacity-100 "
      leaveTo="opacity-0"
    >
      <div
        className={`bg-[url('')] border border-red-400 overflow-hidden w-fit max-h-96 min-h-max relative mx-auto ${classes} `}
      >
        <img
          className={`w-full ${isHovered && ""}  transition-all duration-700`}
          src={data.img}
          alt=""
          loading="lazy"
        />
        {/* translate-y-[68%] hover:translate-y-1/2 transition-all duration-500 */}
        {/* bg-[#e6e7ee]/75 */}
        <div
          onMouseEnter={() => setIsHovered(!isHovered)}
          onMouseLeave={() => setIsHovered(!isHovered)}
          className={` transition-all duration-500  font-extrabold text-white bg-red-100  backdrop-blur-md  ${
            isHovered && "-translate-y-[50%]"
          } text-center h-60`}
        >
          {/* <div className={`bg-red-500 ${isHovered}`}> */}
          <h2
            className={`${
              isHovered && "text-"
            } text- transition-all duration-700 text-black `}
          >
            {data.name}
          </h2>
          {/* <p className="text-black text-lg">{cardDescription}</p> */}
          {/* ${isHovered ? "-translate-y-[100%]" : "translate-y-20" }transition-all duration-500 */}
          <Button
            handler={handler}
            data={data}
            classes={`bg-white/100 text-zinc-600 mt-2 w- mx-auto inset-x-0 rounded-md opacity-0 ${
              isHovered && "opacity-100"
            } delay-200 duration-500`}
          >
            Discover more
          </Button>
          {/* </div> */}
        </div>
      </div>
    </Transition>
  );
};

export default ProductCard;
