import React from "react";
import { useLoaderData } from "react-router-dom";
import BannerCard from "../components/BannerCard/BannerCard";

//! add pagination feature
const Products = () => {
  const products = useLoaderData();
  console.log(products);
  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
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
