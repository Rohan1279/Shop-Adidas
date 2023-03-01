import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { dataLoader } from "../utils/dataLoader";
import { getStoredCart } from "../utils/fakeDB";

export const Context = createContext();
const ContextProvider = ({ children }) => {
  const { products, categories, isLoading } = dataLoader();
  // const storedProducts = getStoredCart(); //! products with id
  // const initialCart = [];
  // for (const _id in storedProducts) {
  //   const foundProduct = products?.find((product) => product._id === _id);
  //   if (foundProduct) {
  //     foundProduct.quantity = storedProducts[_id];
  //     initialCart.push(foundProduct);
  //   }
  // }
  // const [cart, setCart] = useState(initialCart);

  if (isLoading) {
    return <h2 className="text-4xl text-center">Loading</h2>;
  } else
    return (
      <Context.Provider
        value={{
          products,
          categories,
        }}
      >
        {children}
      </Context.Provider>
    );
};
export default ContextProvider;
