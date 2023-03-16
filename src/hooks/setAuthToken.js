import { useState } from "react";
export const setAuthToken = (user, logOut) => {
  let currentUser = {
    email: user?.email,
    userRole: user?.userRole,
  };
  //   if (user?.userRole === "Seller") {
  //     currentUser = {
  //       email: user?.email,
  //       userRole: user?.userRole,
  //       isSellerVerified: false,
  //     };
  //   }
  // save user in db and get token
  fetch(`${import.meta.env.VITE_SERVER_URL}/user/${user?.email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // save token in localstorage
      if (data?.token) {
        localStorage.setItem("shop-adidas-token", data?.token);
      } else {
        console.log(data?.message);
        logOut();
      }
    })
    .catch((error) => console.log(error));
};
