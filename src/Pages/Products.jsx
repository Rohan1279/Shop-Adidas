import React from "react";
import { useLoaderData } from "react-router-dom";
import BannerCard from "../components/BannerCard/BannerCard";

//! add pagination feature
const Products = () => {
  const products = useLoaderData();
  // console.log(products);
  return (
    <div>
      <h1 className="text-center text-5xl my-10">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <BannerCard
           key={product._id}
           cardImage={product.img}
           cardTitle={product.name}
           classes={"text-xl"}
           ></BannerCard>
        ))}
      </div>
    </div>
  );
};

export default Products;
