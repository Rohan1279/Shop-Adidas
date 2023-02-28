import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HiArrowDown, HiArrowUp, HiChevronDown, HiStar } from "react-icons/hi2";
import { Disclosure, Transition } from "@headlessui/react";
import BackButton from "../../components/BackButton/BackButton";
import Modal from "../../components/Modal";
import { Context } from "../../contexts/ContextProvider";
import { addToDb } from "../../utils/fakeDB";
const ProductDetail = () => {
  const { cart, setCart, initialCart } = useContext(Context);

  const { state } = useLocation();
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [prevSize, setPrevSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
  const handleAddToCart = (selectedProduct) => {
    console.log(selectedProduct);
    // const productId = selectedProduct.id;
    // const existingCartItemIndex = cart.find(
    //   (item) => item.productId === productId
    // );
    // if (existingCartItemIndex !== -1) {
    //   const updatedCart = [...cart];
    //   updatedCart[existingCartItemIndex] = {
    //     productId,
    //     quantity: updatedCart[existingCartItemIndex]?.quantity + 1,
    //     size: prevSize?.innerText,
    //   };
    //   setCart(updatedCart);
    //   addToDb(selectedProduct._id);
    // } else {
    //   const updatedCart = [
    //     ...cart,
    //     { productId, quantity: 1, size: prevSize?.innerText },
    //   ];
    //   setCart(updatedCart);
    //   addToDb(selectedProduct._id);
    // }

    let newCart = [];
    const exists = cart.find(
      (existingPrduct) => existingPrduct._id === selectedProduct._id
    );
    if (exists) {
      exists.quantity += 1;
      const rest = cart.filter(
        (existingPrduct) => existingPrduct._id !== selectedProduct._id
      );
      newCart = [...rest, exists];
    } else {
      selectedProduct.quantity = 1;
      selectedProduct.size = prevSize?.innerText;
      newCart = [...cart, selectedProduct];
    }
    setCart(newCart);
    addToDb(selectedProduct._id);
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
    <div className="px-5 h-screen overflow-auto py-10  ">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-x-2 font-semibold hover:underline cursor-pointer "
      >
        <BackButton classes={"text-lg"}></BackButton>
        <p>Back</p>
      </div>
      {/* <BannerCard data={state} classes={"text-lg"}></BannerCard> */}
      <div className="md:grid grid-cols-2 justify-center items-start ">
        <img
          src={state?.img}
          alt=""
          className="sm:w-full md:w-[75%] mb-5 shadow-nm rounded-xl mx-auto"
          loading="lazy"
        />
        <div className="shadow-nm rounded-md p-7 h-fit transition-all duration-700">
          <section className=" sticky top-0">
            <div className="flex justify-between mb-2">
              <p className="text-lg">{state?.category}</p>
              <div className="flex items-center justify-center gap-x-2 mb-5">
                <div className="flex">
                  <HiStar></HiStar>
                  <HiStar></HiStar>
                  <HiStar></HiStar>
                  <HiStar></HiStar>
                </div>
                <p className="font-semibold hover:underline cursor-pointer text-lg">
                  {state?.reviewsCount} Reviews
                </p>
              </div>
            </div>
            <div
              className={
                "w-full my-3 mx-auto block bg-primary-color text-green-500 font-extrabold  transition-all py-2 rounded-md text-sm  border border-zinc-300 text-center"
              }
            >
              In stock
            </div>
            <h2 className="text-4xl font-extrabold mb-5">{state?.name}</h2>
            <p className="font-bold mb-2">${state?.price}</p>
            <p className="mb-3">
              {state.color ? state.color : "No colors available"}
            </p>
            <Disclosure>
              <hr className="border border-gray-300 mb-2" />

              <Disclosure.Button
                onClick={() => setOpen(!open)}
                className={
                  "w-full flex justify-between items-center gap-x-2 font-semibold"
                }
              >
                <span>Description</span>
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
            <hr className="border border-gray-300 mt-2" />

            <p className="my-3 font-semibold">Sizes</p>
            <div
              className={`${
                sizeError && "animate-shake"
              } duration-100  flex flex-wrap`}
            >
              {sizes.map((size) => (
                <div key={size}>
                  <button
                    className={`w-16 text-gray-500 transition-all py-2 rounded- text-sm font-medium border border-zinc-300 hover:shadow-nm-inset`}
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
            <Modal
              modalButtonText={"Add to cart"}
              data={state}
              prevSize={prevSize?.innerText}
              sizeError={sizeError}
              setSizeError={setSizeError}
              handleAddToCart={handleAddToCart}
            ></Modal>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
