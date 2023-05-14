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
        <div className="hidden md:block max-h-full shadow-xl px-5 pt-10">
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
                  ? `min-w-max w-52 text-center   mt-4 bg-[#] text-gray-800 shadow-nm-inset  transition-all hover:text-gray-800  py-2 rounded-md text-sm font-bold border border-zinc-300 block `
                  : "min-w-max  w-52 text-center  mt-4 bg-[#] text-gray-500 transition-all hover:text-gray-800  py-2 rounded-md text-sm font-medium border border-zinc-300 block "
              }
            >
              <button>
                <div className="flex justify-center items-center gap-x-2 min-w-max">
                  {route.icon}
                  {isDrawerOpen && <span>{route.name}</span>}
                </div>
              </button>
            </NavLink>
          ))}
        </div>
        <Popover className="block md:hidden relative z-40 ">
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
                <Popover.Panel className="h-screen z-50 ">
                  {(userRole === "Seller" || isSeller) && (
                    <div className="absolute min-h-screen   shadow-xl px-5 pt-10 bg-secondary-color">
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
                              ? `min-w-max w-52 text-center   mt-4 bg-[#] text-gray-800 shadow-nm-inset  transition-all hover:text-gray-800  py-2 rounded-md text-sm font-bold border border-zinc-300 block `
                              : "min-w-max  w-52 text-center  mt-4 bg-[#] text-gray-500 transition-all hover:text-gray-800  py-2 rounded-md text-sm font-medium border border-zinc-300 block "
                          }
                        >
                          <button>
                            <div className="flex justify-center items-center gap-x-2 min-w-max">
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
            <div className="w-full h-screen">
              <Loader></Loader>
            </div>
          }
        >
          <div
            className={`transition-all w-screen h-fit overflow-x-scroll z-0`}
          >
            <Outlet />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardLayout;
