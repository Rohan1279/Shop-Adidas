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
      <div className="mt-16 flex h-screen">
        {isSeller && (
          <div className="bg-red-500 w-1/6">
            <p>
              <Link to={"/dashboard"}>Dashboard</Link>
            </p>
            <p>
              <Link to={"/dashboard/addproduct"}>Add Product</Link>
            </p>
            <p>
              <Link to={"/dashboard/myproducts"}>My Products</Link>
            </p>
            <p>
              <Link to={"/dashboard/mybuyers"}>My Buyers</Link>
            </p>
          </div>
        )}
        <div className="bg-blue-200 w-5/6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
