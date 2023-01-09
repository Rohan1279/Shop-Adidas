import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();
const ContextProvider = ({ children }) => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/products`
      );
      return res.data;
    },
  });
  if (isLoading) {
    return <h2 className="text-4xl text-center">Loading</h2>;
  }

  return <Context.Provider value={products}>{children}</Context.Provider>;
};
export default ContextProvider;
