import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { dataLoader } from "../utils/dataLoader";
import useRole from "../hooks/useRole";
import Cookies from "js-cookie";

export const Context = createContext();
const auth = getAuth(app);
const ContextProvider = ({ children }) => {
  const { products, categories, isLoading, isSuccess, isFetching } =
    dataLoader();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const [isBuyer, isSeller, setIsSeller, isBuyerLoading, isSellerLoading] =
    useRole(user?.email);
  const roles = ["Buyer", "Seller"];
  const [userRole, setUserRole] = useState(roles[0]);
  // console.log("%cisSeller -->  ", "color: green; font-size: 24px;", isSeller);
  //! handleUseRole / useEffect
  // console.log("user", user);
  // console.log(isBuyer, isSeller);
  const createUser = (email, passoword) => {
    // setCreatedUserEmail(email);
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, passoword);
  };
  const updateUserProfile = (userInfo) => {
    console.log(userInfo);
    setLoading(true);
    return updateProfile(auth.currentUser, userInfo);
  };
  const login = (email, passoword) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, passoword);
  };
  const authenticateWithProvider = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const logOut = () => {
    // localStorage.removeItem("shop-adidas-token");
    Cookies.remove('shop-adidas-token');

    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    login,
    authenticateWithProvider,
    logOut,
    isBuyer,
    isSeller,
    setIsSeller,
    isBuyerLoading,
    isSellerLoading,
    roles,
    userRole,
    setUserRole,
  };
    return (
      <Context.Provider
        value={{
          products,
          categories,
          isLoading,
          // isSuccess,
          // isFetching,
          authInfo,
        }}
      >
        {children}
      </Context.Provider>
    );
};
export default ContextProvider;
