import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { Context } from "../../contexts/ContextProvider";
import { setAuthToken } from "../../hooks/setAuthToken";
import useRole from "../../hooks/useRole";
import { toast } from "react-hot-toast";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const Login = () => {
  const { authInfo } = useContext(Context);
  const { authenticateWithProvider, login, logOut, user } = authInfo;
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log("location", location);
  console.log("state", state);
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // check if user exist in database

    fetch(`${import.meta.env.VITE_SERVER_URL}/user/${email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.user);
        const userRole = data?.userRole;
        //! record the start time
        const startTime = new Date();
        if (userRole) {
          login(email, password)
            .then((result) => {
              setIsLoading(false);
              toast.success("Login successfull");
              //! record the end time
              const endTime = new Date();
              const responseTime = endTime - startTime; // calculate the response time
              const user = {
                ...result?.user,
                userRole: data?.userRole,
              };
              setAuthToken(user, logOut);

              // console.log(
              //   "%cLogin successfull!",
              //   "color: green; font-size: 24px;"
              // );

              form.reset();
              navigate(from, {
                replace: true,
                state:
                  location?.state?.from?.state?.from?.state || //from bavbar logout
                  location?.state,
              });

              // console.log(isBuyer, isSeller);
              // toast.success("Login successfull");
            })
            .catch((err) => {
              setIsLoading(false);
              console.log(err.message);
              toast.error(
                err.message === "Firebase: Error (auth/wrong-password)." &&
                  "Wrong password"
              );
              // setIsLoading(false);
            });
        } else {
          // console.log(
          //   "%cPlease create an account first!",
          //   "color: red; font-size: 24px;"
          // );
          setIsLoading(false);
          toast.error("Please create an account first");
        }
      });
  };
  const handleAuthenticate = (provider) => {
    authenticateWithProvider(provider)
      .then((result) => {
        toast.success("Login successfull");
        fetch(`${import.meta.env.VITE_SERVER_URL}/user/${result?.user?.email}`)
          .then((res) => res.json())
          .then((data) => {
            const userRole = data?.userRole;
            // setUserEmail(result?.user?.email);
            const user = {
              ...result?.user,
              userRole,
            };
            setAuthToken(user, logOut);
            navigate(from, {
              replace: true,
              state:
                location?.state?.from?.state?.from?.state || //from bavbar logout
                location?.state,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.message); hi
      });
  };
  return (
    <div className="h-screen pt-36">
      <form
        onSubmit={handleLogin}
        className="relative mx-auto min-w-fit max-w-sm rounded-xl shadow-nm"
      >
        <LazyLoadImage
          src="https://cdn1.iconfinder.com/data/icons/3d-front-color/256/boy-front-color.png"
          className="absolute -top-14 left-0 right-0  mx-auto w-40 rounded-full bg-secondary-color shadow-nm"
        ></LazyLoadImage>

        <div className="px-8 pt-28 pb-8">
          <h1 className="text-center text-3xl font-extrabold ">Welcome back</h1>
          {/* //! EMAIL // */}
          {/* <span>Your name</span> */}
          <div className="my-6  flex items-center overflow-hidden rounded-full border  border-gray-300 pl-2">
            {/* <FaVoicemail className=""></FaVoicemail> */}
            <img
              src="https://cdn3.iconfinder.com/data/icons/school-and-education-113/256/name_card.png"
              alt=""
              className="w-10 p-1"
            />
            <input
              // onBlur={(e) => setUserEmail(e?.target?.value)}
              type="email"
              placeholder="your email"
              name="email"
              className="w-full rounded-r-full border-l border-l-gray-300 bg-secondary-color p-2 focus:shadow-nm-inset focus:outline-none"
              // required
            />
          </div>
          {/* //! PASSWORD // */}
          {/* <span className="">Password</span> */}
          <div className="mt-6 flex items-center overflow-hidden rounded-full border border-gray-300  pl-2">
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
          <div className="mt-3 mb-6 flex justify-between text-sm text-zinc-600">
            <span className="flex items-center justify-center space-x-1">
              {" "}
              <input type="checkbox" name="" id="" />{" "}
              <p className="">Remember me</p>
            </span>
            <p className="cursor-pointer selection:bg-secondary-color hover:underline">
              Forgot password?
            </p>
          </div>

          <button
            className="mx-auto h-12 w-full rounded-md border border-gray-300 bg-zinc-600 p-2 text-xl text-white transition-all active:scale-95"
            type="submit"
          >
            {isLoading ? <Loader></Loader> : "Login"}
          </button>

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
              onClick={() => handleAuthenticate(facebookProvider)}
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
          <p className="text-center text-sm text-zinc-600">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="font-bold text-zinc-900 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
