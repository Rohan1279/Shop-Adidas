import { useContext, useEffect, useState } from "react";
import { Context } from "../contexts/ContextProvider";

export const useToken = (email) => {
  const { authInfo } = useContext(Context);
  const {} = authInfo;
  const [token, setToken] = useState("");
  // console.log("user email", email);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.VITE_SERVER_URL}/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log("from useToken", data);
          if (data.accessToken) {
            localStorage.setItem("shop-adidas-token", data.accessToken);
            setToken(data.accessToken);
          } else {
            // toast.error("Please create an account first");
            // logOut();
            // return;
          }
        });
    }
  }, [email]);
  return [token];
};
