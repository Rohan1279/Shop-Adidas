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
import { dataLoader } from "../../utils/dataLoader";
import Cookies from "js-cookie";

//! add pagination feature
const Products = () => {
  // const { products, categories, isSuccess, isFetching,isLoading } = useContext(Context);
  const { products, categories, isSuccess, isLoading } = dataLoader();
  const fixedCategories = categories?.filter((category) => category.id !== "0");
  // console.log(fixedCategories);

  const [categoryProducts, setCategoryProducts] = useState([]);
  const [prevCategory, setPrevCategory] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCategoryProducts(products?.slice(0, 10));
  }, [products]);

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
    // localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
    Cookies.set("selectedProduct", JSON.stringify(selectedProduct));
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
      <div className="min-h-screen px-1 py-20">
        <h1 className="my-10 text-center   text-7xl font-medium tracking-wider  text-gray-600 ">
          All Products
        </h1>
        <div className="my-8 flex w-full flex-wrap items-center justify-between ">
          {fixedCategories?.map((category) => (
            <button
              key={category._id}
              className={`mx-auto my-1 w-44 border border-slate-300 bg-inherit p-2 shadow-nm transition-all active:shadow-nm-inset`}
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
        <div className=" grid grid-cols-1 gap-1 transition-all md:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            <div className="flex h-screen w-screen items-start justify-center">
              {/* <Loader></Loader> */}
              <img
                src="https://i.ibb.co/9bsFzZ2/fashion-6807362-5600842.webp"
                alt=""
                className="animate-pulse "
              />
            </div>
          ) : (
            categoryProducts?.map((product) => (
              <ProductCard
                handler={handleBrowseProduct}
                key={product._id}
                data={product}
                classes={"text-lg"}
              ></ProductCard>
            ))
          )}
        </div>
      </div>
    </Transition>
  );
};

export default Products;
