import React, { Suspense, useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Context } from "../contexts/ContextProvider";
import Navbar from "../Shared/Navbar";
import {
  FaBars,
  FaBuyNLarge,
  FaCartPlus,
  FaClosedCaptioning,
  FaHome,
  FaListAlt,
  FaShopify,
} from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Loader from "../components/Loader/Loader";
import { Popover, Transition } from "@headlessui/react";

const DashboardLayout = () => {
  const { authInfo } = useContext(Context);
  const { user, loading, isSeller, isSellerLoading, userRole } = authInfo;
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <div className="">
      <Navbar />
      <div className="mt-16 flex max-h-full">
        {/* //!DRAWER */}
        <Popover className="relative">
          <Popover.Button className={"absolute left-0"}>
            {" "}
            <FaBars
              className=""
              // onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            ></FaBars>
          </Popover.Button>

          <Popover.Panel className=" z-10">
            {(userRole === "Seller" || isSeller) && (
              <Transition
                // as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <div
                  className={`w-fit text-center text-2xl bg-primary-color shadow-nm pt-20 px-5 space-y-5 absolute  z-50 h-full ${
                    !isDrawerOpen && "w-32 hidden"
                  } transition-all ease-linear duration-300 
            `}
                >
                  <NavLink
                    to={"/dashboard"}
                    className={({ isActive }) =>
                      isActive
                        ? `bg-primary-color text-gray-800 shadow-nm-inset hover: transition-all hover:text-gray-800 px-3 py-2 rounded-md text-lg font-medium border border-zinc-300 block `
                        : "bg-primary-color text-gray-500 transition-all hover:text-gray-800 px-3 py-2 rounded-md text-lg font-medium border border-zinc-300 block "
                    }
                  >
                    <div className="flex justify-center items-center gap-x-2">
                      <FaHome></FaHome>
                      {isDrawerOpen && <span>Dashboard</span>}
                    </div>
                  </NavLink>

                  <NavLink
                    to={"addproduct"}
                    className={({ isActive }) =>
                      isActive
                        ? `bg-primary-color text-gray-800 shadow-nm-inset hover: transition-all hover:text-gray-800 px-3 py-2 rounded-md text-lg font-medium border border-zinc-300 block `
                        : "bg-primary-color text-gray-500  transition-all hover:text-gray-800 px-3 py-2 rounded-md text-lg font-medium border border-zinc-300 block"
                    }
                  >
                    <div className="flex justify-center items-center gap-x-2">
                      <FaCartPlus></FaCartPlus>
                      {isDrawerOpen && <span>Add Product</span>}
                    </div>
                  </NavLink>
                  <NavLink
                    to={"myproducts"}
                    className={({ isActive }) =>
                      isActive
                        ? `bg-primary-color text-gray-800 shadow-nm-inset hover: transition-all hover:text-gray-800 px-3 py-2 rounded-md text-lg font-medium border border-zinc-300 block `
                        : "bg-primary-color text-gray-500  transition-all hover:text-gray-800 px-3 py-2 rounded-md text-lg font-medium border border-zinc-300 block"
                    }
                  >
                    <div className="flex justify-center items-center gap-x-2">
                      <FaListAlt></FaListAlt>
                      {isDrawerOpen && <span>My Products</span>}
                    </div>
                  </NavLink>
                  <NavLink
                    to={"mybuyers"}
                    className={({ isActive }) =>
                      isActive
                        ? `bg-primary-color text-gray-800 shadow-nm-inset hover: transition-all hover:text-gray-800 px-3 py-2 rounded-md text-lg font-medium border border-zinc-300 block `
                        : "bg-primary-color text-gray-500  transition-all hover:text-gray-800 px-3 py-2 rounded-md text-lg font-medium border border-zinc-300 block"
                    }
                  >
                    <div className="flex justify-center items-center gap-x-2">
                      <FaShopify></FaShopify>
                      {isDrawerOpen && <span>My Buyers</span>}
                    </div>
                  </NavLink>
                </div>
              </Transition>
            )}
          </Popover.Panel>
        </Popover>

        <Suspense
          fallback={
            <div className="w-full h-screen ">
              <Loader></Loader>
            </div>
          }
        >
          <div className={`transition-all w-full h-fit`}>
            <Outlet />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardLayout;
