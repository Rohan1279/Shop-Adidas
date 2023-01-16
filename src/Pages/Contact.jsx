import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import { HiBars3BottomLeft, HiOutlineXMark } from "react-icons/hi2";
import Button from "../components/Button/Button";

const Contact = () => {
  const [active, setActive] = useState(true);
  console.log(active);
  return (
    <div className="h-screen">
      <button onClick={() => setActive((active) => !active)}>click</button>
      <div className="h-32 w-32 rounded-md bg-white shadow-lg mx-auto relative ">
        <Transition
          show={active}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100  scale-100 "
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100  scale-100 "
          leaveTo="opacity-0 scale-95"
        >
          <HiBars3BottomLeft
            onClick={() => setActive((active) => !active)}
            className="text-xl hover:text-opacity-100 absolute mx-auto left-0 right-0"
          ></HiBars3BottomLeft>
        </Transition>

        <Transition
          show={!active}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0 rotate-45 scale-50"
          enterTo="opacity-100  scale-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100  scale-100 "
          leaveTo="opacity-0 scale-95 "
        >
          {/* <div className="h-32 w-32 rounded-md bg-red-500 shadow-lg" /> */}
          <HiOutlineXMark
            onClick={() => setActive((active) => !active)}
            className="text-xl hover:text-opacity-100 absolute rotate-0 mx-auto left-0 right-0 bg-red-500"
          ></HiOutlineXMark>
        </Transition>
      </div>
    </div>
  );
};

export default Contact;
