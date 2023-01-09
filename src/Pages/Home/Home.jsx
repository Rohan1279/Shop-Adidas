import React from "react";
import Button from "../../components/Button/Button";
import Banner from "./Banner/Banner";
//  https://i.ibb.co/34Xkt24/adidas-Fall-Sale-2021-1000x600.jpg
// https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg
const Home = () => {
  return (
    <div className="px-5">
      <Banner />
    </div>
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
