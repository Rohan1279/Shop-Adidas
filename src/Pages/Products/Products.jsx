import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import BannerCard from "../../components/BannerCard/BannerCard";
import { Context } from "../../contexts/ContextProvider";
import Button from "../../components/Button/Button";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Transition } from "@headlessui/react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Loader from "../../components/Loader/Loader";

//! add pagination feature
const Products = () => {
  const { products, categories, isSuccess, isFetching } = useContext(Context);
  const fixedCategories = categories.filter((category) => category.id !== "0");

  const [categoryProducts, setCategoryProducts] = useState(
    products.slice(0, 10)
  );
  const [prevCategory, setPrevCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  // }, [products]);
  // if (products.length < 1) {
  //   setIsLoading(true);
  // }
  console.log(isFetching);

  const handleFilterProducts = (e, id) => {
    setPrevCategory(e);
    e.target?.classList?.add("shadow-nm-inset");
    // let categoryProducts = [];
    if (id !== "63c3afa0bdcbcbf3434dcc74") {
      prevCategory?.target?.classList?.remove("shadow-nm-inset");
      setCategoryProducts(
        products?.filter((product) => product?.category_id === id)
      );
    } else {
      setCategoryProducts(products);
    }

    // if (condition) {

    // }
    // setCategoryProducts(categoryProducts);
  };
  const handleBrowseProduct = (id) => {
    const selectedProduct = products?.find((product) => product._id === id);
    // console.log(selectedProduct);
    navigate(`/products/product/${id}`, { state: selectedProduct });
  };
  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-all duration-[400ms]"
      enterFrom="opacity-0 "
      enterTo="opacity-100 "
      leave="transition-all duration-[400ms]"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {/* Your content goes here*/}
      {isLoading ? (
        <div className="h-screen bg-red-400 w-fit">
          <Loader></Loader>
        </div>
      ) : (
        <div className="px-1">
          <h1 className="text-center text-5xl my-10">All Products</h1>
          <div className="flex flex-wrap justify-between items-center my-8 w-full ">
            {fixedCategories?.map((category) => (
              <button
                key={category._id}
                className={`w-44 border-slate-300 mx-auto my-1 p-2 border bg-inherit shadow-nm active:shadow-nm-inset transition-all`}
                onClick={(e) => {
                  handleFilterProducts(e, category._id);
                }}

                // handler={handleCurrentSize}
              >
                {category.name}
              </button>
              //    <Button
              //    key={category.id}
              //    data={category}
              //    handler={handleFilterProducts}
              //    classes={"w-44 border-slate-300 mx-auto my-1"}
              //  >
              //    {category.name}
              //  </Button>
            ))}
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 transition-all">
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
      )}
    </Transition>
  );
};

export default Products;
