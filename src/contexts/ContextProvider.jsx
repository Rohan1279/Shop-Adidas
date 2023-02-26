import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { dataLoader } from "../utils/dataLoader";
import { getStoredCart } from "../utils/fakeDB";

export const Context = createContext();
const ContextProvider = ({ children }) => {
  // const { products, categories, isLoading } = dataLoader();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/products`
      );
      return res.data;
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/categories`
      );
      return res.data;
    },
  });

  const storedProducts = getStoredCart(); //! products with id
  const [cart, setCart] = useState(storedProducts);

  // if (isLoading) {
  //   return <h2 className="text-4xl text-center">Loading</h2>;
  // }
  return (
    <Context.Provider
      value={{ products, categories, cart, setCart, isLoading, storedProducts }}
    >
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;
