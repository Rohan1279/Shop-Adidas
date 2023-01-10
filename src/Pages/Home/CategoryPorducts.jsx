import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BannerCard from "../../components/BannerCard/BannerCard";

const CategoryPorducts = () => {
  const { state } = useLocation();
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 transition-all">
        {state?.map((product) => (
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

export default CategoryPorducts;
