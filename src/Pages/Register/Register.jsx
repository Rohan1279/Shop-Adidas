import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RadioButton from "../../components/RadioButton/RadioButton";
import { Context } from "../../contexts/ContextProvider";
import { setAuthToken } from "../../hooks/setAuthToken";
import useRole from "../../hooks/useRole";
import { useToken } from "../../hooks/useToken";
import { toast } from "react-hot-toast";
const googleProvider = new GoogleAuthProvider();
// const githubProvider = new GithubAuthProvider();
const Register = () => {
  const { authInfo } = useContext(Context);
  const {
    createUser,
    authenticateWithProvider,
    updateUserProfile,
    verifyEmail,
    logOut,
    user,
    roles,
    userRole,
    setUserRole,
  } = authInfo;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  console.log(userRole);
  // const [isBuyer, isSeller] = useRole(createdUserEmail);
  //! jwt verification
  // const [token] = useToken(createUserEmail);
  // if (token) {
  //   console.log(token);
  //   navigate("/");
  // }
  const [isLoading, setIsLoading] = useState(false);

  // setIsSeller(userRole === "Seller");
  const buyerRef = useRef();
  const sellerRef = useRef();
  // console.log("userRole", userRole);
  const handleAuthenticate = (provider) => {
    authenticateWithProvider(provider)
      .then((result) => {
        // console.log(result.user);
        // console.log(userRole);
        // saveUser(result?.user.displayName, result?.user.email, userRole);
        const user = { ...result?.user, userRole };
        setAuthToken(user, logOut);
        // setCreatedUserEmail(user?.email);
      })
      .catch((err) => {
        console.log(err);
        // logOut();
      });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    // setIsLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // console.log(name, email, password);
    //! record the start time
    const startTime = new Date();
    createUser(email, password)
      .then((result) => {
        //! record the end time
        const endTime = new Date();
        const responseTime = endTime - startTime; // calculate the response time
        console.log(
          `%cResponse time: ${responseTime}ms`,
          "color: yellow; font-size: 24px;"
        );
        // console.log(result);

        const user = { ...result?.user, userRole };
        // updateUserProfile(userInfo)
        //   .then(() => {
        // saveUser(name, email, userRole);

        setAuthToken(user);
        toast.success("Account created successfully");
        navigate("/products");
        // verifyEmail().then(() => {
        //   console.log(
        //     "%Email sent for verification",
        //     "color: yellow; font-size: 24px;"
        //   );
        //   // navigate(from, { replace: true });
        // });
        // toast.success("Account created successfully");
        // navigate("/products");
        // setCreatedUserEmail(user?.email);
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
  // const saveUser = (name, email, userRole) => {
  //   const user = { name, email, userRole };
  //   fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // ! jwt verification
  //       // setCreatedUserEmail(email);
  //       if (data.acknowledged) {
  //         // toast.success("Account created successfully");
  //         console.log(data.acknowledged);
  //         setIsLoading(false);
  //       }
  //       console.log(data);
  //     });
  // };

  if (!user?.email) {
    return (
      <div className="py-40 lg:h-screen">
        <form
          onSubmit={handleRegister}
          className="relative mx-auto  min-w-fit max-w-sm rounded-xl p-8 shadow-nm"
        >
          <LazyLoadImage
            src="https://cdn1.iconfinder.com/data/icons/3d-front-color/256/boy-front-color.png"
            className="absolute -top-20 left-0 right-0  mx-auto w-40 rounded-full bg-secondary-color shadow-nm"
          ></LazyLoadImage>
          <div className="pt-16">
            <h1 className="text-center text-3xl font-extrabold ">
              Create account
            </h1>
            {/* //! EMAIL // */}
            {/* <span className="">Your email</span> */}
            <div className="my-6 flex items-center overflow-hidden rounded-full border  border-gray-300 pl-2">
              {/* <FaVoicemail className=""></FaVoicemail> */}
              <img
                src="https://cdn0.iconfinder.com/data/icons/chat-64/512/mail.png"
                alt=""
                className="w-10 p-1"
              />
              <input
                // onBlur={(e) => setCreatedUserEmail(e?.target?.value)}
                type="email"
                placeholder="example@gmail.com"
                name="email"
                className="w-full rounded-r-full border-l border-l-gray-300 bg-secondary-color p-2 focus:shadow-nm-inset focus:outline-none"
                required
              />
            </div>
            {/* //! NAME // */}
            {/* <span>Your name</span> */}
            <div className="mb-6  flex items-center overflow-hidden rounded-full border  border-gray-300 pl-2">
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
                className="w-full rounded-r-full border-l border-l-gray-300 bg-secondary-color p-2 focus:shadow-nm-inset focus:outline-none"
                // required
              />
            </div>
            {/* //! PASSWORD // */}
            {/* <span className="">Password</span> */}
            <div className="mb-6 flex items-center overflow-hidden rounded-full border border-gray-300  pl-2">
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
                className="w-full rounded-r-full border-l border-l-gray-300 bg-secondary-color p-2 focus:shadow-nm-inset focus:outline-none"
                required
              />
            </div>
            {/* //! ROLE // */}
            <h2 className="my-3 text-center ">Choose your role</h2>
            <RadioButton
              roles={roles}
              userRole={userRole}
              setUserRole={setUserRole}
              buyerImg={
                "https://cdn3.iconfinder.com/data/icons/webina-seo-development-and-marketing/128/seo_web_3-68-256.png"
              }
              sellerImg={
                "https://cdn0.iconfinder.com/data/icons/3d-online-shop/256/icbsv2_7.png"
              }
            ></RadioButton>
            {/* <div
              className={`w-full mx-auto flex items-center space-x-2 ${
                roleError && "animate-shake"
              }`}
            >
              <div
                onClick={(e) => {
                  
                  handleUserRole(e, buyerRef);
                }}
                className="w-1/2 cursor-pointer flex items-center justify-center border border-gray-300 p-1 rounded-md transition-all duration-300 "
              >
               
                <img
                  src="https://cdn3.iconfinder.com/data/icons/webina-seo-development-and-marketing/128/seo_web_3-68-256.png"
                  alt=""
                  className="w-10 h-10"
                />
                <span className="label-text mx-3 text-xl tccc" ref={buyerRef}>
                  Buyer
                </span>
             
              </div>
              <div
                onClick={(e) => {
                  
                  handleUserRole(e, sellerRef);
                }}
                className="w-1/2 cursor-pointer  flex items-center justify-center border border-gray-300 p-1 rounded-md  transition-all duration-300 "
              >
              
                <img
                  src="https://cdn0.iconfinder.com/data/icons/3d-online-shop/256/icbsv2_7.png"
                  alt=""
                  className="w-10 h-10"
                />
                <span className="label-text mx-3 text-xl" ref={sellerRef}>
                  Seller
                </span>
                
              </div>
            </div> */}

            {/* //!  REGISTER BUTTON */}
            <div>
              <input
                type="submit"
                value="Register"
                className="mx-auto mt-6 w-full rounded-md border border-gray-300 bg-zinc-600 p-2 text-xl text-white transition-all active:scale-95 "
              />
              {/* <button
              onClick={handleRegister}
              className="mx-auto bg-secondary-color border border-gray-300 p-2 text-xl active:shadow-nm-inset w-full rounded-md"
            >
              Register
            </button> */}
            </div>

            <div className="my-3 flex items-center justify-center space-x-5 text-sm text-zinc-600">
              <hr className=" w-20 border-gray-400" />
              <p>OR</p>
              <hr className=" w-20 border-gray-400" />
            </div>
            <div className="mb-3 flex justify-center  space-x-3">
              {/* <FaGoogle
              onClick={() => handleAuthenticate(googleProvider)}
              className="text-6xl bg-secondary-color shadow-nm p-2 rounded-full mx-auto active:shadow-nm-inset"
            ></FaGoogle> */}
              <img
                onClick={() => handleAuthenticate(googleProvider)}
                src="https://cdn3.iconfinder.com/data/icons/3d-applications/256/app_icons_social_media_search___google_logo_engine_software.png"
                alt=""
                className="h-12 w-12 rounded-full bg-secondary-color p-2 shadow-nm active:shadow-nm-inset"
              />
              <img
                src="https://cdn3.iconfinder.com/data/icons/3d-applications/256/app_icons_social_media___facebook_logo_social_network_media_online.png"
                alt=""
                className="h-12 w-12 rounded-full bg-secondary-color p-2 shadow-nm active:shadow-nm-inset"
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
            <p className=" text-center text-sm text-zinc-600">
              Already a user?{" "}
              <Link
                to={"/login"}
                className="font-bold text-zinc-900 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    );
  } else
    return (
      <div className=" min-h-screen pt-24 text-center">
        <p className="my-auto">Want to create a new account?</p>
        <p className="my-auto">
          Please{" "}
          <button
            onClick={() => logOut()}
            className="underline-offset-1 hover:text-blue-400 hover:underline"
          >
            logout
          </button>{" "}
          first
        </p>
      </div>
    );
};

export default Register;
