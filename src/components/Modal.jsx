import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Modal({
  modalButtonText,
  data,
  prevSize,
  sizeError,
  setSizeError,
  handleAddToCart,
}) {
  let [isOpen, setIsOpen] = useState(false);
  // console.log(data);

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => {
            prevSize && handleAddToCart(data);
            !prevSize ? setSizeError(true) : setIsOpen(!isOpen);
          }}
          className={`w-1/2 mt-3 mx-auto block text-gray-500 transition-all hover:text-gray-800  py-2 rounded-md text-sm font-medium border border-zinc-300 active:shadow-nm-inset disabled:bg-gray-300`}
        >
          {modalButtonText}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(!isOpen)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-fit transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all pb-7">
                  <div className="flex justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-xl leading-6 text-gray-900 font-extrabold"
                    >
                      SUCCESSFULLY ADDED TO CART!
                    </Dialog.Title>
                    <div className="mt-0 ">
                      <button
                        type="button"
                        className="text-2xl"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <HiOutlineXMark></HiOutlineXMark>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 md:flex justify-between  gap-x-4 ">
                    <div className="flex border-r border-zinc-500 items-ce">
                      <LazyLoadImage
                        src={data.img}
                        width={130}
                        effect={"opacity"}
                      ></LazyLoadImage>
                      {/* <img src={data.img} alt="" className="w-40" /> */}
                      <div className="px-2 leading-7  w-56">
                        <p className="font-bold text-base ">{data.name}</p>
                        <p className=" ">Size: {prevSize}</p>
                        <p className="font-bold text-base">
                          Price: ${data.price}
                        </p>
                        <p className="text-base">Quantity: 1</p>
                      </div>
                    </div>
                    {/* <hr className="border border-red-400 w" /> */}
                    <div className="leading-relaxed">
                      <div className="flex justify-between ">
                        <p>Your Cart: </p>
                        <p className="ml-4 font-semibold">7 items</p>
                      </div>
                      <div className="flex justify-between ">
                        <p>Total Product Cost: </p>
                        <p className="ml-4 font-semibold">$123</p>
                      </div>
                      <div className="flex justify-between ">
                        <p>Total Delivery Cost: </p>
                        <p className="ml-4 font-semibold">$435</p>
                      </div>

                      <hr className="my-2" />
                      <div className="flex justify-between">
                        <p>Total: </p>
                        <p className="font-semibold">$432</p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
