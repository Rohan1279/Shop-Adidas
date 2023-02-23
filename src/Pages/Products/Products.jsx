import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import BannerCard from "../../components/BannerCard/BannerCard";
import { Context } from "../../contexts/ContextProvider";
import Button from "../../components/Button/Button";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Transition } from "@headlessui/react";
import { PhotoProvider, PhotoView } from "react-photo-view";

//! add pagination feature
const Products = () => {
  const { products, categories } = useContext(Context);
  const [categoryProducts, setCategoryProducts] = useState(products);
  const navigate = useNavigate();
  const handleFilterProducts = (id) => {
    // console.log(id);
    let categoryProducts = [];

    if (id !== "63c3afa0bdcbcbf3434dcc74") {
      categoryProducts = products?.filter(
        (product) => product?.category_id === id
      );
    } else categoryProducts = products;
    setCategoryProducts(categoryProducts);
  };
  const handleBrowseProduct = (id) => {
    const selectedProduct = products.find((product) => product._id === id);
    // console.log(selectedProduct);
    navigate(`/products/product/${id}`, { state: selectedProduct });
  };
  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-all duration-[400ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100 "
      leave="transition-all duration-[400ms]"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {/* Your content goes here*/}
      <div className="px-1">
        <h1 className="text-center text-5xl my-10">All Products</h1>

        <div className="flex justify-between items-center my-8 w-full ">
          {categories.map((category) => (
            <Button
              key={category.id}
              data={category}
              handler={handleFilterProducts}
              classes={"w-44 border-slate-300 mx-auto"}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 transition-all">
          {categoryProducts?.map((product) => (
            <ProductCard
              handler={handleBrowseProduct}
              key={product._id}
              data={product}
              classes={"text-lg"}
            ></ProductCard>
          ))}
        </div>
      </div>
    </Transition>
  );
};

export default Products;
