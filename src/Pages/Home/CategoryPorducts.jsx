import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BannerCard from "../../components/BannerCard/BannerCard";
import ProductCard from "../../components/ProductCard/ProductCard";

const CategoryPorducts = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);

  const handleBrowseProduct = (id) => {
    const selectedProduct = state.find((product) => product._id === id);
    console.log(selectedProduct);
    navigate(`/products/product/${id}`, { state: selectedProduct });
  };
  return (
    <div>
      <div className="grid grid-cols-1 gap-2  pt-24 transition-all sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {state?.map((product) => (
          <ProductCard
            handler={handleBrowseProduct}
            key={product._id}
            data={product}
            classes={"text-lg"}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default CategoryPorducts;
