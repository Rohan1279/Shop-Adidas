import React from "react";
import { useLocation } from "react-router-dom";
import BannerCard from "../../components/BannerCard/BannerCard";

const ProductDetail = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className="px-5">
      <h1 className="text-center text-4xl my-5">Product Detail page</h1>
      {/* <BannerCard data={state} classes={"text-lg"}></BannerCard> */}
      <div className="flex gap-x-20 h-[44rem]">
        <div className="w-1/2 h-fit">
          <img src={state.img} alt="" className="w-full object-cover" />
        </div>
        <div className="w-1/2 shadow-nm px-7 py-5 rounded-md leading-loose">
          <p>{state?.category}</p>
          <h2 className="text-4xl font-extrabold mb-5">{state?.name}</h2>
          <p className="text-xl">{state?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
