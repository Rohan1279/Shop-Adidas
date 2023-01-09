import React, { useEffect, useRef, useState } from "react";
import BannerCard from "../../components/BannerCard/BannerCard";
import Button from "../../components/Button/Button";

const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);
  const bannerImageRef = useRef();
  const [bannerImageInitialHeight, setBannerImageInitialHeight] = useState();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setBannerImageInitialHeight(bannerImageRef?.current?.clientHeight);
    });
  }, [bannerImageRef?.current?.clientHeight]);
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
        className={`sm:grid grid-cols-2 h-[44rem] gap-y-[50%] gap-x-2 overflow-scroll overflow-x-auto px-2`}
      >
        <BannerCard
          classes={"text-2xl"}
          cardImage={
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg"
          }
          cardTitle={"Sneaker"}
          cardDescription={"150 products"}
        />
        <BannerCard
          classes={"text-2xl"}
          cardImage={
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9c7058d8677742ac8519ac3f009cdcf4_9366/Tiro_21_Track_Pants_Black_GH7305_21_model.jpg"
          }
          cardTitle={"Men's Pent"}
          cardDescription={"150 products"}
        />
        <BannerCard
          classes={"text-2xl"}
          cardImage={
            "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/a520df1b51384c00af9caca100489f04_9366/Trefoil_Backpack_Black_EX6752_01_standard.jpg"
          }
          cardTitle={"Bag"}
          cardDescription={"150 products"}
        />
        <BannerCard
          classes={"text-2xl"}
          cardImage={
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/12cf12ac1c8e484ea487ad6400ee3444_9366/Terrex_Free_Hiker_Gore-Tex_Hiking_Shoes_Black_GZ0355_01_standard.jpg"
          }
          cardTitle={"Men's Boot"}
          cardDescription={"150 products"}
        />
        <BannerCard
          classes={"text-2xl"}
          cardImage={
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/12cf12ac1c8e484ea487ad6400ee3444_9366/Terrex_Free_Hiker_Gore-Tex_Hiking_Shoes_Black_GZ0355_01_standard.jpg"
          }
          cardTitle={"Men's Boot"}
          cardDescription={"150 products"}
        />
        <BannerCard
          classes={"text-2xl"}
          cardImage={
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/12cf12ac1c8e484ea487ad6400ee3444_9366/Terrex_Free_Hiker_Gore-Tex_Hiking_Shoes_Black_GZ0355_01_standard.jpg"
          }
          cardTitle={"Men's Boot"}
          cardDescription={"150 products"}
        />
      </div>
    </div>
  );
};

export default Banner;
