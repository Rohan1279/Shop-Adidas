import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Context } from "../../contexts/ContextProvider";
import { CartContext } from "../../Layout/Main";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  console.log(cart);
  let totalPrice = cart
    .map((product) => product?.price * product?.quantity)
    .reduce((a, b) => a + b, 0);
  return (
    <div className="h-fit md:flex justify-center gap-x-36">
      <div className="">
        <h2 className="text-3xl font-extrabold">Your Cart</h2>
        {cart?.map((product, idx) => (
          <div
            key={idx}
            className="flex text-lg border border-gray-300 max-w-2xl min-w-fit  p- my-5 mx-auto"
          >
            {/* <LazyLoadImage
            effect="blur"
            src={product.img}
            className="w-1/2 "
          ></LazyLoadImage> */}
            <img src={product.img} alt="" className="w-1/4" />
            <div className="p-4">
              <h2>{product.name}</h2>
              <h2 className="text-gray-500">{product.quantity}</h2>
              <h2 className="text-gray-500">Size: {product?.size}</h2>
              <h2 className="text-gray-500">
                Total: ${(product.price * product.quantity).toFixed(2)}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <div className=" w-96">
        <h2 className="text-3xl font-extrabold mb-5 text-black">
          Order Summary
        </h2>
        <div className="leading-7">
          <p className="flex justify-between">
            Total Products:{" "}
            <span className="text-gray-500">{cart?.length}</span>{" "}
          </p>
          <p className="flex justify-between">
            Subtotal: <span className="text-gray-500">${totalPrice}</span>
          </p>
          <p className="flex justify-between">
            Delivary: <span className="text-gray-500">$0</span>
          </p>
          <hr className="border border-gray-400 my-3" />
          <p className="flex justify-between">
            Total: <span className="text-gray-500">${totalPrice}</span>
          </p>
          <hr className="border border-gray-400 my-3" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
