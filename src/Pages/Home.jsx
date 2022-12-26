import React from "react";
//  https://i.ibb.co/34Xkt24/adidas-Fall-Sale-2021-1000x600.jpg
// https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg
const Home = () => {
  return (
    <div className="px-10">
      <div className="md:flex justify-center items-center w-auto gap-x-6">
        <div className="w-auto">
          <img
            src="https://i.ibb.co/34Xkt24/adidas-Fall-Sale-2021-1000x600.jpg"
            alt=""
            className="object-cover"
          />
        </div>
        <div className="md:grid grid-cols-2 gap-6">
          <div className=" mx-auto bg-[url('')] bg-no-repeat bg-cover">
            <img
            className="w-72"
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg"
              alt=""
            />
          </div>
          <div className=" mx-auto bg-[url('')] bg-no-repeat bg-cover">
            <img
            className="w-72"
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg"
              alt=""
            />
          </div>
          <div className=" mx-auto bg-[url('')] bg-no-repeat bg-cover">
            <img
            className="w-72"
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg"
              alt=""
            />
          </div>
          <div className=" mx-auto bg-[url('')] bg-no-repeat bg-cover">
            <img
            className="w-72"
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
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
