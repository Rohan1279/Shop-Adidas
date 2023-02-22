import { useContext } from "react";
import { Context } from "../contexts/ContextProvider";

export const cartLoader = async () => {
  const { products } = useContext(Context);
  //   console.log(products);
  return { products };
};
