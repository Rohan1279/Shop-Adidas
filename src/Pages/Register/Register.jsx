import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useRef, useState } from "react";
// import {
//   FaAppStore,
//   FaGithub,
//   FaGoogle,
//   FaSignOutAlt,
//   FaUsersSlash,
//   FaVoicemail,
// } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../../contexts/ContextProvider";
const googleProvider = new GoogleAuthProvider();
// const githubProvider = new GithubAuthProvider();
const Register = () => {
  const { authInfo } = useContext(Context);
  const { createUser, authenticateWithProvider, updateUserProfile, logOut } =
    authInfo;
  const [userRole, setUserRole] = useState("Buyer");
  const [prevRole, setprevRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const buyerRef = useRef();
  const sellerRef = useRef();
  console.log("userRole", userRole);
  const handleAuthenticate = (provider) => {
    if (userRole) {
      authenticateWithProvider(provider)
        .then((result) => {
          console.log(result.user);
          console.log(userRole);
          // saveUser(result?.user.displayName, result?.user.email, userRole);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setRoleError(true);
      return;
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    // setIsLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);

    if (userRole) {
      createUser(email, password)
        .then((result) => {
          console.log(result);
          const user = result.user;
          const userInfo = { displayName: name };
          // updateUserProfile(userInfo)
          //   .then(() => {
          //     // saveUser(name, email, userRole);
          //   })
          //   .catch((err) => console.log(err));
          // console.log(user);
        })
        .catch((err) => {
          console.log(err);
          // toast.error(err.message);
          setIsLoading(false);
        });
    } else {
      setRoleError(true);
      return;
    }
  };
  const handleUserRole = (e, role) => {
    // console.log("role", role?.current.innerText);
    // console.log("userRole", userRole);
    // console.log(e.target.classList);
    e.target?.classList?.add("bg-blue-400");

    // if (e !== prevRole) {
    //   prevRole?.target?.classList?.remove("bg-blue-400");
    //   setUserRole(role?.current.innerText);
    // }
    //  else {
    //   e.target?.classList?.remove("bg-blue-400");
    // }
    if (e.target !== prevRole) {
      prevRole?.target?.classList?.remove("bg-blue-400");
    }
    setprevRole(e);
    setUserRole(role?.current.innerText);

    setRoleError(false);
  };
  return (
    <div className="h-fit ">
      <form
        onSubmit={handleRegister}
        className="max-w-sm min-w-fit mx-auto p-8 rounded-xl shadow-nm "
      >
        <h1 className="text-center text-3xl font-extrabold ">Create account</h1>
        {/* //! EMAIL // */}
        {/* <span className="">Your email</span> */}
        <div className="flex items-center border border-gray-300 rounded-full pl-2  overflow-hidden my-6">
          {/* <FaVoicemail className=""></FaVoicemail> */}
          <img
            src="https://cdn0.iconfinder.com/data/icons/chat-64/512/mail.png"
            alt=""
            className="w-10 p-1"
          />
          <input
            type="email"
            placeholder="example@gmail.com"
            name="email"
            className="border-l border-l-gray-300 focus:outline-none w-full bg-secondary-color p-2 rounded-r-full focus:shadow-nm-inset text-gray-600 "
            required
          />
        </div>
        {/* //! NAME // */}
        {/* <span>Your name</span> */}
        <div className="flex  items-center border border-gray-300 rounded-full pl-2  overflow-hidden mb-6">
          {/* <FaVoicemail className=""></FaVoicemail> */}
          <img
            src="https://cdn3.iconfinder.com/data/icons/school-and-education-113/256/name_card.png"
            alt=""
            className="w-10 p-1"
          />
          <input
            type="text"
            placeholder="your name"
            name="name"
            className="border-l border-l-gray-300 focus:outline-none w-full bg-secondary-color p-2 rounded-r-full focus:shadow-nm-inset"
            // required
          />
        </div>
        {/* //! PASSWORD // */}
        {/* <span className="">Password</span> */}
        <div className="flex mb-6 items-center border border-gray-300 rounded-full pl-2  overflow-hidden">
          {/* <FaVoicemail className=""></FaVoicemail> */}
          <img
            src="https://cdn0.iconfinder.com/data/icons/keys-and-locks-16/256/Key_Car_1_Front.png"
            alt=""
            className="w-10 p-1"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="border-l border-l-gray-300 focus:outline-none w-full bg-secondary-color p-2 rounded-r-full focus:shadow-nm-inset"
            required
          />
        </div>
        {/* user role */}
        <h2 className="text-center my-3">Choose your role</h2>
        <div
          className={`w-full mx-auto flex items-center space-x-2 ${
            roleError && "animate-shake"
          }`}
        >
          <div
            onClick={(e) => {
              // e.preventDefault();
              // e.target?.classList?.add("bg-blue-400");
              // setUserRole(buyerRef.current.innerText);
              handleUserRole(e, buyerRef);
            }}
            className="w-1/2 cursor-pointer flex items-center justify-center border border-gray-300 p-1 rounded-md transition-all duration-300 "
          >
            {/* <label className="label cursor-pointer  flex items-center border border-gray-300 p-1 rounded-md focus:bg-blue-400"> */}

            {/* <button
              // onChange={handleUserRole}
              onClick={(e) => {
                e.preventDefault();
                // e.target?.classList?.add("bg-blue-400");
                // setUserRole(buyerRef.current.innerText);
                handleUserRole(e, buyerRef);
              }}
              className="cursor-pointer flex items-center justify-center border border-gray-300 p-1 rounded-md transition-all duration-300 w-full"
              // checked
              // defaultChecked
            > */}
            <img
              src="https://cdn3.iconfinder.com/data/icons/webina-seo-development-and-marketing/128/seo_web_3-68-256.png"
              alt=""
              className="w-10 h-10"
            />
            <span className="label-text mx-3 text-xl tccc" ref={buyerRef}>
              Buyer
            </span>
            {/* </button> */}
            {/* </label> */}
          </div>
          <div
            onClick={(e) => {
              // e.preventDefault();
              // setUserRole(sellerRef.current.innerText);
              handleUserRole(e, sellerRef);
            }}
            className="w-1/2 cursor-pointer  flex items-center justify-center border border-gray-300 p-1 rounded-md  transition-all duration-300 "
          >
            {/* <label className="label cursor-pointer  flex items-center border border-gray-300 p-1 rounded-md focus:bg-blue-400"> */}
            {/* <button
              // onChange={handleUserRole}
              onClick={(e) => {
                // e.preventDefault();
                // setUserRole(sellerRef.current.innerText);
                handleUserRole(e, sellerRef);
              }}
              className="cursor-pointer  flex items-center justify-center border border-gray-300 p-1 rounded-md  transition-all duration-300 "
            > */}
            <img
              src="https://cdn0.iconfinder.com/data/icons/3d-online-shop/256/icbsv2_7.png"
              alt=""
              className="w-10 h-10"
            />
            <span className="label-text mx-3 text-xl" ref={sellerRef}>
              Seller
            </span>
            {/* </button> */}
            {/* </label> */}
          </div>
        </div>
        {roleError && (
          <p className="text-center text-sm text-red-500">
            Please choose a role
          </p>
        )}
        <div>
          <input
            type="submit"
            value="Register"
            className="mx-auto bg-zinc-600 text-white border border-gray-300 p-2 text-xl active:scale-95 transition-all w-full rounded-md mt-6 "
          />
          {/* <button
            onClick={handleRegister}
            className="mx-auto bg-secondary-color border border-gray-300 p-2 text-xl active:shadow-nm-inset w-full rounded-md"
          >
            Register
          </button> */}
        </div>

        <div className="flex justify-center items-center space-x-5 my-3">
          <hr className=" border-gray-400 w-20" />
          <p>OR</p>
          <hr className=" border-gray-400 w-20" />
        </div>
        <div className="flex justify-center space-x-3  mb-3">
          {/* <FaGoogle
            onClick={() => handleAuthenticate(googleProvider)}
            className="text-6xl bg-secondary-color shadow-nm p-2 rounded-full mx-auto active:shadow-nm-inset"
          ></FaGoogle> */}
          <img
            onClick={() => handleAuthenticate(googleProvider)}
            src="https://cdn3.iconfinder.com/data/icons/3d-applications/256/app_icons_social_media_search___google_logo_engine_software.png"
            alt=""
            className="w-12 h-12 bg-secondary-color shadow-nm p-2 rounded-full active:shadow-nm-inset"
          />
          <img
            src="https://cdn3.iconfinder.com/data/icons/3d-applications/256/app_icons_social_media___facebook_logo_social_network_media_online.png"
            alt=""
            className="w-12 h-12 bg-secondary-color shadow-nm p-2 rounded-full active:shadow-nm-inset"
          />
        </div>
        {/* <div className=" mt-6 ">
          <button className="btn btn-primary">
            {isLoading ? (
              <SmallLoader />
            ) : (
              <input type="submit" value="Register" className="text-base" />
            )}
          </button>
        </div> */}
        <p className=" text-center">
          Already a user?{" "}
          <Link to={"/login"} className="text-orange-600 font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
