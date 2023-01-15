import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import BannerCard from "../../components/BannerCard/BannerCard";
import { Context } from "../../contexts/ContextProvider";
import Button from "../../components/Button/Button";

//! add pagination feature
const Products = () => {
  const { products, categories } = useContext(Context);
  const [categoryProducts, setCategoryProducts] = useState(products);
  const navigate = useNavigate();
  const handleFilterProducts = (id) => {
    let categoryProducts = [];

    if (id !== "63c3afa0bdcbcbf3434dcc74") {
      categoryProducts = products.filter((product) =>
        product.category_id.includes(id)
      );
    } else categoryProducts = products;
    setCategoryProducts(categoryProducts);
  };
  const handleBrowseProduct = (id) => {
    const selectedProduct = products.find((product) => product._id === id);
    console.log(selectedProduct);

    navigate(`/products/product/${id}`, { state: selectedProduct });
  };
  return (
    <div>
      <h1 className="text-center text-5xl my-10">All Products</h1>
      <div className="flex justify-center items-center my-8 ">
        {categories.map((category) => (
          <Button
            key={category.id}
            data={category}
            handler={handleFilterProducts}
            classes={"w-36  border-slate-300  mx-5"}
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
