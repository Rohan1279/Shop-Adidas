import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../contexts/ContextProvider";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const { authInfo } = useContext(Context);
  const { createUser, authenticateWithProvider, updateUserProfile, logOut } =
    authInfo;
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
  return (
    <div className="h-screen ">
      <form
        // onSubmit={handleRegister}
        className="max-w-sm min-w-fit mx-auto p-8 rounded-xl shadow-nm "
      >
        <h1 className="text-center text-3xl font-extrabold ">Login</h1>

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

        <div>
          <input
            type="submit"
            value="Login"
            className="mx-auto bg-zinc-600 text-white border border-gray-300 p-2 text-xl active:scale-95 transition-all w-full rounded-md m-6 "
          />
          {/* <button
        onClick={handleRegister}
        className="mx-auto bg-secondary-color border border-gray-300 p-2 text-xl active:shadow-nm-inset w-full rounded-md"
      >
        Register
      </button> */}
        </div>

        <hr className=" border-gray-300 my-3" />
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
      </form>
    </div>
  );
};

export default Login;
