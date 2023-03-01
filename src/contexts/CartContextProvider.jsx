// import React, { createContext, useState } from "react";
// import { dataLoader } from "../utils/dataLoader";
// import { getStoredCart } from "../utils/fakeDB";
// import { Context } from "./ContextProvider";

// export const CartContext = createContext();
// const CartContextProvider = ({ children }) => {
//   const { products } = dataLoader();
//   const storedProducts = getStoredCart(); //! products with id
//   const initialCart = [];
//   for (const _id in storedProducts) {
//     const foundProduct = products?.find((product) => product._id === _id);
//     if (foundProduct) {
//       foundProduct.quantity = storedProducts[_id];
//       initialCart.push(foundProduct);
//     }
//   }

//   return 
//   <Context.Provider value=[cart, setCart]></Context.Provider>
// };

// export default CartContextProvider;
