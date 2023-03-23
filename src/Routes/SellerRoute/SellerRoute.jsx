import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { Context } from "../../contexts/ContextProvider";
import useRole from "../../hooks/useRole";

const SellerRoute = ({ children }) => {
  const { authInfo } = useContext(Context);
  const { user, loading } = authInfo;
  const [isBuyer, isSeller, setIsSeller, isBuyerLoading, isSellerLoading] =
    useRole(user?.email);
  console.log(isSeller);
  const location = useLocation();
  if (loading || isSellerLoading) {
    return <Loader />;
  }
  if (user && isSeller) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
