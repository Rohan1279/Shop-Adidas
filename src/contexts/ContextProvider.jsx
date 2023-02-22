import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getStoredCart } from "../utils/fakeDB";

export const Context = createContext();
const ContextProvider = ({ children }) => {
  // cart data loader
  const initialCart = [];
  const storedProducts = getStoredCart(); //! products with id
  for (const id in storedProducts) {
    const foundProduct = products.find((product) => product.id === id);
    if (foundProduct) {
      foundProduct.quantity = storedProducts[id];
      initialCart.push(foundProduct);
    }
  }
  const [cart, setCart] = useState(initialCart);

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

  if (isLoading) {
    return <h2 className="text-4xl text-center">Loading</h2>;
  }

  return (
    <Context.Provider value={{ products, categories, cart, setCart }}>
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;
