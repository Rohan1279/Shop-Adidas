import { useContext } from "react";
import { CartContext } from "../../Layout/Main";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const { cart, setCart, getStoredCart, addToCart } = useContext(CartContext);
  let totalPrice = getStoredCart()
    .map((product) => product?.price * product?.quantity)
    .reduce((a, b) => a + b, 0);
  const navigate = useNavigate();
  return (
    <div className="relative mx-auto min-h-screen max-w-7xl justify-between gap-x-36 py-24 md:flex">
      <div className="">
        <h2 className="text-center text-3xl font-extrabold lg:text-left">
          Check Out
        </h2>
        {/* 
        <div className="max-h-[36rem] overflow-y-scroll  border md:max-h-[44rem] ">
          {getStoredCart()?.map((product, idx) => (
            <CartItem
              key={idx}
              product={product}
              handleRemoveItem={handleRemoveItem}
              cart={getStoredCart()}
              // isShowing={isShowing}
            ></CartItem>
          ))}
          {getStoredCart()?.length === 0 && (
            <div className="space-y-2 text-center ">
              <BsCartX className="mx-auto text-4xl lg:ml-0"></BsCartX>
              <p>Looks like your cart is empty. Add something in your cart.</p>
            </div>
          )}
        </div> */}
      </div>
      {/* //! ORDER SUMMARY */}
      <div
        className=" absolute bottom-0
      w-screen bg-primary-color px-2 pb-16 
      md:static md:mx-2 md:w-[28rem]  md:bg-secondary-color md:px-0 md:pb-0"
      >
        <span className="flex items-center justify-between">
          <h2 className=" text-center text-3xl font-extrabold text-black md:mb-5 lg:text-left">
            Order Summary
          </h2>
          <p
            onClick={() => navigate("/cart")}
            className="text-sm font-thin tracking-wide  text-gray-500 hover:cursor-pointer hover:underline"
          >
            Modify Order
          </p>
        </span>
        <div className="overflow-y-scroll rounded-md border bg-primary-color p-2">
          {getStoredCart()?.map((product, idx) => (
            <div className="px-5 md:h-[]   md:px-0">
              <div
                className={`relative my-1 mx-auto flex items-center gap-x-2 overflow-hidden rounded-md border  border-gray-300 bg-primary-color px-2 text-lg md:h-[7rem] `}
              >
                <LazyLoadImage
                  src={product?.img}
                  alt=""
                  className=" h-24 w-24 "
                  effect="blur"
                ></LazyLoadImage>
                <img />
                <div className="flex-1 ">
                  <h2 className="text-base font-semibold tracking-wider  text-gray-700 ">
                    {product?.name}
                  </h2>
                  <h2 className="text-sm  font-medium tracking-wider  text-gray-700">
                    {product?.color ? product?.color : "No color informtaion"}
                  </h2>
                  <span>
                    <h2 className="text-xs font-medium tracking-wider  text-gray-700">
                      Size: {product?.size}
                    </h2>
                    <h2 className="text-xs font-medium tracking-wider  text-gray-700">
                      Quantity: {product?.quantity}
                    </h2>
                    <h2 className="text-right text-sm font-semibold tracking-wider  text-gray-700 ">
                      {/* Total: */}
                      {isNaN(
                        (product?.price * product?.quantity).toFixed(2)
                      ) ? (
                        <p className="inline text-xs font-thin tracking-wide text-gray-500 ">
                          calculating
                        </p>
                      ) : (
                        <p>
                          ${(product?.price * product?.quantity).toFixed(2)}
                        </p>
                      )}
                    </h2>
                  </span>
                </div>
              </div>
            </div>
          ))}
          {getStoredCart()?.length === 0 && (
            <div className="space-y-2 text-center ">
              <BsCartX className="mx-auto text-4xl lg:ml-0"></BsCartX>
              <p>Looks like your cart is empty. Add something in your cart.</p>
            </div>
          )}
          <div className="my-4 px-4">
            <hr className="my-4 hidden border-gray-400 md:block border-dashed" />
            <p className="flex justify-between text-base font-semibold tracking-wider  text-gray-700">
              Delivery :{" "}
              <span className="">
                {" "}
                <span className="">
                  {isNaN(totalPrice) ? (
                    <p className="inline text-xs font-thin tracking-wide text-gray-500 ">
                      calculating
                    </p>
                  ) : (
                    <p>$0</p>
                  )}
                </span>
              </span>
            </p>
            <p className="flex justify-between text-base font-semibold tracking-wider  text-gray-700">
              Total:{" "}
              <span className="">
                {isNaN(totalPrice) ? (
                  <p className="inline text-xs font-thin tracking-wide text-gray-500 ">
                    calculating
                  </p>
                ) : (
                  <p>${totalPrice}</p>
                )}
              </span>
            </p>
            <h3 className="mt-1 text-xs font-medium  tracking-wider text-gray-600">
              *Delivery charge and taxes will be calculated after an address is
              provided.
            </h3>{" "}
          </div>
        </div>
        {/* <div className="leading-7 ">
          <p className="flex justify-between">
            Total Products:{" "}
            <span className="text-gray-500">{getStoredCart()?.length}</span>{" "}
          </p>
          <p className="flex justify-between">
            Subtotal: <span className="text-gray-500">${totalPrice}</span>
          </p>
          <p className="flex justify-between">
            Delivery: <span className="text-gray-500">$0</span>
          </p>
          <hr className="my-3  border-gray-400 md:block" />
          <p className="flex justify-between font-bold text-gray-700">
            Total: <span className="">${totalPrice}</span>
          </p>
          <hr className="my-3 hidden border-gray-400 md:block" />
        </div>
        <div>
          <h3 className="text-xs font-medium tracking-wider  text-gray-600">
            *Shipping and taxes will be calculated after an address is provided.
          </h3>{" "}
          <button
            onClick={() => navigate("/cart/checkout")}
            type="button"
            className="mt-10 w-full rounded-md  border border-gray-300 bg-secondary-color py-3  text-sm font-medium tracking-wider text-gray-700 transition-all active:shadow-nm-inset"
          >
            Checkout <HiArrowRight className="ml-2 inline-block"></HiArrowRight>
          </button>
        </div> */}
      </div>
    </div>
  );
}
