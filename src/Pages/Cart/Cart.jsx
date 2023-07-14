import { Transition } from "@headlessui/react";
import React, { useContext, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Context } from "../../contexts/ContextProvider";
import { CartContext } from "../../Layout/Main";
import { removeFromDb, useCart } from "../../utils/fakeDB";
import CartItem from "./CartItem";
import { BsCartX } from "react-icons/bs";
import { dataLoader } from "../../utils/dataLoader";
const Cart = () => {
  const { cart, setCart, getStoredCart, addToCart } = useContext(CartContext);

  const { products, categories, isSuccess, isFetching } = dataLoader();
  let totalPrice = getStoredCart()
    .map((product) => product?.price * product?.quantity)
    .reduce((a, b) => a + b, 0);
  const handleRemoveItem = (_id, size) => {
    const remaining = getStoredCart()?.filter(
      (product) => product._id !== _id || product.size !== size
    );
    setCart(remaining);
    addToCart(remaining);
  };
  return (
    <div className="relative mx-auto h-screen max-w-7xl justify-between gap-x-36 pt-24 md:flex">
      <div className="">
        <h2 className="text-center text-3xl font-extrabold lg:text-left">
          Your Cart
        </h2>
        <Transition
          appear={true}
          show={true}
          enter="transition-all duration-[400ms]"
          enterFrom="opacity-0 "
          enterTo="opacity-100 "
          leave="transition-all duration-[400ms]"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="max-h-[36rem] md:max-h-[44rem] overflow-scroll border ">
            {getStoredCart()?.map((product, idx) => (
              <CartItem
                key={idx}
                product={product}
                handleRemoveItem={handleRemoveItem}
                cart={getStoredCart()}
                // isShowing={isShowing}
              ></CartItem>
            ))}
            {getStoredCart()?.length === 0 && (
              <div className="space-y-2 text-center ">
                <BsCartX className="mx-auto text-4xl lg:ml-0"></BsCartX>
                <p>
                  Looks like your cart is empty. Add something in your cart.
                </p>
              </div>
            )}
          </div>
        </Transition>
      </div>
      <div
        className=" absolute bottom-0
      w-screen bg-primary-color px-2 md:static 
      md:mx-2 md:w-96 md:bg-secondary-color  md:px-0 pb-16 md:pb-0"
      >
        <h2 className=" text-center text-3xl font-extrabold text-black md:mb-5 lg:text-left">
          Order Summary
        </h2>
        <div className="leading-7 ">
          <p className="flex justify-between">
            Total Products:{" "}
            <span className="text-gray-500">{getStoredCart()?.length}</span>{" "}
          </p>
          <p className="flex justify-between">
            Subtotal: <span className="text-gray-500">${totalPrice}</span>
          </p>
          <p className="flex justify-between">
            Delivery: <span className="text-gray-500">$0</span>
          </p>
          <hr className="my-3  border-gray-400 md:block" />
          <p className="flex justify-between">
            Total: <span className="text-gray-500">${totalPrice}</span>
          </p>
          <hr className="my-3 hidden border-gray-400 md:block" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
