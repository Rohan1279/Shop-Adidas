import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import { HiArrowDown, HiOutlineXMark } from "react-icons/hi2";

export default function Disclaimer() {
  const [isOpen, setIsOpen] = useState(true);
  console.log(isOpen);
  return (
    <div
      className={` fixed bottom-0  mt-24  flex justify-between bg-slate-300 md:h-fit`}
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
        <p className=" select-none py-3 px-5 text-center text-[10px] font-medium uppercase leading-relaxed tracking-wider text-gray-500 lg:px-20">
          The product images displayed on this website are the property of
          Adidas and are protected by copyright laws. This website does not
          claim any ownership or affiliation with Adidas. The images are used
          solely for educational purposes to showcase web development skills. If
          you are the rightful owner of any of the images and believe that their
          use on this website violates any copyright laws, please contact us,
          and we will promptly remove the images.
        </p>
      </Transition>
      <div onClick={() => setIsOpen(false)} className=" relative ">
        <HiArrowDown
          className={`absolute -top-7  right-0 rounded-t-sm bg-slate-300 p-1 text-3xl text-gray-500 md:hidden`}
        ></HiArrowDown>
      </div>

      <div
        onClick={() => setIsOpen(false)}
        className="hidden w-24 items-center justify-center px-5 transition-all hover:bg-slate-200  lg:grid"
      >
        <HiOutlineXMark
          className={` text-xl  text-gray-600   ${!isOpen && "hidden"}`}
        ></HiOutlineXMark>
      </div>
    </div>
  );
}
