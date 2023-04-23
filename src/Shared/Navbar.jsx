import { Menu, Popover, Transition } from "@headlessui/react";
import React, { Fragment, useState, useContext } from "react";
import Button from "../components/Button/Button";
import {
  HiBars3BottomLeft,
  HiOutlineXMark,
  HiShoppingCart,
} from "react-icons/hi2";
import {
  FaAppStore,
  FaGithub,
  FaGoogle,
  FaSignOutAlt,
  FaUsersSlash,
  FaVoicemail,
} from "react-icons/fa";
import { Context } from "../contexts/ContextProvider";
import { Link, Navigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const { authInfo } = useContext(Context);
  const { logOut, user, isBuyer, isSeller, userRole } = authInfo;
  // console.log("%cisSeller -->  ", "color: green; font-size: 24px;", isSeller);

  const [active, setActive] = useState(false);
  return (
    <nav className="bg-secondary-color fixed top-0 w-full z-10 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8  relative z-30">
        <div className="relative h-16 flex items-center justify-between">
          {/* <!-- Mobile menu button--> */}
          {/* <!-- Mobile menu, show/hide based on menu state. --> */}
          <div className="h-6 overflow-hidden sm:hidden">
            <Popover className="">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                ${open ? "" : "text-opacity-90"}`}
                  >
                    <Transition
                      show={!active}
                      enter="transform transition duration-[200ms] "
                      enterFrom="opacity-0 scale-50"
                      enterTo="opacity-100 scale-100"
                      leave="transform duration-[200ms] transition ease-in-out"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <HiBars3BottomLeft
                        onClick={() => setActive(!active)}
                        className="text-2xl hover:text-opacity-100 active:scale-90 transition-all"
                      ></HiBars3BottomLeft>
                    </Transition>

                    <Transition
                      show={active}
                      enter="transform transition duration-[400ms] "
                      enterFrom="opacity-0 scale-50 rotate-0"
                      enterTo="opacity-100  scale-100 rotate-90"
                      leave="transform duration-[400ms] transition"
                      leaveFrom="opacity-100 scale-100 "
                      leaveTo="opacity-0 scale-95 rotate-90"
                    >
                      <HiOutlineXMark
                        onClick={() => setActive(!active)}
                        className="text-2xl hover:text-opacity-100  active:scale-90 transition-all"
                      ></HiOutlineXMark>
                    </Transition>
                  </Popover.Button>
                  <Transition
                    show={active}
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-0 z-10 top-16 w-screen max-w-sm  sm:px-0 lg:max-w-3xl">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ">
                        <div className="relative grid gap-8 bg-white lg:grid-cols-2 ">
                          <div className="sm:hidden bg-secondary-color h-fit z-10">
                            <div className="space-y-1 px-2 pt-2 pb-3 ">
                              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                              <NavLink
                                onClick={() => setActive(!active)}
                                to={"/"}
                                className={({ isActive }) =>
                                  isActive
                                    ? `bg-secondary-color text-gray-500 shadow-nm hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block`
                                    : "bg-secondary-color text-gray-500  transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block"
                                }
                              >
                                Home
                              </NavLink>
                              <NavLink
                                onClick={() => setActive(!active)}
                                to={"/products"}
                                className={({ isActive }) =>
                                  isActive
                                    ? `bg-secondary-color text-gray-500 shadow-nm hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block`
                                    : "bg-secondary-color text-gray-500  transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block"
                                }
                              >
                                Products
                              </NavLink>
                              {/* <NavLink
                                onClick={() => setActive(!active)}
                                to={"/contact"}
                                className={({ isActive }) =>
                                  isActive
                                    ? `bg-secondary-color text-gray-500 shadow-nm hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block`
                                    : "bg-secondary-color text-gray-500  transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block"
                                }
                              >
                                Contact
                              </NavLink> */}
                              {(userRole === "Seller" || isSeller) &&
                              user?.email ? (
                                <NavLink
                                  onClick={() => setActive(!active)}
                                  to={"/dashboard"}
                                  className={({ isActive }) =>
                                    isActive
                                      ? `bg-secondary-color text-gray-500 shadow-nm hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block`
                                      : "bg-secondary-color text-gray-500  transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block"
                                  }
                                >
                                  Dashboard
                                </NavLink>
                              ) : (
                                ""
                              )}
                              <NavLink
                                onClick={() => setActive(!active)}
                                to={"/cart"}
                                className={({ isActive }) =>
                                  isActive
                                    ? `bg-secondary-color text-gray-500 shadow-nm-inset hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block`
                                    : "bg-secondary-color text-gray-500  transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block"
                                }
                              >
                                {/* <div className="flex space-x-2 rounded-md">
                                  <HiShoppingCart className="text-xl"></HiShoppingCart>
                                  <span className="text-sm">Cart</span>
                                </div> */}
                                <div className="flex space-x-2 justify- items-center">
                                  {/* <HiShoppingCart className="text-xl"></HiShoppingCart> */}
                                  <img
                                    src="https://cdn4.iconfinder.com/data/icons/smooth-3d-for-online-stores/512/shopping-basket.png"
                                    alt=""
                                    className="w-7"
                                  />
                                  <span className="text-sm">Cart</span>
                                </div>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
          <div className="flex lg:flex-1">
            <img
              className="block h-8 w-auto lg:hidden"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
            <img
              className="hidden h-8 w-auto lg:block"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
          {/* //! DESKTOP_NAVBAR */}
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block ">
              <div className="flex space-x-4 justify-center items-center">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                {/* //! add active navlink */}
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive
                      ? ` shadow-nm hover:shadow-nm transition-all text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300`
                      : "text-gray-500  transition-all  px-3 py-2 hover:text-gray-800 rounded-md text-sm font-medium border border-zinc-300"
                  }
                  //   className="text-gray-500 hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300"
                >
                  Home
                </NavLink>
                <NavLink
                  to={"/products"}
                  className={({ isActive }) =>
                    isActive
                      ? ` shadow-nm hover:shadow-nm transition-all text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300`
                      : "text-gray-500  transition-all  px-3 py-2 hover:text-gray-800 rounded-md text-sm font-medium border border-zinc-300"
                  }
                >
                  Products
                </NavLink>
                {/* <NavLink
                  to={"/contact"}
                  className={({ isActive }) =>
                    isActive
                      ? ` shadow-nm hover:shadow-nm transition-all text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300`
                      : "text-gray-500  transition-all  px-3 py-2 hover:text-gray-800 rounded-md text-sm font-medium border border-zinc-300"
                  }
                >
                  Contact
                </NavLink> */}

                {(userRole === "Seller" || isSeller) && user?.email ? (
                  <NavLink
                    to={"/dashboard"}
                    className={({ isActive }) =>
                      isActive
                        ? ` shadow-nm hover:shadow-nm transition-all text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300`
                        : "text-gray-500  transition-all  px-3 py-2 hover:text-gray-800 rounded-md text-sm font-medium border border-zinc-300"
                    }
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  ""
                )}
                <NavLink
                  to={"/cart"}
                  className={({ isActive }) =>
                    isActive
                      ? ` shadow-nm-inset transition-all text-gray-800 px-2 py-1 rounded-md text-sm font-medium border border-zinc-300`
                      : "shadow-nm text-gray-500  transition-all  px-2 py-1 hover:text-gray-800 rounded-md  text-sm font-medium border border-zinc-300"
                  }
                >
                  <div className="flex space-x-2 justify-center items-center">
                    {/* <HiShoppingCart className="text-xl"></HiShoppingCart> */}
                    <img
                      src="https://cdn4.iconfinder.com/data/icons/smooth-3d-for-online-stores/512/shopping-basket.png"
                      alt=""
                      className="w-7"
                    />
                    <span className="text-sm">Cart</span>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu>
              <Menu.Button>
                <img
                  className="h-12 w-12 rounded-full border border-gray-300"
                  src="https://cdn2.iconfinder.com/data/icons/male-avatars/256/avatars_accounts___man_male_people_person_hat_cap_baseball_cap_necklace_shirtless.png"
                  alt=""
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95 "
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-48 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-secondary-color shadow-nm ring-1 ring-black ring-opacity-5 focus:outline-none p-2 z-50">
                  <div className="px-1 py-1">
                    {user && (
                      <Link to={"/"}>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "" : "text-gray-500"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm active:shadow-nm-inset
                          mt-1 border border-zinc-300 transition-all mb-1`}
                            >
                              Profile
                            </button>
                          )}
                        </Menu.Item>
                      </Link>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "" : "text-gray-500"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm active:shadow-nm-inset mb-1 border border-zinc-300 transition-all`}
                        >
                          Wishlist
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1 ">
                    {user ? (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => logOut()}
                              className={`${
                                active ? "" : "text-gray-500"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm active:shadow-nm-inset
                        mt-1 border border-zinc-300 transition-all`}
                            >
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </>
                    ) : (
                      <>
                        <>
                          <Link to={"/login"}>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? "" : "text-gray-500"
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm active:shadow-nm-inset mt-1 border border-zinc-300 transition-all`}
                                >
                                  Login
                                </button>
                              )}
                            </Menu.Item>
                          </Link>
                        </>
                      </>
                    )}

                    {/* <FaSignOutAlt
                      onClick={() => logOut()}
                      className="text-2xl bg-secondary-color shadow-nm active:shadow-nm-inset"
                    /> */}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
