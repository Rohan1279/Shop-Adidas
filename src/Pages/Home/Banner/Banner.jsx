import React, { useContext, useEffect, useRef, useState } from "react";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import BannerCard from "../../../components/BannerCard/BannerCard";
import Button from "../../../components/Button/Button";
import DelayedFadeInComponent from "../../../components/DelayedComponent/DelayedComponent";
import { Context } from "../../../contexts/ContextProvider";
import "./Banner.css";
import { dataLoader } from "../../../utils/dataLoader";
import Carousel from "../../../components/Carousal/Carousal";
const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { categories, products, isLoading } = useContext(Context);
  // const { products, categories, isSuccess, isFetching } = dataLoader();
  // console.log(categories);

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
    let categoryProducts = [];
    if (id !== "63c3afa0bdcbcbf3434dcc74") {
      categoryProducts = products.filter(
        (product) => product.category_id === id
      );
    } else categoryProducts = products;

    navigate(`/categories/${id}`, { state: categoryProducts });
  };
  return (
    <LazyLoadComponent>
      <div className="w-auto items-center justify-center gap-x-1 transition-all md:flex ">
        <div className="relative mb-10 w-auto bg-gradient-to-br from-white to-zinc-500 md:mb-0">
          <img
            onLoad={(e) => setBannerImageInitialHeight(e.target.clientHeight)}
            id="banner-image"
            ref={bannerImageRef}
            src="https://i.ibb.co/34Xkt24/adidas-Fall-Sale-2021-1000x600.jpg"
            alt=""
            className="relative opacity-50"
          />
          <div className="absolute inset-y-0 inset-x-0 mx-auto my-auto  h-fit w-3/4 text-center font-extrabold   md:text-left ">
            <h2 className="mb-4 w-full text-3xl text-[#333533] drop-shadow-2xl sm:text-5xl">
              We are Shop Adidas{" "}
            </h2>
            <p className="text-black ">Elevate Your Style with Confidence!</p>
            <Link to={"/products"}>
              <Button
                classes={
                  "w-40 mt-4 bg-white/95 text-zinc-600 sm:text-lg rounded-md"
                }
              >
                Purchase Now!
              </Button>
            </Link>
          </div>
        </div>
        {/* translate-y-3/4 hover:translate-y-12 transition-all duration-500 */}

        <div
          style={{
            height: `${bannerImageInitialHeight}px`,
          }}
          id="category-section"
          className={`grid-cols-2 gap-x-2 overflow-scroll overflow-x-auto px-2 sm:grid sm:gap-y-[80%] md:gap-y-[48%] lg:gap-y-[48%]`}
        >
          {categories?.map((category) => (
            <BannerCard
              key={category.id}
              classes={""}
              data={category}
              handler={handleBrowseCategory}
            />
          ))}
          {/* {categories && <Carousel data={categories} />} */}
        </div>
      </div>
    </LazyLoadComponent>
  );
};

export default Banner;
