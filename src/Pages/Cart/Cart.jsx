import React, { useContext } from "react";
import { Context } from "../../contexts/ContextProvider";

const Cart = () => {
  const { products, cart, setCart } = useContext(Context);
  console.log(cart);
  // if (!isLoading) {
  const initialCart = [];
  for (const _id in cart) {
    const foundProduct = products?.find((product) => product._id === _id);
    if (foundProduct) {
      foundProduct.quantity = cart[_id];
      initialCart.push(foundProduct);
    }
  }
  console.log(initialCart);
  return (
    <div className="h-screen">
      {initialCart?.map((product, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center border border-white w-96 p-4 my-5 mx-auto"
        >
          <img src={product.img} alt="" className="w-1/4" />
          <h2>{product.name}</h2>
          <h2>{product.quantity}</h2>
        </div>
      ))}
    </div>
  );
};

export default Cart;
