import React, { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../../../../contexts/ContextProvider";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Dialog, Transition } from "@headlessui/react";
import { PhotoProvider, PhotoView } from "react-photo-view";

import Modal from "../../../../components/Modal/Modal";
import axios from "axios";
import { toast } from "react-hot-toast";

const MyProducts = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setselectedProduct] = useState({});
  const navigate = useNavigate();
  const { authInfo } = useContext(Context);
  const { user } = authInfo;

  const {
    data: products = [],
    refetch,
    isRefetching,
    isLoading,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_SERVER_URL}/seller_products?email=${
          user?.email
        }`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem(
              "shop-adidas-token"
            )}`,
          },
        }
      ).then((res) => res.json()),
  });
  const [sortedProducts, setsortedProducts] = useState(products);
  const [dateAscending, setdateAscending] = useState(true);
  const [priceAscending, setPriceAscending] = useState(true);

  useEffect(() => {
    refetch();
    console.log("%cRe Rendered!", "color: yellow; font-size: 24px;");
    setsortedProducts(products);
    sortByDate();
  }, [products, dateAscending]);
  const sortByDate = () => {
    console.log(`sortByDate`);
    dateAscending
      ? setsortedProducts(
          [...products].sort((a, b) => a.posted_on.localeCompare(b.posted_on))
        )
      : setsortedProducts(
          [...products].sort((a, b) => b.posted_on.localeCompare(a.posted_on))
        );
  };
  const sortByPrice = () => {
    console.log(`sortByPrice`);

    priceAscending
      ? setsortedProducts([...products].sort((a, b) => a.price - b.price))
      : setsortedProducts([...products].sort((a, b) => b.price - a.price));
  };
  const confirmModal = async () => {
    setIsOpen(false);
    try {
      // Delete the selected product
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/seller_products/delete?id=${
          selectedProduct?._id
        }`
      );
      console.log(response);
      if (response.data) {
        refetch();
        // selectedProduct?.imgId
        if (selectedProduct?.img || selectedProduct?.id) {
          axios
            .delete(
              `${import.meta.env.VITE_SERVER_URL}/files/${
                selectedProduct?.imgId
              }`
            )
            .then(() => {
              console.log(
                `File with ID: ${selectedProduct?.imgId} has been deleted`
              );
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  function openModal(product) {
    setselectedProduct(product);
    setIsOpen(true);
  }
  // console.log(products);

  return (
    <div className="min-h-screen py-10 px-5">
      <div className="flex flex-col max-w-7xl mx-auto mt-10">
        <div className="-my-2  sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            {/* <h1 className="py-3 text-4xl font-medium text-gray-500 uppercase tracking-wider">Products</h1> */}
            <div
              className={`shadow  border-b border-gray-200 sm:rounded-none ${
                products.length === 0 && "blur-sm"
              } `}
            >
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-300/60 ">
                  <tr
                    className={`text-center select-none
                  ${products.length === 0 && "select-none"}
                  `}
                  >
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      // onClick={() => {
                      //   setSortField("posted_on");
                      //   setsortingOrder(1);
                      // }}
                      onClick={() => {
                        // sortByDate();
                        setdateAscending(!dateAscending);
                      }}
                      title="Sort by descending"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center justify-evenly hover:text-blue-900   transition-all cursor-pointer"
                    >
                      <span>Date</span>
                      {!dateAscending ? (
                        <TbSortAscending className="text-xl text-blue-800 hover:scale-105 transition-all font-extrabold cursor-pointer"></TbSortAscending>
                      ) : (
                        <TbSortDescending className="text-xl text-blue-800 hover:scale-105 transition-all font-extrabold cursor-pointer"></TbSortDescending>
                      )}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 texlef text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider "
                    >
                      Brand
                    </th>
                    <th
                      scope="col"
                      onClick={() => {
                        sortByPrice();
                        setPriceAscending(!priceAscending);
                      }}
                      title="Sort by descending"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center justify-evenly hover:text-blue-900   transition-all cursor-pointer"
                    >
                      <span>Price</span>
                      {!priceAscending ? (
                        <TbSortAscending className="text-xl text-blue-800 hover:scale-105 transition-all font-extrabold cursor-pointer"></TbSortAscending>
                      ) : (
                        <TbSortDescending className="text-xl text-blue-800 hover:scale-105 transition-all font-extrabold cursor-pointer"></TbSortDescending>
                      )}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Variant
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-100  bg-secondary-color">
                  {sortedProducts?.map((product, idx) => (
                    <tr
                      key={product?._id}
                      className="text-center h-16 hover:bg-gray-300/50 transition-all"
                    >
                      <th className="px-6 py-3  text-sm font-medium text-gray-700  tracking-wider">
                        {idx + 1}
                      </th>
                      <td>
                        {product?.img && (
                          <PhotoProvider>
                            <PhotoView src={product?.img}>
                              <LazyLoadImage
                                effect="opacity"
                                src={product?.img}
                                alt=""
                                className="w-12 h-12 mx-auto"
                              />
                            </PhotoView>
                          </PhotoProvider>
                        )}
                      </td>
                      <td className="text-left px-6 py-3  text-sm font-medium text-gray-700  tracking-wider">
                        {product?.posted_on.split(" ")[0]}
                      </td>
                      <td className="text-left px-6 py-3  text-sm font-medium text-gray-700  tracking-wider">
                        {product?.name}
                      </td>
                      <td className="px-6 py-3  text-sm font-medium text-gray-700  tracking-wider">
                        {product?.category}
                      </td>
                      <td className="px-6 py-3  text-sm font-medium text-gray-700  tracking-wider">
                        {product?.brand ?? "No brand"}
                      </td>
                      <td className="px-6 py-3  text-sm font-medium text-gray-700  tracking-wider">
                        {product?.price}
                      </td>
                      <td className="px-6 py-3  text-sm font-medium text-gray-700  tracking-wider">
                        {product?.stock}
                      </td>
                      <td className=" ">
                        {product?.sizes.length === 0 ? (
                          <span className=" py-3 text-sm font-medium text-gray-700 tracking-wider text-justify">
                            No sizes avaiable
                          </span>
                        ) : (
                          product?.sizes.map((size, idx) => (
                            <span
                              key={size?.id}
                              className=" items-center border border-gray-400 p-1 w-6 inline-block rounded-md text-xs text-center text-gray-500 font-medium bg-gray-300/60 mx-1 hover:bg-gray-200/50 transition-all"
                            >
                              {size.name}
                            </span>
                          ))
                        )}
                      </td>
                      <td className="space-x-2">
                        <div className="flex flex-wrap gap-2 py-2 justify-center">
                          <FaEdit className="active: bg-secondary-color w-8 h-8 p-2 rounded-md shadow-nm cursor-pointer active:shadow-nm-inset hover:brightness-95 transition-all"></FaEdit>
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
                              className="active: bg-secondary-color w-8 h-8 p-2 rounded-md shadow-nm  cursor-pointer active:shadow-nm-inset hover:brightness-95 transition-all"
                            ></FaTrashAlt>
                          </Modal>

                          <FaEye
                            onClick={() => {
                              navigate(`/products/product/${product._id}`, {
                                state: product,
                              });
                            }}
                            className="active: bg-secondary-color w-8 h-8 p-2 rounded-md shadow-nm  cursor-pointer active:shadow-nm-inset hover:brightness-95 transition-all"
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
        <button
          className="my-10 bg-blue-300 w-20 mx-auto h-14 rounded-md"
          onClick={() => {
            toast.loading("Login successfull");
            toast.success("Login successfull");
            toast.error("Login successfull");
          }}
        >
          Open Toast
        </button>
        {products.length === 0 && !isLoading && (
          <span className="text-center px-6 py-3 font-medium text-gray-500 uppercase tracking-wide">
            Please add products to view details here
          </span>
        )}
        {isLoading && <div className="continuous-7 my-10 mx-auto"></div>}
      </div>
    </div>
  );
};

export default MyProducts;
