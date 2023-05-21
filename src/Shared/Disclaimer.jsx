import React, { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

export default function Disclaimer() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={`px- mt-24 flex h-fit justify-center bg-slate-300 ${
        !isOpen && "hidden"
      }`}
    >
      <p className="select-none px-6 py-3 text-center text-[10px] font-medium uppercase tracking-wider text-gray-500 ">
        The product images displayed on this website are for educational and
        learning purposes only. All images used are the property of Adidas and
        are protected by copyright laws. This website does not claim any
        ownership or affiliation with Adidas. The images are used solely for
        educational purposes to showcase web development skills. If you are the
        rightful owner of any of the images and believe that their use on this
        website violates any copyright laws, please contact us, and we will
        promptly remove the images.
      </p>
      <div
        onClick={() => setIsOpen(false)}
        className="grid px-5 w-24 items-center justify-center transition-all hover:bg-slate-200"
      >
        <HiOutlineXMark className="text-xl  text-gray-600"></HiOutlineXMark>
      </div>
    </div>
  );
}
