import React from "react";
import { useLocation } from "react-router-dom";
import BannerCard from "../../components/BannerCard/BannerCard";

const ProductDetail = () => {
  const { state } = useLocation();
  console.log(state);

  return (
    <div>
      <h1 className="text-center text-4xl my-5">Product Detail page</h1>
      <BannerCard data={state} classes={"text-lg"}></BannerCard>
    </div>
  );
};

export default ProductDetail;
