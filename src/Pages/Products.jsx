import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import BannerCard from "../components/BannerCard/BannerCard";
import { Context } from "../contexts/ContextProvider";
import Button from "../components/Button/Button";

//! add pagination feature
const Products = () => {
  const { products, categories } = useContext(Context);
  return (
    <div>
      <h1 className="text-center text-5xl my-10">All Products</h1>
      <div className="flex justify-center items-center my-8 ">
        <Button classes={"w-36 rounded-md border-slate-300 mx-5"}>All</Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            data={category}
            classes={"w-36 rounded-md border-slate-300  mx-5"}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 transition-all">
        {products?.map((product) => (
          <BannerCard
            key={product._id}
            data={product}
            classes={"text-lg"}
          ></BannerCard>
        ))}
      </div>
    </div>
  );
};

export default Products;
