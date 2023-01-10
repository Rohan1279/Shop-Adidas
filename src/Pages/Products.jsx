import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import BannerCard from "../components/BannerCard/BannerCard";
import { Context } from "../contexts/ContextProvider";
import Button from "../components/Button/Button";

//! add pagination feature
const Products = () => {
  const { products, categories } = useContext(Context);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const handleFilterProducts = (id) => {
    const filteredProducts = products.filter((product) =>
      product.category_id.includes(id)
    );
    setCategoryProducts(filteredProducts);
  };
  const handleBrowseProduct = (id) => {
    console.log(id);
  };
  return (
    <div>
      <h1 className="text-center text-5xl my-10">All Products</h1>
      <div className="flex justify-center items-center my-8 ">
        <Button classes={"w-36 rounded-md border-slate-300 mx-5"}>All</Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            data={category}
            handler={handleFilterProducts}
            classes={"w-36 rounded-md border-slate-300  mx-5"}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 transition-all">
        {categoryProducts?.map((product) => (
          // <h1>{product.name}</h1>
          <BannerCard
            handler={handleBrowseProduct}
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
