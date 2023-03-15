import React, { useEffect, useState } from "react";

const useRole = (email) => {
  const [isBuyer, setIsBuyer] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  const [isBuyerLoading, setIsBuyerLoading] = useState(true);
  const [isSellerLoading, setIsSellerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${import.meta.env.VITE_SERVER_URL}/user/${email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setIsBuyer(data.isBuyer);
          setIsSeller(data.isSeller);
          setIsBuyerLoading(false);
          setIsSellerLoading(false);
        });
    }
  }, [email]);
  // console.log(isBuyer, isSeller);
  return [isBuyer, isSeller, isBuyerLoading, isSellerLoading];
};

export default useRole;
