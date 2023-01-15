import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerCard from "../../../components/BannerCard/BannerCard";
import Button from "../../../components/Button/Button";
import { Context } from "../../../contexts/ContextProvider";
import "./Banner.css";
const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { categories, products } = useContext(Context);
  const bannerImageRef = useRef();
  const navigate = useNavigate();
  const [bannerImageInitialHeight, setBannerImageInitialHeight] = useState();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setBannerImageInitialHeight(bannerImageRef?.current?.clientHeight);
    });
  }, [bannerImageRef?.current?.clientHeight]);
  const handleBrowseCategory = (id) => {
    console.log(id);
    const categoryProducts = products.filter((product) =>
      product.category_id.includes(id)
    );
    console.log(categoryProducts);
    navigate(`/categories/${id}`, { state: categoryProducts });
  };
  return (
    <div className="md:flex justify-center items-center w-auto gap-x-1 transition-all ">
      <div className="w-auto mb-10 md:mb-0 relative bg-gradient-to-br from-white to-zinc-500">
        <img
          onLoad={(e) => setBannerImageInitialHeight(e.target.clientHeight)}
          id="banner-image"
          ref={bannerImageRef}
          src="https://i.ibb.co/34Xkt24/adidas-Fall-Sale-2021-1000x600.jpg"
          alt=""
          className="relative opacity-50"
        />
        <div className="absolute inset-y-0 inset-x-0 mx-auto my-auto  font-extrabold text-white w-3/4 h-fit text-center md:text-left ">
          <h2 className="w-full mb-4 text-3xl sm:text-5xl">
            We are Shop Adidas{" "}
          </h2>
          <p className="text-black">
            Lorem, ipsum dolor sit amet consectetur adipisicing.
          </p>
          <Button
            classes={
              "w-40 mt-4 bg-white/95 text-zinc-600 sm:text-lg rounded-md"
            }
          >
            Purchase Now!
          </Button>
        </div>
      </div>
      {/* translate-y-3/4 hover:translate-y-12 transition-all duration-500 */}

      <div
        style={{
          height: `${bannerImageInitialHeight}px`,
        }}
        id="category-section"
        className={`sm:grid grid-cols-2 sm:gap-y-[80%] md:gap-y-[48%] lg:gap-y-[48%] gap-x-2 overflow-scroll overflow-x-auto px-2`}
      >
        {categories?.map((category) => (
          <BannerCard
            key={category.id}
            classes={""}
            data={category}
            handler={handleBrowseCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
