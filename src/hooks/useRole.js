import React, { useEffect, useState } from "react";

const useRole = (email) => {
  if (email) {
    console.log("From use role", email);
  }
  const [isBuyer, setIsBuyer] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  const [isBuyerLoading, setIsBuyerLoading] = useState(true);
  const [isSellerLoading, setIsSellerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      // console.log(localStorage.getItem("shop-adidas-token"));

      fetch(`${import.meta.env.VITE_SERVER_URL}/user/${email}`, {
        method: "GET",
        // headers: {
        //   "content-type": "application/json",
        //   authorization: `bearer ${localStorage.getItem("shop-adidas-token")}`,
        // },
        // body: JSON.stringify(email),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setIsBuyer(data?.userRole === "Buyer");
          setIsSeller(data?.userRole === "Seller");
          setIsBuyerLoading(false);
          setIsSellerLoading(false);
        });
    }
  }, [email]);
  // console.log(isBuyer, isSeller);
  return [isBuyer, isSeller,setIsSeller, isBuyerLoading, isSellerLoading];
};

export default useRole;
