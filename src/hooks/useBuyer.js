import React, { useEffect, useState } from "react";

const useBuyer = (email) => {
  const [isBuyer, setIsBuyer] = useState(false);
  const [isBuyerLoading, setIsBuyerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${import.meta.env.VITE_SERVER_URL}/users/buyer/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsBuyer(data.isBuyer);
          setIsBuyerLoading(false);
        });
    }
  }, [email]);

  return [isBuyer, isBuyerLoading];
};

export default useBuyer;
