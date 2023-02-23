import React, { useContext } from "react";
import { Context } from "../../contexts/ContextProvider";

const Cart = () => {
  const { cart, setCart } = useContext(Context);
  console.log(cart);
  return (
    <div>
      {cart.map((product) => (
        <div
          key={product._id}
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
