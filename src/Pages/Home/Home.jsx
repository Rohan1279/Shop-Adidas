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
    const nodes = Array.from(document.querySelectorAll("img", "div"));
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
      appear={true}
      show={loaded}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <div className="px-5 min-h-screen">
        <p className="px-6 pb-3  text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center justify-evenly hover:text-blue-900 transition-all cursor-pointer animate-pulse">This project is currently work in progress...</p>
        <Banner />
      </div>
    </Transition>
  );
};

export default Home;
