import React, { Fragment, Suspense, useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Context } from "../contexts/ContextProvider";
import Navbar from "../Shared/Navbar";
import {
  FaArrowLeft,
  FaBars,
  FaBuyNLarge,
  FaCartPlus,
  FaChevronLeft,
  FaClosedCaptioning,
  FaHome,
  FaListAlt,
  FaPlus,
  FaShopify,
  FaXbox,
} from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Loader from "../components/Loader/Loader";
import { Popover, Tab, Transition } from "@headlessui/react";
import Footer from "../Shared/Footer";

const DashboardLayout = () => {
  const { authInfo } = useContext(Context);
  const { user, loading, isSeller, isSellerLoading, userRole } = authInfo;
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const routes = [
    { name: "Dashboard", route: "home", icon: <FaHome></FaHome> },
    {
      name: "Add Product",
      route: "addproduct",
      icon: <FaPlus></FaPlus>,
    },
    { name: "My Products", route: "myproducts", icon: <FaListAlt></FaListAlt> },
    { name: "My Buyers", route: "mybuyers", icon: <FaShopify></FaShopify> },
  ];
  return (
    <div className="">
      <Navbar />
      <div className="mt-16 flex max-h-full ">
        {/* //!DRAWER */}
        <div className="hidden max-h-full px-5 pt-10 shadow-xl md:block">
          {/* <Popover.Button className={""}>
              {" "}
              <FaChevronLeft className="text-sm "></FaChevronLeft>
            </Popover.Button> */}
          <div>
            <img
              className="rounded-full border  bg-[#7fe7fc]/60"
              src="https://cdn2.iconfinder.com/data/icons/male-avatars/256/avatars_accounts___man_male_people_person_hat_cap_baseball_cap_necklace_shirtless.png"
              alt=""
            />
          </div>
          {routes.map((route, idx) => (
            <NavLink
              key={idx}
              to={route.route}
              className={({ isActive }) =>
                isActive
                  ? `mt-4 block w-52   min-w-max rounded-md border border-zinc-300  bg-[#] py-2  text-center text-sm font-bold text-gray-800 shadow-nm-inset transition-all hover:text-gray-800 `
                  : "mt-4  block w-52  min-w-max rounded-md border border-zinc-300 bg-[#]  py-2 text-center text-sm font-medium text-gray-500 transition-all hover:text-gray-800 "
              }
            >
              <button>
                <div className="flex min-w-max items-center justify-center gap-x-2">
                  {route.icon}
                  {isDrawerOpen && <span>{route.name}</span>}
                </div>
              </button>
            </NavLink>
          ))}
        </div>
        <Popover className="relative z-40 block md:hidden ">
          {({ open }) => (
            <>
              <Popover.Button className={"absolute left-5 z-10"}>
                {" "}
                {open ? (
                  <FaArrowLeft></FaArrowLeft>
                ) : (
                  <FaBars
                    className=""
                    // onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  ></FaBars>
                )}
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-x-8 "
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in-out duration-150"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 -translate-x-8"
              >
                <Popover.Panel className="z-50 h-screen ">
                  {(userRole === "Seller" || isSeller) && (
                    <div className="absolute min-h-screen   bg-secondary-color px-5 pt-10 shadow-xl">
                      <div>
                        <img
                          className="rounded-full border  bg-[#7fe7fc]/60"
                          src="https://cdn2.iconfinder.com/data/icons/male-avatars/256/avatars_accounts___man_male_people_person_hat_cap_baseball_cap_necklace_shirtless.png"
                          alt=""
                        />
                      </div>
                      {routes.map((route, idx) => (
                        <NavLink
                          key={idx}
                          to={route.route}
                          className={({ isActive }) =>
                            isActive
                              ? `mt-4 block w-52   min-w-max rounded-md border border-zinc-300  bg-[#] py-2  text-center text-sm font-bold text-gray-800 shadow-nm-inset transition-all hover:text-gray-800 `
                              : "mt-4  block w-52  min-w-max rounded-md border border-zinc-300 bg-[#]  py-2 text-center text-sm font-medium text-gray-500 transition-all hover:text-gray-800 "
                          }
                        >
                          <button>
                            <div className="flex min-w-max items-center justify-center gap-x-2">
                              {route.icon}
                              {isDrawerOpen && <span>{route.name}</span>}
                            </div>
                          </button>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <Suspense
          fallback={
            <div className="flex h-screen w-full items-center">
              <Loader></Loader>
            </div>
          }
        >
          <div
            className={`z-0 w-screen  overflow-x-scroll transition-all duration-300 ease-in-out`}
          >
            <Outlet />
          </div>
        </Suspense>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default DashboardLayout;
