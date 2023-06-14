import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HiArrowDown, HiArrowUp, HiChevronDown, HiStar } from "react-icons/hi2";
import { Disclosure, Transition } from "@headlessui/react";
import BackButton from "../../components/BackButton/BackButton";
import { Context } from "../../contexts/ContextProvider";
import { addToDb } from "../../utils/fakeDB";
import { CartContext } from "../../Layout/Main";
import AddToCartModal from "../../components/AddToCartModal";
const ProductDetail = () => {
  const [cart, setCart] = useContext(CartContext);
  // console.log(cart);
  const { state } = useLocation();
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [prevSize, setPrevSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
  console.log(state);
  // console.log(prevSize?.innerText);
  const handleAddToCart = (selectedProduct) => {
    // const productId = selectedProduct.id;
    // const existingCartItemIndex = cart.find(
    //   (item) => item.productId === productId
    // );
    // if (existingCartItemIndex !== -1) {
    //   const updatedCart = [...cart];
    //   updatedCart[existingCartItemIndex] = {
    //     productId,
    //     stock: updatedCart[existingCartItemIndex]?.stock + 1,
    //     size: prevSize?.innerText,
    //   };
    //   setCart(updatedCart);
    //   addToDb(selectedProduct._id);
    // } else {
    //   const updatedCart = [
    //     ...cart,
    //     { productId, stock: 1, size: prevSize?.innerText },
    //   ];
    //   setCart(updatedCart);
    // addToDb(selectedProduct._id, prevSize?.innerText);

    // }
    let newCart = [];
    const exists = cart?.find(
      (existingProduct) =>
        existingProduct._id === selectedProduct._id &&
        existingProduct.size === prevSize?.innerText
    );
    if (exists) {
      exists.stock += 1;
      const rest = cart.filter(
        (existingPrduct) => existingPrduct._id !== selectedProduct._id
      );
      newCart = [...rest, exists];
    } else {
      selectedProduct.stock = 1;
      selectedProduct.size = prevSize?.innerText;
      newCart = [...cart, selectedProduct];
    }
    console.log(newCart);
    setCart(newCart);
    // ! check in addToDb if product of same
    addToDb(selectedProduct._id, prevSize?.innerText);
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
    <div className="h-screen overflow-auto px-5 py-10  ">
      <div
        onClick={() => navigate(-1)}
        className="flex cursor-pointer items-center gap-x-2 font-semibold hover:underline "
      >
        <BackButton classes={"text-lg"}></BackButton>
        <p>Back</p>
      </div>
      {/* <BannerCard data={state} classes={"text-lg"}></BannerCard> */}
      <div className="grid-cols-2 items-start justify-center md:grid ">
        <img
          src={state?.img}
          alt=""
          className="mx-auto mb-5 w-full max-w-xl rounded-xl shadow-nm md:w-[75%]"
          loading="lazy"
        />
        <div className="h-fit rounded-md p-7 shadow-nm transition-all duration-700 w-4/5">
          <section className=" sticky top-0 ">
            <h2 className="mb-5 text-4xl font-extrabold">{state?.name}</h2>
            <p className="mb-2 font-bold">${state?.price}</p>

            <div className="mb-2 flex justify-between">

              <p className=" text-lg font-medium tracking-wider  text-gray-700">
                {state?.category}
              </p>
              <div className="mb-5 flex items-center justify-center gap-x-2">
                <div className="flex">
                  <HiStar></HiStar>
                  <HiStar></HiStar>
                  <HiStar></HiStar>
                  <HiStar></HiStar>
                </div>
                <p className="cursor-pointer text-lg font-semibold hover:underline ">
                  {state?.reviewsCount} Reviews
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center my-3">
              <p
                className={
                  " w-3/4 rounded-md border border-zinc-300 py-2 h-10 text-center text-sm  font-extrabold text-green-500 transition-all"
                }
              >
                In stock
              </p>
              <button className="border w-1/4 border-zinc-300 ml-2 rounded-md px-3 h-10 flex justify-center items-center">
                <img src="https://cdn0.iconfinder.com/data/icons/3d-online-shop/256/icbsv2_7.png" className="w-7 h-7" alt="" />
                <p className="  text-gray-700 text-lg ml-2">Contact Seller</p>
              </button>
            </div>
            <p className="mb-3">
              {state?.color ? state.color : "No colors available"}
            </p>
            <Disclosure>
              <hr className="mb-2 border border-gray-300" />

              <Disclosure.Button
                onClick={() => setOpen(!open)}
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
                enter="transition duration-100 ease-out"
                enterFrom="transform opacity-0"
                enterTo="transform  opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform  opacity-100"
                leaveTo="transform opacity-0"
              >
                <Disclosure.Panel>
                  <p className="text-sm">{state?.description}</p>
                </Disclosure.Panel>
              </Transition>
            </Disclosure>
            <hr className="mt-2 border border-gray-300" />

            <p className="my-3 font-semibold">Sizes</p>
            <div
              className={`${
                sizeError && "animate-shake"
              } flex  flex-wrap duration-100`}
            >
              {sizes.map((size) => (
                <div key={size}>
                  <button
                    className={`rounded- w-16 border border-zinc-300 py-2 text-sm font-medium text-gray-500 transition-all `}
                    onClick={(e) => {
                      handleCurrentSize(e);
                    }}

                    // handler={handleCurrentSize}
                  >
                    {size}
                  </button>
                </div>
              ))}
            </div>
            {sizeError === true ? (
              <p className="text-sm text-red-500">Please select a size.</p>
            ) : (
              ""
            )}
            <AddToCartModal
              buttonClass={"w-1/2"}
              modalButtonText={"Add to cart"}
              data={state}
              prevSize={prevSize?.innerText}
              sizeError={sizeError}
              setSizeError={setSizeError}
              handleAddToCart={handleAddToCart}
            ></AddToCartModal>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
