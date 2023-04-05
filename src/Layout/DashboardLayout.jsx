import React, { useContext, useState } from "react";
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
import {} from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";

const DashboardLayout = () => {
  const { authInfo } = useContext(Context);
  const { user, loading, isSeller, isSellerLoading } = authInfo;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="h-screen">
      <Navbar />
      <div className="mt-16 flex h-screen ">
        {/* //!DRAWER */}
        {isSeller && (
          <div
            className={`w-1/6 text-center text-2xl bg-primary-color shadow-nm pt-20 px-5 space-y-5 absolute -top-0 z-50 h-screen ${
              !isDrawerOpen && "w-32"
            } transition-all ease-linear duration-300 
            `}
          >
            {isDrawerOpen ? (
              <HiXMark
                className="ml-auto font-"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              ></HiXMark>
            ) : (
              <FaBars
                className="ml-auto "
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              ></FaBars>
            )}
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
        )}
        <div
          className={`w-5/6 transition-all mx-auto ${
            isDrawerOpen && "mx-0 ml-auto transition-all"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
