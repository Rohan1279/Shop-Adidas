import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { Context } from "../../contexts/ContextProvider";
import { setAuthToken } from "../../hooks/setAuthToken";
import useRole from "../../hooks/useRole";
import { toast } from "react-hot-toast";

const googleProvider = new GoogleAuthProvider();

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
    toast.promise(
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
                // toast.success("Login successfull");

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
                console.log(err);
                // toast.error(err.message);
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
        }),
      {
        loading: "Logging in",
        success: "Login successfull",
        error: "Error while login",
      }
    );
  };
  const handleAuthenticate = (provider) => {
    authenticateWithProvider(provider)
      .then((result) => {
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
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="h-screen ">
      <form
        onSubmit={handleLogin}
        className="max-w-sm min-w-fit mx-auto rounded-xl shadow-nm relative my-20"
      >
        <LazyLoadImage
          src="https://cdn1.iconfinder.com/data/icons/3d-front-color/256/boy-front-color.png"
          className="absolute -top-14 left-0 right-0  bg-secondary-color shadow-nm mx-auto w-40 rounded-full"
        ></LazyLoadImage>

        <div className="px-8 pt-28 pb-8">
          <h1 className="text-center text-3xl font-extrabold ">Welcome back</h1>
          {/* //! EMAIL // */}
          {/* <span>Your name</span> */}
          <div className="flex  items-center border border-gray-300 rounded-full pl-2  overflow-hidden my-6">
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
          <div className="mt-3 mb-6 flex justify-between text-sm text-zinc-600">
            <span className="flex justify-center items-center space-x-1">
              {" "}
              <input type="checkbox" name="" id="" />{" "}
              <p className="">Remember me</p>
            </span>
            <p className="cursor-pointer hover:underline selection:bg-secondary-color">
              Forgot password?
            </p>
          </div>

          <button
            className="mx-auto bg-zinc-600 text-white border border-gray-300 p-2 text-xl active:scale-95 transition-all w-full rounded-md h-12"
            type="submit"
          >
            {isLoading ? <Loader></Loader> : "Login"}
          </button>

          <div className="flex justify-center items-center space-x-5 my-3 text-sm text-zinc-600">
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
          <p className="text-center text-sm text-zinc-600">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-zinc-900 font-bold hover:underline"
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
