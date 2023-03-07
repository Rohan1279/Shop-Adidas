import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useRef, useState } from "react";
import {
  FaAppStore,
  FaGithub,
  FaGoogle,
  FaSignOutAlt,
  FaVoicemail,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../../contexts/ContextProvider";
const googleProvider = new GoogleAuthProvider();
// const githubProvider = new GithubAuthProvider();
const Register = () => {
  const { authInfo } = useContext(Context);
  const { createUser, authenticateWithProvider, updateUserProfile, logOut } =
    authInfo;
  const [userRole, setUserRole] = useState("Buyer");
  const [isLoading, setIsLoading] = useState(false);

  const buyerRef = useRef();
  const sellerRef = useRef();
  // console.log(userRole);
  const handleAuthenticate = (provider) => {
    authenticateWithProvider(provider)
      .then((result) => {
        console.log(result.user);
        // saveUser(result?.user.displayName, result?.user.email, userRole);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    // setIsLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);

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
  };
  return (
    <div className="h-screen">
      <FaSignOutAlt
        onClick={() => logOut()}
        className="text-2xl bg-secondary-color shadow-nm active:shadow-nm-inset"
      ></FaSignOutAlt>
      <form onSubmit={handleRegister} className="card-body w-1/3 mx-auto">
        <div className="form-control">
          <div className="form-control ">
            <label className="input-group  rounded-none">
              <span className="label-text ">Your email</span>
              <div className="flex  items-center border border-gray-300 rounded-md">
                {/* <FaVoicemail className=""></FaVoicemail> */}
                <img
                  src="https://cdn2.iconfinder.com/data/icons/3d-basic/512/email_mail_message_envelope_communication.png"
                  alt=""
                  className="w-10 p-1"
                />
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  name="email"
                  className="input input-bordered w-full bg-secondary-color shadow-nm-inset p-3"
                  required
                />
              </div>
            </label>
          </div>
        </div>
        <div className="">
          <div className="form-control">
            <label className="input-group  ">
              <span>Your name</span>
              <div className="flex  items-center border border-gray-300 rounded-md">
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
                  className="input input-bordered w-full bg-secondary-color shadow-nm-inset p-3"
                  // required
                />
              </div>
            </label>
            <label className="input-group ">
              <span className="label-text">Password</span>
              <div className="flex  items-center border border-gray-300 rounded-md">
                {/* <FaVoicemail className=""></FaVoicemail> */}
                <img
                  src="https://cdn3.iconfinder.com/data/icons/3d-basic/256/password_padlock_lock_privacy_lock.png"
                  alt=""
                  className="w-10 p-1"
                />
                <input
                  type="text"
                  name="password"
                  placeholder="password"
                  className="input input-bordered w-full bg-secondary-color shadow-nm-inset p-3"
                  required
                />
              </div>
            </label>
          </div>
        </div>
        {/* user role */}
        <div className="flex w-full justify-evenly items-center my-3">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mx-3 text-xl" ref={buyerRef}>
                Buyer
              </span>
              <input
                // onChange={handleUserRole}
                // onChange={() => setUserRole(buyerRef.current.innerText)}
                type="radio"
                name="radio-10"
                className="radio checked:bg-yellow-500"
                // checked
                defaultChecked
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mx-3 text-xl" ref={sellerRef}>
                Seller
              </span>
              <input
                // onChange={handleUserRole}
                onChange={() => setUserRole(sellerRef.current.innerText)}
                type="radio"
                name="radio-10"
                className="radio checked:bg-fuchsia-500"
              />
            </label>
          </div>
        </div>
        <button
          // onClick={handleRegister}
          className="mx-auto bg-secondary-color shadow-nm p-2 text-3xl active:shadow-nm-inset"
        >
          Register
        </button>
        <div className="divider ">OR</div>
        <hr className=" border-gray-400" />
        <div className="flex  mx-auto gap-x-10">
          {/* <FaGoogle
            onClick={() => handleAuthenticate(googleProvider)}
            className="text-6xl bg-secondary-color shadow-nm p-2 rounded-full mx-auto active:shadow-nm-inset"
          ></FaGoogle> */}
          <img
            onClick={() => handleAuthenticate(googleProvider)}
            src="https://cdn3.iconfinder.com/data/icons/3d-applications/256/app_icons_social_media_search___google_logo_engine_software.png"
            alt=""
            className="w-12 h-12 bg-secondary-color shadow-nm p-2 rounded-full mx-auto active:shadow-nm-inset"
          />
        </div>
        <div className="form-control mt-6 ">
          {/* <button className="btn btn-primary">
            {isLoading ? (
              <SmallLoader />
            ) : (
              <input type="submit" value="Register" className="text-base" />
            )}
          </button> */}
        </div>
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
