import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useRef, useState } from "react";
import { FaAppStore, FaGithub, FaGoogle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../../contexts/ContextProvider";
const googleProvider = new GoogleAuthProvider();
// const githubProvider = new GithubAuthProvider();
const Register = () => {
  const { authInfo } = useContext(Context);
  const { createUser, authenticateWithProvider, updateUserProfile, logOut } =
    authInfo;
  const [userRole, setUserRole] = useState("Buyer");
  const buyerRef = useRef();
  const sellerRef = useRef();
  console.log(userRole);
  const handleAuthenticate = (provider) => {
    authenticateWithProvider(provider)
      .then((result) => {
        console.log(result.user);
        saveUser(result?.user.displayName, result?.user.email, userRole);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // const image = e.target.image.files[0];
    // const formData = new FormData();
    // formData.append("image", image);
    // console.log(image);

    getImageUrl(imgFile).then((imgData) => {
      console.log(imgData);
      createUser(email, password)
        .then((result) => {
          console.log(result);
          const user = result.user;
          const userInfo = { displayName: name, photoURL: imgData };
          updateUserProfile(userInfo)
            .then(() => {
              saveUser(name, email, userRole);
            })
            .catch((err) => console.log(err));
          // console.log(user);
        })
        .catch((err) => {
          toast.error(err.message);
          setIsLoading(false);
        });
    });
  };
  return (
    <div className="h-screen">
      <FaSignOutAlt
        onClick={() => logOut()}
        className="text-2xl bg-secondary-color shadow-nm active:shadow-nm-inset"
      ></FaSignOutAlt>
      <form onSubmit={handleRegister} className="card-body w-full">
        <div className="form-control">
          <label className="input-group ">
            <span>Name</span>
            <input
              type="text"
              placeholder="your name"
              name="name"
              className="input input-bordered w-full"
              // required
            />
          </label>
        </div>
        <div className="">
          <div className="form-control pb-2 ">
            <label className="input-group rounded-none">
              <span className="label-text ">Email</span>
              <input
                type="text"
                placeholder="email"
                name="email"
                className="input input-bordered w-full"
                required
              />
            </label>
          </div>
          <div className="form-control">
            <label className="input-group">
              <span className="label-text">Password</span>
              <input
                type="text"
                name="password"
                placeholder="password"
                className="input input-bordered w-full"
                required
              />
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
        <div className="divider ">OR</div>
        <hr className=" border-gray-400"/>
        <div className="flex  mx-auto gap-x-10">
          <FaGoogle
            onClick={() => handleAuthenticate(googleProvider)}
            className="text-6xl bg-secondary-color shadow-nm p-2 rounded-full mx-auto active:shadow-nm-inset"
          ></FaGoogle>
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
