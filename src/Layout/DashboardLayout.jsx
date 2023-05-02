import React, { Fragment, Suspense, useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Context } from "../contexts/ContextProvider";
import Navbar from "../Shared/Navbar";
import {
  FaBars,
  FaBuyNLarge,
  FaCartPlus,
  FaChevronLeft,
  FaClosedCaptioning,
  FaHome,
  FaListAlt,
  FaPlus,
  FaShopify,
  FaXbox,
} from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Loader from "../components/Loader/Loader";
import { Popover, Tab, Transition } from "@headlessui/react";

const DashboardLayout = () => {
  const { authInfo } = useContext(Context);
  const { user, loading, isSeller, isSellerLoading, userRole } = authInfo;
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const routes = [
    { name: "Dashboard", route: "/dashboard", icon: <FaHome></FaHome> },
    {
      name: "Add Product",
      route: "addproduct",
      icon: <FaPlus></FaPlus>,
    },
    { name: "My Products", route: "myproducts", icon: <FaListAlt></FaListAlt> },
    { name: "My Buyers", route: "mybuyers", icon: <FaShopify></FaShopify> },
  ];
  return (
    <div className="">
      <Navbar />
      <div className="mt-16 flex max-h-full">
        {/* //!DRAWER */}
        <Popover className="relative z-50">
          <Popover.Button className={"absolute left-5 "}>
            {" "}
            <FaBars
              className=""
              // onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            ></FaBars>
          </Popover.Button>

          <Tab.Group>
            <Popover.Button className={""}>
              {" "}
              <FaChevronLeft className="text-sm "></FaChevronLeft>
            </Popover.Button>
            <Tab.List className={""}>
              {routes.map((route, idx) => (
                <Tab as={Fragment} key={idx}>
                  {({ selected }) => (
                    <Link to={route.route}>
                      <button
                        className={
                          selected
                            ? "bg-primary-color text-gray-800 shadow-nm-inset hover: transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block w-36 my-5"
                            : "bg-primary-color text-gray-500 transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block w-36 my-5"
                        }
                      >
                        <div className="flex justify-center items-center gap-x-2  min-w-max">
                          {route.icon}
                          {isDrawerOpen && <span>{route.name}</span>}
                        </div>
                      </button>
                    </Link>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels></Tab.Panels>
          </Tab.Group>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-x-8"
            enterTo="opacity-100 translate-x-0"
            leave="transition ease-in-out duration-150"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-8"
          >
            <Popover.Panel className="h-screen z-50 bg-secondary-color ">
              {(userRole === "Seller" || isSeller) && (
                <div
                  className={`w-fit text-left text-2xl bg-primary-color pt-20 px-5 space-y-5 absolute z-50 h-full  ${
                    !isDrawerOpen && "w-32 hidden"
                  } transition-all ease-linear duration-300`}
                >
                  {/* <Tab.Group>
                    <Popover.Button className={""}>
                      {" "}
                      <FaChevronLeft
                        className="text-sm "
                       
                      ></FaChevronLeft>
                    </Popover.Button>
                    <Tab.List className={""}>
                      {routes.map((route, idx) => (
                        <Tab as={Fragment} key={idx}>
                          {({ selected }) => (
                            <Link to={route.route}>
                              <button
                                className={
                                  selected
                                    ? "bg-primary-color text-gray-800 shadow-nm-inset hover: transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block w-36 my-5"
                                    : "bg-primary-color text-gray-500 transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block w-36 my-5"
                                }
                              >
                                <div className="flex justify-center items-center gap-x-2  min-w-max">
                                  {route.icon}
                                  {isDrawerOpen && <span>{route.name}</span>}
                                </div>
                              </button>
                            </Link>
                          )}
                        </Tab>
                      ))}
                    
                    </Tab.List>
                    <Tab.Panels></Tab.Panels>
                  </Tab.Group> */}
                  {/* <NavLink
                    to={"/dashboard"}
                    className={({ isActive }) =>
                      isActive
                        ? `bg-primary-color text-gray-800 shadow-nm-inset hover: transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block `
                        : "bg-primary-color text-gray-500 transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block "
                    }
                  >
                    <div className="flex justify-center items-center gap-x-2 ">
                      <FaHome></FaHome>
                      {isDrawerOpen && <span>Dashboard</span>}
                    </div>
                  </NavLink> */}

                  {/* <NavLink
                    to={"addproduct"}
                    className={({ isActive }) =>
                      isActive
                        ? `bg-primary-color text-gray-800 shadow-nm-inset hover: transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block `
                        : "bg-primary-color text-gray-500  transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block"
                    }
                  >
                    <div className="flex justify-center items-center gap-x-2 min-w-max">
                      <FaCartPlus></FaCartPlus>
                      {isDrawerOpen && <span>Add Product</span>}
                    </div>
                  </NavLink> */}
                  {/* <NavLink
                    to={"myproducts"}
                    className={({ isActive }) =>
                      isActive
                        ? `bg-primary-color text-gray-800 shadow-nm-inset hover: transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block `
                        : "bg-primary-color text-gray-500  transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block"
                    }
                  >
                    <div className="flex justify-center items-center gap-x-2">
                      <FaListAlt></FaListAlt>
                      {isDrawerOpen && <span>My Products</span>}
                    </div>
                  </NavLink>
                  <NavLink
                    to={"mybuyers"}
                    className={({ isActive }) =>
                      isActive
                        ? `bg-primary-color text-gray-800 shadow-nm-inset hover: transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block `
                        : "bg-primary-color text-gray-500  transition-all hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium border border-zinc-300 block"
                    }
                  >
                    <div className="flex justify-center items-center gap-x-2">
                      <FaShopify></FaShopify>
                      {isDrawerOpen && <span>My Buyers</span>}
                    </div>
                  </NavLink> */}
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </Popover>

        <Suspense
          fallback={
            <div className="w-full h-screen ">
              <Loader></Loader>
            </div>
          }
        >
          <div className={`transition-all w-full h-fit`}>
            <Outlet />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardLayout;
