import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BannerCard from "../../components/BannerCard/BannerCard";

const CategoryPorducts = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleBrowseProduct = (id) => {
    const selectedProduct = state.find((product) => product._id === id);
    console.log(selectedProduct);
    navigate(`/products/product/${id}`, { state: selectedProduct });
  };
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 transition-all">
        {state?.map((product) => (
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

export default CategoryPorducts;
