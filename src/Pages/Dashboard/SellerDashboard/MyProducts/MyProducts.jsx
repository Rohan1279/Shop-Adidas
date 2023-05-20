import React, { Fragment, memo, useContext, useEffect, useState } from "react";
import { Context } from "../../../../contexts/ContextProvider";
import { useQuery } from "@tanstack/react-query";
import {
  FaBackspace,
  FaBackward,
  FaEdit,
  FaEye,
  FaForward,
  FaRedo,
  FaTrashAlt,
} from "react-icons/fa";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Dialog, Transition } from "@headlessui/react";
import { PhotoProvider, PhotoView } from "react-photo-view";

import Modal from "../../../../components/Modal/Modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import DropDownMenu from "../../../../components/DropDownMenu/DropDownMenu";

const MyProducts = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setselectedProduct] = useState({});
  const [deleteError, setDeleteError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { authInfo } = useContext(Context);
  const { user, logOut } = authInfo;

  const [dateOrder, setdateOrder] = useState(1);
  const [priceOrder, setPriceOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(
    [
      { id: "0", name: "3 rows" },
      { id: "1", name: "5 rows" },
      { id: "2", name: "10 rows" },
    ][2]
  );
  const sortOrder = {
    // priceOrder: priceOrder,
    // dateOrder: dateOrder,
  };
  if (priceOrder === null) {
    sortOrder.dateOrder = dateOrder;
  } else if (dateOrder === null) {
    sortOrder.priceOrder = priceOrder;
  }

  const {
    data: products = [],
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_SERVER_URL}/seller_products?email=${
          user?.email
        }&currentPage=${currentPage}&limit=${parseInt(
          limit?.name
        )}&dateOrder=${dateOrder}&priceOrder=${priceOrder}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem(
              "shop-adidas-token"
            )}`,
          },
        }
      ).then((res) => res.json()),
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
  });
  let pages = Math.ceil(
    products[products.length - 1]?.count / parseInt(limit?.name)
  );
  useEffect(() => {
    refetch();
  }, [products, priceOrder, dateOrder, currentPage, limit, location]);
  // useEffect(() => {
  //   setCurrentPage(0);
  // }, [limit, priceOrder, dateOrder]);

  const confirmModal = async () => {
    setIsOpen(false);
    try {
      // Delete the selected product
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/seller_products/delete?id=${
          selectedProduct?._id
        }`,
        {
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem(
              "shop-adidas-token"
            )}`,
          },
        }
      );
      console.log(response);
      if (response.data) {
        setDeleteError(false);
        toast.success(`${selectedProduct?.name} deleted successfully!`);
        refetch();
        // selectedProduct?.imgIdcp
        if (selectedProduct?.img || selectedProduct?.id) {
          axios
            .delete(
              `${import.meta.env.VITE_SERVER_URL}/files/${
                selectedProduct?.imgId
              }`
            )
            .then(() => {
              console.log(
                `Image with ID: ${selectedProduct?.imgId} has been deleted`
              );
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }
    } catch (error) {
      console.error(error);
      setDeleteError(true);
      toast.error(error?.message);
    }
  };
  function openModal(product) {
    setselectedProduct(product);
    setIsOpen(true);
  }

  return (
    <div className="min-h-screen py-10 px-5  transition-all duration-300 ease-in-out">
      <div className=" flex items-center justify-center">
        <button
          onClick={() => refetch()}
          className="flex items-center justify-center gap-x-3 rounded-md border border-zinc-300 bg-secondary-color px-3 py-2 transition-all active:shadow-nm-inset"
        >
          Refresh <FaRedo></FaRedo>{" "}
        </button>
      </div>
      <div
        className={`mx-auto mt-10 flex max-w-7xl flex-col ${
          location.pathname.includes("/dashboard/myproducts/edit/") && "hidden"
        }`}
      >
        <div className="-my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {/* <h1 className="py-3 text-4xl font-medium text-gray-500 uppercase tracking-wider">Products</h1> */}
            <div
              className={`border-b  border-gray-200 shadow sm:rounded-none  ${
                products.count === 0 && "blur-sm"
              } `}
            >
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-300/60 ">
                  <tr
                    className={`select-none text-center
                  ${products.count === 0 && "select-none"}
                  `}
                  >
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      onClick={() => {
                        if (dateOrder === -1) {
                          setPriceOrder(null);
                          setdateOrder(1);
                          setCurrentPage(0);
                        } else {
                          setPriceOrder(null);
                          setdateOrder(-1);
                          setCurrentPage(0);
                        }
                      }}
                      // title="Sort by descending"
                      className="flex cursor-pointer items-center justify-evenly px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 transition-all hover:text-blue-900"
                    >
                      <span>Date</span>
                      {isFetching && !priceOrder ? (
                        <div
                          className="inline-block h-3 w-3 animate-spin rounded-full border border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        ></div>
                      ) : dateOrder === -1 ? (
                        <TbSortAscending className="cursor-pointer text-xl font-extrabold text-blue-800 transition-all hover:scale-105"></TbSortAscending>
                      ) : (
                        <TbSortDescending className="cursor-pointer text-xl font-extrabold text-blue-800 transition-all hover:scale-105"></TbSortDescending>
                      )}
                    </th>
                    <th
                      scope="col"
                      className=" px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium uppercase tracking-wider text-gray-500 "
                    >
                      Brand
                    </th>
                    <th
                      scope="col"
                      onClick={() => {
                        if (priceOrder === -1) {
                          setdateOrder(null);
                          setPriceOrder(1);
                          setCurrentPage(0);
                        } else {
                          setdateOrder(null);
                          setPriceOrder(-1);
                          setCurrentPage(0);
                        }
                      }}
                      // title="Sort by descending"
                      className="flex cursor-pointer  items-center justify-evenly px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500   transition-all hover:text-blue-900"
                    >
                      <span>Price</span>

                      {isFetching && !dateOrder ? (
                        <div
                          className="inline-block h-3 w-3 animate-spin rounded-full border border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        ></div>
                      ) : priceOrder === -1 ? (
                        <TbSortAscending className="cursor-pointer text-xl font-extrabold text-blue-800 transition-all hover:scale-105"></TbSortAscending>
                      ) : (
                        <TbSortDescending className="cursor-pointer text-xl font-extrabold text-blue-800 transition-all hover:scale-105"></TbSortDescending>
                      )}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Variant
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-100  bg-secondary-color transition-all">
                  {[...products]?.slice(0, -1)?.map((product, idx) => (
                    <tr
                      key={product?._id}
                      className="h-16 text-center transition-all hover:bg-gray-300/50"
                    >
                      <th className="px-6 py-3  text-sm font-medium tracking-wider  text-gray-700">
                        {idx + 1}
                      </th>
                      <td>
                        {product?.img && (
                          <PhotoProvider>
                            <PhotoView src={product?.img}>
                              {/* <LazyLoadImage
                                effect="opacity"
                                src={product?.img}
                                alt=""
                                className="w-12 h-12 mx-auto object-cover"
                              /> */}
                              <img
                                src={product?.img}
                                className="mx-auto h-12 w-12 object-cover"
                                loading="lazy"
                                alt="product image"
                              />
                            </PhotoView>
                          </PhotoProvider>
                        )}
                      </td>
                      <td className="px-6 py-3 text-left  text-sm font-medium tracking-wider  text-gray-700">
                        {product?.posted_on?.split(" ")[0]}
                      </td>
                      <td className="px-6 py-3 text-left  text-sm font-medium tracking-wider  text-gray-700">
                        {product?.name}
                      </td>
                      <td className="px-6 py-3  text-sm font-medium tracking-wider  text-gray-700">
                        {product?.category}
                      </td>
                      <td className="px-6 py-3  text-sm font-medium tracking-wider  text-gray-700">
                        {product?.brand ?? "No brand"}
                      </td>
                      <td className="px-6 py-3  text-sm font-medium tracking-wider  text-gray-700">
                        {product?.price}
                      </td>
                      <td className="px-6 py-3  text-sm font-medium tracking-wider  text-gray-700">
                        {product?.stock}
                      </td>
                      <td className=" ">
                        {product?.sizes?.length === 0 ? (
                          <span className=" py-3 text-justify text-sm font-medium tracking-wider text-gray-700">
                            No sizes avaiable
                          </span>
                        ) : (
                          product?.sizes?.map((size, idx) => (
                            <span
                              key={size?.id}
                              className=" mx-1 inline-block w-6 items-center rounded-md border border-gray-400 bg-gray-300/60 p-1 text-center text-xs font-medium text-gray-500 transition-all hover:bg-gray-200/50"
                            >
                              {size.name}
                            </span>
                          ))
                        )}
                      </td>
                      <td className="space-x-2">
                        <div className="flex flex-wrap justify-center gap-2 py-2">
                          <FaEdit
                            onClick={() => {
                              navigate(`edit/${product._id}`, {
                                state: product,
                              });
                            }}
                            className="active: h-8 w-8 cursor-pointer rounded-md bg-secondary-color p-2 shadow-nm transition-all hover:brightness-95 active:shadow-nm-inset"
                          ></FaEdit>
                          <Modal
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            closeModal={confirmModal}
                            openModal={openModal}
                            data={selectedProduct}
                            confirmMessage={
                              "Are you sure to delete the following"
                            }
                            confirmButtonText={"Confirm"}
                          >
                            <FaTrashAlt
                              onClick={() => {
                                openModal(product);
                                // viewproduct(product?._id);
                              }}
                              className="active: h-8 w-8 cursor-pointer rounded-md bg-secondary-color p-2  shadow-nm transition-all hover:brightness-95 active:shadow-nm-inset"
                            ></FaTrashAlt>
                          </Modal>

                          <FaEye
                            onClick={() => {
                              navigate(`/products/product/${product._id}`, {
                                state: product,
                              });
                            }}
                            className="active: h-8 w-8 cursor-pointer rounded-md bg-secondary-color p-2  shadow-nm transition-all hover:brightness-95 active:shadow-nm-inset"
                          >
                            {/* <Link to={`/products/product/${product._id}`}></Link> */}
                          </FaEye>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {products.count === 0 && !isLoading && (
          <span className="px-6 py-3 text-center font-medium uppercase tracking-wide text-gray-500">
            Please add products to view details here
          </span>
        )}
        {isLoading && <div className="continuous-7 my-10 mx-auto"></div>}
        {deleteError && (
          <p className="my-4 px-6 py-3 text-center  text-sm font-medium tracking-wider  text-gray-500">
            Please{" "}
            <span
              onClick={() => {
                logOut();
              }}
              className="inline-block cursor-pointer text-blue-400  hover:underline "
            >
              login
            </span>{" "}
            again if error persists.
          </p>
        )}
        {/* //! PAGINATION */}
        <div className="my-7 mx-auto flex w-full items-center justify-center gap-x-4 pb-32">
          <div className="flex items-center justify-center">
            <IoCaretBack
              onClick={() => {
                if (currentPage > 0) {
                  setCurrentPage(currentPage - 1);
                } else return;
              }}
              className={`mx-2  h-7 w-7 rounded-md border border-zinc-300 bg-secondary-color text-2xl text-sky-300 transition-all active:shadow-nm-inset ${
                !(currentPage > 0) &&
                "border-zinc-200 text-sky-200/50 active:shadow-none"
              }`}
            />
            {[...Array(pages ? pages : 0).keys()].map((number) => (
              <button
                key={number}
                onClick={() => {
                  setCurrentPage(number);
                }}
                className={`mx-2 select-none rounded-md border border-zinc-300 bg-secondary-color px-4 py-2 transition-all active:shadow-nm-inset ${
                  currentPage === number && "shadow-nm-inset"
                }`}
              >
                {number + 1}
              </button>
            ))}
            <IoCaretForward
              onClick={() => {
                if (currentPage < pages - 1) {
                  setCurrentPage(currentPage + 1);
                } else return;
              }}
              className={`mx-2 h-7 w-7 rounded-md border border-zinc-300 bg-secondary-color text-2xl text-sky-300 transition-all active:shadow-nm-inset ${
                !(currentPage < pages - 1) &&
                "border-zinc-200 text-sky-200/50 active:shadow-none"
              }`}
            />
          </div>

          <div className="flex w-44 items-center rounded-md border border-gray-300 bg-gray-300/60 pl-2 ">
            <span className="mr-3  text-center text-xs font-medium uppercase tracking-wider text-gray-500">
              Limit
            </span>
            <div className="w-full border-l border-l-gray-300">
              <DropDownMenu
                array={[
                  { id: "0", name: "3 rows" },
                  { id: "1", name: "5 rows" },
                  { id: "2", name: "10 rows" },
                ]}
                multiple={false}
                selectedData={limit}
                setSelectedData={setLimit}
              />
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default memo(MyProducts);
