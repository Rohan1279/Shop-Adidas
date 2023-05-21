import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import { HiArrowDown, HiOutlineXMark } from "react-icons/hi2";

export default function Disclaimer() {
  const [isOpen, setIsOpen] = useState(true);
  console.log(isOpen);
  return (
    <div
      className={` fixed bottom-0  mt-24  flex justify-between bg-gray-300 md:h-fit`}
    >
      <Transition
        show={isOpen}
        enter="transition-all ease-out"
        enterFrom="translate-y-2 "
        enterTo="translate-y-0 "
        leave="transition-all ease-in "
        leaveFrom="translate-y-0 "
        leaveTo="translate-y-2 "
      >
        <p className=" select-none py-2 px-5 text-center text-[7.5px] font-medium  uppercase leading-relaxed text-gray-500  md:text-[10px] lg:px-20">
          The product images on this website are the property of Adidas and are
          protected by copyright laws. This website does not claim ownership or
          affiliation with Adidas. The images are used for educational purposes
          only, and if there are any concerns regarding copyright infringement,
          please contact us for prompt removal.
        </p>
      </Transition>
      <div onClick={() => setIsOpen(false)} className=" relative ">
        <HiArrowDown
          className={`absolute -top-7  right-0 rounded-t-sm bg-gray-300 p-1 text-3xl text-gray-500 md:hidden`}
        ></HiArrowDown>
      </div>

      <div
        onClick={() => setIsOpen(false)}
        className="hidden w-24 items-center justify-center px-5 transition-all hover:bg-slate-200  lg:grid"
      >
        <HiOutlineXMark
          className={` text-xl text-gray-600 ${!isOpen && "hidden"}`}
        ></HiOutlineXMark>
      </div>
    </div>
  );
}
