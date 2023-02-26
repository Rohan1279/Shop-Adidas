import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Context } from "../../contexts/ContextProvider";

const Cart = () => {
  const { products, cart, setCart, initialCart } = useContext(Context);
  console.log(initialCart);
  // if (!isLoading) {

  // console.log(initialCart);
  return (
    <div className="h-screen">
      {initialCart?.map((product, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center border border-white w-96 p-4 my-5 mx-auto"
        >
          <LazyLoadImage
            effect="opacity"
            src={product.img}
            className="w-1/4"
          ></LazyLoadImage>
          {/* <img src={product.img} alt="" className="w-1/4" /> */}
          <h2>{product.name}</h2>
          <h2>{product.quantity}</h2>
        </div>
      ))}
    </div>
  );
};

export default Cart;
