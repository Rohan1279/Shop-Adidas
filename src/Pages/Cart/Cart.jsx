import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Context } from "../../contexts/ContextProvider";
import { CartContext } from "../../Layout/Main";
import { removeFromDb } from "../../utils/fakeDB";

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  console.log(cart);
  let totalPrice = cart
    .map((product) => product?.price * product?.quantity)
    .reduce((a, b) => a + b, 0);
  const handleRemoveItem = (_id) => {
    const remaining = cart?.filter((product) => product._id !== _id);
    setCart(remaining);
    removeFromDb(_id);
    // toast.warning("Product removed", { autoClose: 500 });
  };
  return (
    <div className="h-screen md:flex justify-center gap-x-36">
      <div className="overflow-scroll">
        <h2 className="text-3xl font-extrabold">Your Cart</h2>
        {cart?.map((product, idx) => (
          <div
            key={idx}
            className="flex text-lg border border-gray-300 max-w-2xl min-w-fit  p- my-5 mx-auto"
          >
            {/* <LazyLoadImage
              effect="opacity"
              src={product.img}
              width={150}
            ></LazyLoadImage> */}
            <img src={product.img} alt="" className="w-1/4" />

            <div className="p-4">
              <h2>{product.name}</h2>
              <h2 className="text-gray-500">{product.quantity}</h2>
              <h2 className="text-gray-500">Size: {product?.size}</h2>
              <h2 className="text-gray-500">
                Total: ${(product.price * product.quantity).toFixed(2)}
              </h2>
              <button
                type="button"
                className="flex items-center px-2 py-1 pl-0 space-x-1 ml-auto"
                onClick={() => handleRemoveItem(product._id)}
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
            </div>
          </div>
        ))}
        {cart?.length === 0 && (
          <p>Looks like your cart is empty. Add something in your cart</p>
        )}
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
