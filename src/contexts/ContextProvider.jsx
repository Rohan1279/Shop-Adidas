import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { dataLoader } from "../utils/dataLoader";
import { getStoredCart } from "../utils/fakeDB";

export const Context = createContext();
const ContextProvider = ({ children }) => {
  const { products, categories, initialCart } = dataLoader();
  // console.log("initialCart", initialCart);
  const [cart, setCart] = useState(initialCart);
  // console.log("initialCart", initialCart);

  // if (isLoading) {
  //   return <h2 className="text-4xl text-center">Loading</h2>;
  // }

  return (
    <Context.Provider
      value={{ products, categories, cart, setCart, initialCart }}
    >
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;
