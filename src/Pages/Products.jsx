import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import BannerCard from "../components/BannerCard/BannerCard";
import { Context } from "../contexts/ContextProvider";

//! add pagination feature
const Products = () => {
  // const products = useLoaderData();
  const { products } = useContext(Context);
  console.log(products);

  return (
    <div>
      <h1 className="text-center text-5xl my-10">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 transition-all">
        {products?.map((product) => (
          <BannerCard
            key={product._id}
            cardImage={product.img}
            cardTitle={product.name}
            classes={"text-lg"}
          ></BannerCard>
        ))}
      </div>
    </div>
  );
};

export default Products;
