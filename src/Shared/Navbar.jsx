import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import Button from "../components/Button/Button";
import { HiBars3BottomLeft, HiOutlineXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [active, setActive] = useState(false);
  const handleActiveMenu = () => {
    setActive(!active);
  };
  return (
    <nav className="bg-secondary-color fixed top-0 w-full">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative  h-16  flex items-center justify-center">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            {!active && (
              <Button handler={handleActiveMenu}>
                <HiBars3BottomLeft className="text-xl"></HiBars3BottomLeft>
              </Button>
            )}
            {active && (
              <Button handler={handleActiveMenu}>
                <HiOutlineXMark className="text-xl"></HiOutlineXMark>
              </Button>
            )}
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
              <div className="flex space-x-4">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                {/* //! add active navlink */}
                <Link
                  to={"/"}
                  className="text-gray-500 hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300"
                >
                  Home
                </Link>
                <Link
                  to={"/products"}
                  className="text-gray-500 hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300"
                >
                  Products
                </Link>
                <Link
                  to={"/contact"}
                  className="text-gray-500 hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300"
                >
                  Contact
                </Link>
                <Link
                  to={"/dashboard"}
                  className="text-gray-500 hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* //! add cart icon here */}

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
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-56 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-secondary-color shadow-nm ring-1 ring-black ring-opacity-5 focus:outline-none p-2 ">
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

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}

      <Transition
        show={active}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {active && (
          <div className="sm:hidden ">
            <div className="space-y-1 px-2 pt-2 pb-3 ">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <a
                href="#"
                className="text-gray-500  block hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-500 block hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </a>
              <a
                href="#"
                className="text-gray-500 block hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-gray-500 block hover:shadow-nm transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </a>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};

export default Navbar;
