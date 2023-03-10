import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { Context } from "../../contexts/ContextProvider";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const { authInfo } = useContext(Context);
  const { createUser, authenticateWithProvider, updateUserProfile, logOut } =
    authInfo;
  const handleAuthenticate = (provider) => {
    authenticateWithProvider(provider)
      .then((result) => {
        console.log(result.user);
        console.log(userRole);
        // saveUser(result?.user.displayName, result?.user.email, userRole);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="h-fit ">
      <form
        // onSubmit={handleRegister}
        className="max-w-sm min-w-fit mx-auto rounded-xl shadow-nm relative my-20"
      >
        <LazyLoadImage
          src="https://cdn1.iconfinder.com/data/icons/3d-front-color/256/boy-front-color.png"
          className="absolute -top-14 left-0 right-0  bg-secondary-color shadow-nm mx-auto w-40 rounded-full"
        ></LazyLoadImage>

        <div className="px-8 pt-28 pb-8">
          <h1 className="text-center text-3xl font-extrabold ">Welcome back</h1>
          {/* //! NAME // */}
          {/* <span>Your name</span> */}
          <div className="flex  items-center border border-gray-300 rounded-full pl-2  overflow-hidden my-6">
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
          <div className="flex mt-6 items-center border border-gray-300 rounded-full pl-2  overflow-hidden">
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
          <div className="mt-3 mb-6 flex justify-between">
            <span className="flex justify-center items-center space-x-1">
              {" "}
              <input type="checkbox" name="" id="" />{" "}
              <p className="">Remember me</p>
            </span>
            <p className="cursor-pointer hover:underline selection:bg-secondary-color">
              Forgot password?
            </p>
          </div>
          <input
            type="submit"
            value="Login"
            className="mx-auto bg-zinc-600 text-white border border-gray-300 p-2 text-xl active:scale-95 transition-all w-full rounded-md  "
          />
          {/* <button
        onClick={handleRegister}
        className="mx-auto bg-secondary-color border border-gray-300 p-2 text-xl active:shadow-nm-inset w-full rounded-md"
      >
        Register
      </button> */}

          <div className="flex justify-center items-center space-x-5 my-3">
            <hr className=" border-gray-300 w-16" />
            <p>OR</p>
            <hr className=" border-gray-300 w-16" />
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
            Don't have an account?{" "}
            <Link to={"/register"} className="text-orange-600 font-bold">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
