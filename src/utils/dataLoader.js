import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../contexts/ContextProvider";
import { getStoredCart } from "./fakeDB";

export const dataLoader = () => {
  // const { products } = useContext(Context);
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
  const initialCart = [];
  for (const _id in storedProducts) {
    const foundProduct = products.find((product) => product._id === _id);
    if (foundProduct) {
      foundProduct.quantity = storedProducts[_id];
      initialCart.push(foundProduct);
    }
  }
  // console.log("initialCart", initialCart);
  // if (!isLoading) {
  // }
  return { products, categories, initialCart };
};
