import { Transition } from "@headlessui/react";
import React, { useState } from "react";

const CartItem = ({ product, handleRemoveItem, cart }) => {
  const { _id, name, price, quantity, img, size, color } = product;
  const [isVisible, setIsVisible] = useState(true);
  // console.log(product);
  return (
    <Transition
      // appear={true}
      show={isVisible}
      enter="transition-all duration-[400ms]"
      enterFrom="opacity-0 "
      enterTo="opacity-100 "
      leave="transition-all duration-[400ms] ease-out "
      leaveFrom="opacity-100 -translate-y-0"
      leaveTo="opacity-0 -translate-y-14"
    >
      <div className="md:w-[36rem] px-5 md:px-0">
        <div
          className={`relative my-5 mx-auto flex  border border-gray-300 bg-primary-color text-lg `}
        >
          <img src={img} alt="" className="w-48" />
          <div className="flex-1 p-4">
            <h2 className="text-lg font-semibold tracking-wider  text-gray-700 ">
              {name}
            </h2>
            <h2 className="text-base  font-medium tracking-wider  text-gray-700">
              {color}
            </h2>
            <span>
              <h2 className="text-sm font-medium tracking-wider  text-gray-700">
                Quantity: {quantity}
              </h2>
              <h2 className="text-sm font-medium tracking-wider  text-gray-700">
                Size: {product?.size}
              </h2>
              <h2 className="text-sm font-medium tracking-wider  text-gray-700 ">
                Total: ${(price * quantity).toFixed(2)}
              </h2>
            </span>
            <button
              type="button"
              className="absolute bottom-3 right-3 flex  items-center space-x-1 bg-gray-300 px-2 py-1 "
              onClick={() => {
                setIsVisible(false);
                handleRemoveItem(_id, size);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-4 w-4 fill-current "
              >
                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                <rect width="32" height="200" x="168" y="216"></rect>
                <rect width="32" height="200" x="240" y="216"></rect>
                <rect width="32" height="200" x="312" y="216"></rect>
                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
              </svg>
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default CartItem;
