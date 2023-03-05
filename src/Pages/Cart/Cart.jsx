import { Transition } from "@headlessui/react";
import React, { useContext, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Context } from "../../contexts/ContextProvider";
import { CartContext } from "../../Layout/Main";
import { removeFromDb } from "../../utils/fakeDB";
import CartItem from "./CartItem";
import { BsCartX } from "react-icons/bs";
const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  const { products, categories } = useContext(Context);
  // const [remainingCart, setRemainingCart] = useState(cart);
  console.log(cart);
  let totalPrice = cart
    .map((product) => product?.price * product?.quantity)
    .reduce((a, b) => a + b, 0);
  const handleRemoveItem = (_id) => {
    const remaining = cart?.filter((product) => product._id !== _id);
    setCart(remaining);
    // setRemainingCart(remaining);
    removeFromDb(_id);
    // toast.warning("Product removed", { autoClose: 500 });
  };
  return (
    <div className="h-screen md:flex justify-center gap-x-36">
      <div className="overflow-scroll ">
        <h2 className="text-3xl font-extrabold text-center lg:text-left">
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
          {cart?.map((product) => (
            <CartItem
              key={product._id}
              product={product}
              handleRemoveItem={handleRemoveItem}
              cart={cart}
              // isShowing={isShowing}
            ></CartItem>
          ))}
          {cart?.length === 0 && (
            <div className="text-center space-y-2 ">
              <BsCartX className="text-4xl mx-auto lg:ml-0"></BsCartX>
              <p>Looks like your cart is empty. Add something in your cart.</p>
            </div>
          )}
        </Transition>
      </div>
      <div className=" lg:w-96 mx-2">
        <h2 className="text-3xl font-extrabold mb-5 text-black text-center lg:text-left">
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
          <hr className="border-gray-400 my-3" />
          <p className="flex justify-between">
            Total: <span className="text-gray-500">${totalPrice}</span>
          </p>
          <hr className="border-gray-400 my-3" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
