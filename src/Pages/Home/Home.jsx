import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import Button from "../../components/Button/Button";
import Banner from "./Banner/Banner";
//  https://i.ibb.co/34Xkt24/adidas-Fall-Sale-2021-1000x600.jpg
// https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg
const Home = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("img"));
    let loadedCount = 0;
    nodes.forEach((node) => {
      if (node.complete) {
        loadedCount++;
      } else {
        node.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === nodes.length) {
            setLoaded(true);
          }
        });
      }
    });

    if (loadedCount === nodes.length) {
      setLoaded(true);
    }
  }, []);

  return (
    <Transition
      // appear={true}
      show={loaded}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      {/* Your content goes here*/}
      {/* <div className="p-10 bg-white rounded-md">
        <h1 className="text-3xl font-bold mb-4">Welcome to my website!</h1>
        <img src="..." alt="..." className="mb-4" />
        <img src="..." alt="..." className="mb-4" />
        <img src="..." alt="..." className="mb-4" />
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div> */}
      <div className="px-5">
        <Banner />
      </div>
    </Transition>
  );
};

export default Home;

/* <div className="grid grid-cols-6 grid-flow-dense bg-red-400">
        <div className="w-64 h-64 col-span-3 bg-[url('https://i.ibb.co/34Xkt24/adidas-Fall-Sale-2021-1000x600.jpg')] "></div>
        <div className="col-span-3 flex flex-wrap justify-center items-center">
          {/* <div className="w-64 h-64 bg-[url('https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg')] bg-no-repeat bg-cover"></div>
          <div className="w-64 h-64 bg-[url('https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg')] bg-no-repeat bg-cover"></div>
          <div className="w-64 h-64 bg-[url('https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg')] bg-no-repeat bg-cover"></div>
          <div className="w-64 h-64 bg-[url('https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg')] bg-no-repeat bg-cover"></div>
          <div className="w-64 h-64 bg-[url('https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg')] bg-no-repeat bg-cover"></div>
          <div className="w-64 h-64 bg-[url('https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg')] bg-no-repeat bg-cover"></div> 
        </div>
      </div> 
*/
