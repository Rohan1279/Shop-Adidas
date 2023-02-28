import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Context } from "../../contexts/ContextProvider";

const Cart = () => {
  const { products, cart, setCart, initialCart } = useContext(Context);
  return (
    <div className="h-fit md:flex justify-evenly">
      <div className="">
        <h2 className="text-3xl font-extrabold">Your Cart</h2>
        {initialCart?.map((product, idx) => (
          <div
            key={idx}
            className="flex text-lg border border-white max-w-4xl min-w-fit  p- my-5 mx-auto"
          >
            {/* <LazyLoadImage
            effect="blur"
            src={product.img}
            className="w-1/2 "
          ></LazyLoadImage> */}
            <img src={product.img} alt="" className="w-1/4" />
            <div className="p-4">
              <h2>{product.name}</h2>
              <h2>{product.quantity}</h2>
              <h2>${product.price}</h2>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-3xl font-extrabold">Order Summary</h2>
      </div>
    </div>
  );
};

export default Cart;
