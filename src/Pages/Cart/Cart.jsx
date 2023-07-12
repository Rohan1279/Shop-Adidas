import { Transition } from "@headlessui/react";
import React, { useContext, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Context } from "../../contexts/ContextProvider";
import { CartContext } from "../../Layout/Main";
import { removeFromDb } from "../../utils/fakeDB";
import CartItem from "./CartItem";
import { BsCartX } from "react-icons/bs";
import { dataLoader } from "../../utils/dataLoader";
const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  console.log(cart);
  // const { products, categories } = useContext(Context);
  const { products, categories, isSuccess, isFetching } = dataLoader();
  // const [remainingCart, setRemainingCart] = useState(cart);
  console.log(cart);
  let totalPrice = cart
    .map((product) => product?.price * product?.quantity)
    .reduce((a, b) => a + b, 0);
  const handleRemoveItem = (_id, size) => {
    const remaining = cart?.filter((product) => {
      product._id !== _id && product.size !== size;
    });
    setCart(remaining);
    removeFromDb(_id);
  };
  return (
    <div className="mt-10 h-screen justify-center gap-x-36 pt-20 md:flex">
      <div className="overflow-scroll ">
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
          {cart?.map((product, idx) => (
            <CartItem
              key={idx}
              product={product}
              handleRemoveItem={handleRemoveItem}
              cart={cart}
              // isShowing={isShowing}
            ></CartItem>
          ))}
          {cart?.length === 0 && (
            <div className="space-y-2 text-center ">
              <BsCartX className="mx-auto text-4xl lg:ml-0"></BsCartX>
              <p>Looks like your cart is empty. Add something in your cart.</p>
            </div>
          )}
        </Transition>
      </div>
      <div className=" mx-2 lg:w-96">
        <h2 className="mb-5 text-center text-3xl font-extrabold text-black lg:text-left">
          Order Summary
        </h2>
        <div className="leading-7 ">
          <p className="flex justify-between">
            Total Products:{" "}
            <span className="text-gray-500">{cart?.length}</span>{" "}
          </p>
          <p className="flex justify-between">
            Subtotal: <span className="text-gray-500">${totalPrice}</span>
          </p>
          <p className="flex justify-between">
            Delivery: <span className="text-gray-500">$0</span>
          </p>
          <hr className="my-3 border-gray-400" />
          <p className="flex justify-between">
            Total: <span className="text-gray-500">${totalPrice}</span>
          </p>
          <hr className="my-3 border-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
