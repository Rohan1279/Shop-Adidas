import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Context } from "../contexts/ContextProvider";
import Navbar from "../Shared/Navbar";
import { dataLoader } from "../utils/dataLoader";
import { getStoredCart } from "../utils/fakeDB";

export const CartContext = createContext();
const Main = () => {
  const { products } = dataLoader();
  // console.log(products);
  const storedProducts = getStoredCart(); //! products with id
  // console.log(storedProducts);
  const initialCart = [];
  for (const _id in storedProducts) {
    const foundProduct = products?.find((product) => product._id === _id);
    if (foundProduct) {
      foundProduct.quantity = storedProducts[_id][0];
      foundProduct.size = storedProducts[_id][1];
      initialCart.push(foundProduct);
    }
  }
  // console.log(initialCart);
  const [cart, setCart] = useState(initialCart);

  return (
    <CartContext.Provider value={[cart, setCart, initialCart]}>
      <div className="bg-secondary-color relative pt-24 h-fit">
        <Navbar />
        <Outlet />
      </div>
    </CartContext.Provider>
  );
};

export default Main;
