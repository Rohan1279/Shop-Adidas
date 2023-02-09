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
    <LazyLoadComponent>
      <a
        onClick={() => handler(data._id)}
        class="group relative block bg-black cursor-pointer"
      >
        <LazyLoadImage
          effect="opacity"
          src={data.img}
          className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-75"
        ></LazyLoadImage>
        {/* <img
          alt="product image"
          src={data.img}
          class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
        /> */}

        <div class="relative p-8">
          <p class="text-2xl font-bold text-white">{data.name}</p>
          <p class="text-sm font-medium uppercase tracking-widest text-pink-500">
            {data.color}
          </p>

          <div class="mt-64">
            <div class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"></div>
          </div>
        </div>
      </a>
    </LazyLoadComponent>
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
