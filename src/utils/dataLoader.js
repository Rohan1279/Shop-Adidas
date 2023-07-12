import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../contexts/ContextProvider";

export const dataLoader = () => {
  const {
    data: products = [],
    isLoading,
    isSuccess,
    isFetching,
  } = useQuery({
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

  if (isSuccess)
    return { products, categories, isLoading, isSuccess, isFetching };
  else return { isLoading };
};
