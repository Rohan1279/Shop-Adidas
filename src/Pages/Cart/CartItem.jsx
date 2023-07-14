import { Transition } from "@headlessui/react";
import React, { useState } from "react";

const CartItem = ({ product, handleRemoveItem, cart }) => {
  const { _id, name, price, quantity, img, size } = product;
  const [isShowing, setIsShowing] = useState(true);
  return (
    <div>
      {/* <Transition
        show={isShowing}
        enter="transition-all duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-all duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      > */}
      {/* <div>
          I will fade in and out
          <button
            type="button"
            className="flex items-center px-2 py-1 pl-0 space-x-1 ml-auto mr-0"
            onClick={() => {
              handleRemoveItem(_id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-4 h-4 fill-current"
            >
              <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
              <rect width="32" height="200" x="168" y="216"></rect>
              <rect width="32" height="200" x="240" y="216"></rect>
              <rect width="32" height="200" x="312" y="216"></rect>
              <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
            </svg>
            <span>Remove</span>
          </button>
        </div> */}

      <div
        className={`p- my-5  mx-auto flex min-w-fit max-w-2xl  border border-gray-300 text-lg`}
      >
        <img src={img} alt="" className="w-48" />
        <div className="p-4">
          <h2>{name}</h2>
          <h2 className="text-gray-500">{quantity}</h2>
          <h2 className="text-gray-500">Size: {product?.size}</h2>
          <h2 className="text-gray-500">
            Total: ${(price * quantity).toFixed(2)}
          </h2>
          <button
            type="button"
            className="ml-auto mr-0  flex items-center space-x-1 px-2 py-1 pl-0"
            onClick={() => {
              // setIsShowing(!isShowing);
              handleRemoveItem(_id, size);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-4 w-4 fill-current"
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
      {/* </Transition> */}
    </div>
  );
};

export default CartItem;
