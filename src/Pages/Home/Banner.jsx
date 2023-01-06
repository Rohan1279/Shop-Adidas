import React, { useState } from "react";
import Button from "../../components/Button/Button";

const Banner = () => {
  const [isHovered, setIsHovered] = useState(false)
  // console.log(isHovered)
  return (
    <div className="md:flex justify-center items-center w-auto gap-x-6 transition-all">
      <div 
        className="w-auto mb-10 md:mb-0 relative bg-gradient-to-br from-white to-zinc-500">
        <img
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
              "w-40 mt-4 bg-white/100 text-zinc-600 sm:text-lg rounded-md"
            }
          >
            Purchase Now!
          </Button>
        </div>
      </div>
      {/* translate-y-3/4 hover:translate-y-12 transition-all duration-500 */}
      <div className="sm:grid grid-cols-2 gap-6">
        <div
        onMouseEnter={()=>{
          console.log("enter",isHovered)
          setIsHovered(!isHovered)}
          } 
          onMouseLeave={()=>{
            console.log("leave",isHovered)
            setIsHovered(!isHovered)
          }}
         className="bg-[url('')] overflow-hidden w-fit h-fit relative ">
          <img
            className="md:w-72"
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg"
            alt=""
          />
          {/* translate-y-[68%] hover:translate-y-1/2 transition-all duration-500 */}
          <div className={`absolute inset-y-0 inset-x-0 mx-auto font-extrabold text-white h-full text-center bg-primary-color py-3 translate-y-[75%] transition-all`}>
          
            <h2 className={`${isHovered ? "translate-y-20" : "-translate-y-[0%]"} text-2xl transition-all duration-700 text-black `}>Sneakers</h2>
            <Button
              classes={`bg-white/95 text-zinc-600 mt-2 w- mx-auto w-11/12 inset-x-0 rounded-md ${isHovered ? "-translate-y-[100%]": "translate-y-20"}  transition-all duration-500`}
            >Discover more</Button>
          </div>
        </div>
        <div className="pb-10 md:pb-0 mx-auto bg-[url('')] bg-no-repeat bg-cover relative bg-red-500">
          <img
            className="md:w-72 opacity-70"
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9c7058d8677742ac8519ac3f009cdcf4_9366/Tiro_21_Track_Pants_Black_GH7305_21_model.jpg"
            alt=""
          />
          <div className="absolute inset-y-0 inset-x-0 mx-auto my-auto font-extrabold text-white w-1/2 h-fit text-center md:text-left ">
            <h2 className="mb-4 text-2xl">Men's Pants</h2>
            <p className="text-black">Best pants for you</p>
          </div>
        </div>
        <div className="pb-10 md:pb-0 mx-auto bg-[url('')] bg-no-repeat bg-cover relative">
          <img
            className="md:w-72"
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/0bb325f9cc174ea4bed7ad9e0101b682_9366/Adicolor_Archive_Backpack_Green_HE9804_01_standard.jpg"
            alt=""
          />
          <div className="absolute inset-y-0 inset-x-0 mx-auto my-auto font-extrabold text-white w-1/2 h-fit text-center md:text-left ">
            <h2 className="mb-4 text-2xl">Men's Pants</h2>
            <p className="text-black">Best pants for you</p>
          </div>
        </div>
        <div className="pb-10 md:pb-0 mx-auto bg-[url('')] bg-no-repeat bg-cover relative">
          <img
            className="md:w-72"
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/1e27ae8bbfb647489261ac8e015d181f_9366/Icon_Snapback_Hat_Grey_EX6798_01_standard.jpg"
            alt=""
          />
          <div className="absolute inset-y-0 inset-x-0 mx-auto my-auto font-extrabold text-white w-1/2 h-fit text-center md:text-left ">
            <h2 className="mb-4 text-2xl">Men's Pants</h2>
            <p className="text-black">Best pants for you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
