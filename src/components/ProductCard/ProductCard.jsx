import React, { useState } from "react";
import Button from "../Button/Button";

const ProductCard = ({ classes, data, handler }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(!isHovered)}
      onMouseLeave={() => setIsHovered(!isHovered)}
      className={`bg-[url('')] overflow-hidden w-fit h-fit relative mx-auto ${classes}`}
    >
      <img
        className={`md:w- ${
          isHovered && "blur-md"
        }  transition-all duration-700`}
        src={data.img}
        alt=""
      />
      {/* translate-y-[68%] hover:translate-y-1/2 transition-all duration-500 */}
      <div
        className={`absolute inset-y-0 inset-x-0 mx-auto font-extrabold text-white w-full h-full bg-[#e6e7ee]/75 backdrop-blur-md translate-y-[75%] transition-all duration-500 ${
          isHovered && "translate-y-[%] pt-0"
        } text-center pt-[7%] `}
      >
        {/* <div className={`bg-red-500 ${isHovered}`}> */}
        <h2
          className={`${
            isHovered && "text- mt-[35%]"
          } text- transition-all duration-700 text-black px-10`}
        >
          {data.name}
        </h2>
        {/* <p className="text-black text-lg">{cardDescription}</p> */}
        {/* ${isHovered ? "-translate-y-[100%]" : "translate-y-20" }transition-all duration-500 */}
        <Button
          handler={handler}
          data={data}
          classes={`bg-white/100 text-zinc-600 mt-2 w- mx-auto inset-x-0 rounded-md opacity-0 ${
            isHovered && "opacity-100"
          } delay-200 duration-500`}
        >
          Discover more
        </Button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
