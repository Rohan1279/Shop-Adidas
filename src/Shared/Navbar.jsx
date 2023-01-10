import { Menu, Popover, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import Button from "../components/Button/Button";
import {
  HiBars3BottomLeft,
  HiOutlineXMark,
  HiShoppingCart,
} from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const solutions = [
    {
      name: "Insights",
      description: "Measure actions your users take",
      href: "##",
      icon: IconOne,
    },
    {
      name: "Automations",
      description: "Create your own targeted content",
      href: "##",
      icon: IconTwo,
    },
    {
      name: "Reports",
      description: "Keep track of your growth",
      href: "##",
      icon: IconThree,
    },
  ];
  function IconOne() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
          stroke="#FB923C"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
      </svg>
    );
  }

  function IconTwo() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
          stroke="#FB923C"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
          stroke="#FDBA74"
          strokeWidth="2"
        />
      </svg>
    );
  }

  function IconThree() {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
        <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
        <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
        <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
        <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
        <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
      </svg>
    );
  }
  const [active, setActive] = useState(false);
  const handleActiveMenu = () => {
    setActive(!active);
  };
  return (
    <nav className="bg-secondary-color fixed top-0 w-full z-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8  relative z-30">
        <div className="relative h-16  flex items-center justify-center ">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}

            {/* {!active && (
              <HiBars3BottomLeft
                onClick={() => setActive((active) => !active)}
                className="text-xl"
              ></HiBars3BottomLeft>
            )}
            {active && (
              <HiOutlineXMark
                onClick={() => setActive((active) => !active)}
                className="text-xl"
              ></HiOutlineXMark>
              
            )} */}
            {/* {active ? (
              <HiOutlineXMark
                onClick={() => setActive((active) => !active)}
                className="text-xl"
              ></HiOutlineXMark>
            ) : (
              <HiBars3BottomLeft
                onClick={() => setActive((active) => !active)}
                className="text-xl"
              ></HiBars3BottomLeft>
            )} */}
            {/* <!-- Mobile menu, show/hide based on menu state. --> */}

            <div className="fixed w-full max-w-sm px-4">
              <Popover className="relative ">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md  py-2 text-base font-medium   `}
                    >
                      {active ? (
                        <HiOutlineXMark
                          onClick={() => setActive((active) => !active)}
                          className="text-xl hover:text-opacity-100"
                        ></HiOutlineXMark>
                      ) : (
                        <HiBars3BottomLeft
                          onClick={() => setActive((active) => !active)}
                          className="text-xl hover:text-opacity-100"
                        ></HiBars3BottomLeft>
                      )}
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute left-1/2 z-10  w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ">
                          <div className="relative grid gap-8 bg-white lg:grid-cols-2 ">
                            <div className="sm:hidden bg-secondary-color h-48 z-10">
                              <div className="space-y-1 px-2 pt-2 pb-3 ">
                                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                                <NavLink
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
                                  to={"/products"}
                                  className={({ isActive }) =>
                                    isActive
                                      ? `bg-secondary-color text-gray-500 shadow-nm hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block`
                                      : "bg-secondary-color text-gray-500  transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block"
                                  }
                                >
                                  Products
                                </NavLink>
                                <NavLink
                                  to={"/contact"}
                                  className={({ isActive }) =>
                                    isActive
                                      ? `bg-secondary-color text-gray-500 shadow-nm hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block`
                                      : "bg-secondary-color text-gray-500  transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block"
                                  }
                                >
                                  Contact
                                </NavLink>
                                <NavLink
                                  to={"/dashboard"}
                                  className={({ isActive }) =>
                                    isActive
                                      ? `bg-secondary-color text-gray-500 shadow-nm hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block`
                                      : "bg-secondary-color text-gray-500  transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block"
                                  }
                                >
                                  Dashboard
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
                <NavLink
                  to={"/contact"}
                  className={({ isActive }) =>
                    isActive
                      ? ` shadow-nm hover:shadow-nm transition-all text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300`
                      : "text-gray-500  transition-all  px-3 py-2 hover:text-gray-800 rounded-md text-sm font-medium border border-zinc-300"
                  }
                >
                  Contact
                </NavLink>
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
                {/* //! add cart icon here */}
                <Button classes={"flex space-x-2 rounded-md"}>
                  <HiShoppingCart className="text-xl"></HiShoppingCart>
                  <span className="text-sm">Cart</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu>
              <Menu.Button>
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                <Menu.Items className="absolute right-0 mt-56 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-secondary-color shadow-nm ring-1 ring-black ring-opacity-5 focus:outline-none p-2 z-50">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "shadow-nm" : "text-gray-500"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm active:shadow-nm-inset mb-2 border border-zinc-300 transition-all`}
                        >
                          Profile
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "shadow-nm" : "text-gray-500"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm active:shadow-nm-inset mt-1 border border-zinc-300 transition-all`}
                        >
                          Login
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "shadow-nm" : "text-gray-500"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm active:shadow-nm-inset
                          mt-1 border border-zinc-300 transition-all`}
                        >
                          Register
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* <!-- Profile dropdown --> */}
            {/* <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div> */}

            {/* <!--
                  Dropdown menu, show/hide based on menu state.
      
                  Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                  Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                --> */}
            {/* <div
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-1"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                >
                  Sign out
                </a>
              </div> 
        
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
