import React, { useContext, useEffect, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { HiArrowDown, HiArrowUp, HiChevronDown, HiStar } from "react-icons/hi2";
import { Disclosure, Transition } from "@headlessui/react";
import BackButton from "../../components/BackButton/BackButton";
import { Context } from "../../contexts/ContextProvider";
import { useCart } from "../../utils/fakeDB";
import { CartContext } from "../../Layout/Main";
import AddToCartModal from "../../components/AddToCartModal";
import Cookies from "js-cookie";
const ProductDetail = () => {
  const [contactSeller, setContactSeller] = useOutletContext();
  const { cart, setCart, getStoredCart, addToCart } = useCart();
  const { state } = useLocation();
  const { sizes } = state;
  let navigate = useNavigate();
  const [open, setOpen] = useState(true);
  // console.log(open);
  const [prevSize, setPrevSize] = useState(null);
  // console.log(state);
  const [sizeError, setSizeError] = useState(false);
  const seller = {
    seller: state?.seller || JSON.parse(Cookies.get("selectedProduct"))?.seller,
    seller_default_image:
      state?.seller_default_image ||
      JSON.parse(Cookies.get("selectedProduct"))?.seller_default_image,
    seller_email:
      state?.seller_email ||
      JSON.parse(Cookies.get("selectedProduct"))?.seller_email, //replace with seller_id
    seller_id:
      state?.seller_id || JSON.parse(Cookies.get("selectedProduct"))?.seller_id,
    seller_name:
      state?.seller_name ||
      JSON.parse(Cookies.get("selectedProduct"))?.seller_name,
    seller_phone:
      state?.seller_phone ||
      JSON.parse(Cookies.get("selectedProduct"))?.seller_phone,
  };

  const handleAddToCart = (selectedProduct) => {
    console.log("here");
    const selectedProductWithSize = {
      ...selectedProduct,
      size: prevSize?.innerText,
    };
    addToCart(selectedProductWithSize);
  };

  // console.log(cart);
  const handleCurrentSize = (e) => {
    e.target?.classList?.add("shadow-nm-inset");
    if (prevSize && e.target !== prevSize) {
      prevSize.classList.remove("shadow-nm-inset");
    }
    setPrevSize(e.target);
    setSizeError(false);
  };

  return (
    // ! use carousal for all products of the category
    <div className="relative min-h-screen overflow-auto px-5 pb-16">
      {/* <BannerCard data={state} classes={"text-lg"}></BannerCard> */}
      <div className="mt-9 justify-center lg:grid  lg:grid-cols-7 ">
        <img
          src={state?.img}
          alt=""
          className="  col-span-4 mb-5 w-full"
          loading="lazy"
        />
        <div
          onClick={() => navigate(-1)}
          className="left-10 top-20 flex cursor-pointer items-center gap-x-2 py-5 font-semibold hover:underline md:fixed md:py-0"
        >
          <BackButton classes={"text-lg"}></BackButton>
          <p>Back</p>
        </div>
        <div className="col-span-3 h-fit transition-all duration-700 md:px-16 md:pt-16 ">
          <section className="">
            <h2 className="mb-5 text-4xl font-extrabold ">{state?.name}</h2>
            <p className="mb-2 font-bold">${state?.price}</p>

            <div className="mb-2 flex justify-between">
              <p className=" text-lg font-medium tracking-wider  text-gray-700">
                {state?.category}
              </p>
              <div className="mb-5 flex items-center justify-center gap-x-2">
                <div className="flex items-center gap-x-1  text-base font-thin text-zinc-700">
                  <HiStar></HiStar>
                  <HiStar></HiStar>
                  <HiStar></HiStar>
                  <HiStar></HiStar>
                  {`${state?.ratings}`}
                </div>
                |
                <p className="cursor-pointer text-base font-thin text-zinc-700 hover:underline ">
                  {state?.reviewsCount} Reviews
                </p>
              </div>
            </div>
            <div className="my-3 grid-cols-5 items-center justify-between md:grid">
              <p
                className={
                  " col-span-3 h-10 rounded-md border border-zinc-300 py-2 text-center text-sm  font-extrabold text-green-500 transition-all"
                }
              >
                In stock
              </p>
              <button
                onClick={() => setContactSeller(seller)}
                className="col-span-2 mt-2 flex h-10 w-full items-center justify-center rounded-md border border-zinc-300 px-2 transition-all active:shadow-nm-inset md:mt-0 md:ml-2"
              >
                <img
                  src="https://cdn0.iconfinder.com/data/icons/3d-online-shop/256/icbsv2_7.png"
                  className="h-7 w-7"
                  alt=""
                />
                <p
                  // onClick={()=> set} //! showChat enables
                  className="ml-2 text-sm text-gray-700 "
                >
                  Contact Seller
                </p>
              </button>
            </div>
            <div className="my-4 flex items-center justify-start gap-x-2">
              <img
                src="https://cdn2.iconfinder.com/data/icons/stationery-glyph-black/614/3414_-_Color_Pallete-64.png"
                alt=""
                className="h-5 w-5 select-none"
              />
              <p className="text-base font-light">Color</p>
              <p className="ml-2 text-sm tracking-wider text-zinc-700">
                {" "}
                {state?.color ? state.color : "No colors available"}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-start gap-x-2">
              <img
                src="https://cdn0.iconfinder.com/data/icons/small-things/100/small-stuff-20151014-go-17-256.png"
                alt=""
                className="h-5 w-5 select-none"
              />
              <p className="text-base font-light">Sizes</p>
            </div>
            {sizes ? (
              <div
                className={`${
                  sizeError && "animate-shake"
                } mt-2  flex flex-wrap duration-100`}
              >
                {sizes?.map((size, id) => (
                  <>
                    <div key={id}>
                      <button
                        className={`rounded- w-16 border border-zinc-300 py-2 text-sm font-medium text-gray-500 transition-all `}
                        onClick={(e) => {
                          handleCurrentSize(e);
                        }}

                        // handler={handleCurrentSize}
                      >
                        {size?.name}
                      </button>
                    </div>
                  </>
                ))}
                {sizeError === true ? (
                  <p className="text-sm text-red-500">Please select a size.</p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <p className="inline text-sm text-gray-500">No sizes available</p>
            )}

            <hr className="my-5 border border-gray-300" />
            <Disclosure defaultOpen>
              <Disclosure.Button
                onClick={() => setOpen((prev) => !prev)}
                className={
                  "flex w-full items-center justify-between gap-x-2 font-semibold"
                }
              >
                <span className=" font-medium tracking-wide  text-gray-700">
                  Description
                </span>
                <HiChevronDown
                  className={`${open ? "rotate-180 transform" : ""} h-5 w-5 `}
                ></HiChevronDown>
              </Disclosure.Button>
              <Transition
                enter="transition  ease-out duration-300"
                enterFrom="opacity-0  translate-y-0"
                enterTo="opacity-100   translate-y-2"
                leave="transition  ease-out  duration-300"
                leaveFrom="opacity-100   translate-y-2"
                leaveTo="opacity-0  translate-y-0"
              >
                <Disclosure.Panel>
                  <p className="text-sm ">{state?.description}</p>
                </Disclosure.Panel>
              </Transition>
            </Disclosure>
            <hr className="my-5 border border-gray-300" />
            <AddToCartModal
              buttonClass={"w-1/2"}
              modalButtonText={"Add to cart"}
              data={state}
              prevSize={prevSize?.innerText}
              sizeError={sizeError}
              setSizeError={setSizeError}
              handleAddToCart={handleAddToCart}
              sizes={sizes}
            ></AddToCartModal>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
