import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Button from "../Button/Button";
import MyComponent from "../MyComponent";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { Link } from "react-router-dom";

const ProductCard = ({ classes, data, handler }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      onMouseEnter={() => setIsHovered(!isHovered)}
      onMouseLeave={() => setIsHovered(!isHovered)}
      onClick={() => handler(data._id)}
      className="group relative block cursor-pointer overflow-hidden bg-black"
    >
      <LazyLoadImage
        effect="opacity"
        src={data.img}
        className={`absolute inset-0 h-full w-full object-cover opacity-90  group-hover:opacity-75 ${
          isHovered && "scale-110 "
        } transition-all duration-700`}
      ></LazyLoadImage>
      {/* <img
          alt="product image"
          src={data.img}
          class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
        /> */}

      <div className="relative p-8">
        <p className="text-2xl font-bold text-white">{data.name}</p>
        <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
          {data.color}
        </p>

        <div className="mt-64">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"></div>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;

{
  /* <Transition
        appear={true}
        show={true}
        enter="transition-all "
        enterFrom="opacity-0  "
        enterTo="opacity-100  "
        leave="transition-all "
        leaveFrom="opacity-100 "
        leaveTo="opacity-0"
      ></Transition> */
}
