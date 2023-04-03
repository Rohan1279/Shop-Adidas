import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { Context } from "../contexts/ContextProvider";
import Navbar from "../Shared/Navbar";

const DashboardLayout = () => {
  const { authInfo } = useContext(Context);
  const { user, loading, isSeller, isSellerLoading } = authInfo;
  return (
    <div className="h-screen">
      <Navbar />
      <div className="mt-16  flex h-screen">
        {isSeller && (
          <div className="border border-r-zinc-300 w-1/6 text-center text-2xl  pt-20 px-5">
            <Link to={"/dashboard"}>
              <button className="shadow-nm-inset w-full my-2 py-4 rounded-md border border-zinc-300">
                Dashboard
              </button>
            </Link>
            <Link to={"/dashboard/addproduct"}>
              <button className="focus:shadow-nm-inset w-full my-2 py-4 rounded-md border border-zinc-300">
                Add Product
              </button>
            </Link>
            <Link to={"/dashboard/myproducts"}>
              <button className="focus:shadow-nm-inset w-full my-2 py-4 rounded-md border border-zinc-300">
                My Products
              </button>
            </Link>
            <Link to={"/dashboard/mybuyers"}>
              <button className="focus:shadow-nm-inset w-full my-2 py-4 rounded-md border border-zinc-300">
                My Buyers
              </button>
            </Link>
          </div>
        )}
        <div className=" w-5/6 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
