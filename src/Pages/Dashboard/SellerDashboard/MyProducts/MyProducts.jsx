import React, {
  Fragment,
  memo,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Context } from "../../../../contexts/ContextProvider";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaEye, FaRedo, FaTrashAlt } from "react-icons/fa";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Modal from "../../../../components/Modal/Modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import DropDownMenu from "../../../../components/DropDownMenu/DropDownMenu";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Switch } from "@headlessui/react";

const MyProducts = () => {
  const [isImageEnabled, setisImageEnabled] = useState(false);
  const [isRatingEnabled, setIsRatingEnabled] = useState(false);
  const [isReviewCountEnabled, setIsReviewCountEnabled] = useState(false);

  let [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setselectedProduct] = useState({});
  const [deleteError, setDeleteError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { authInfo } = useContext(Context);
  const { user, logOut } = authInfo;
  const [dateOrder, setdateOrder] = useState(1);
  const [priceOrder, setPriceOrder] = useState(null);
  const [ratingsOrder, setRatingsOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(
    [
      { id: "0", name: "3 rows" },
      { id: "1", name: "5 rows" },
      { id: "2", name: "10 rows" },
    ][2]
  );

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
        )}&dateOrder=${dateOrder}&priceOrder=${priceOrder}&ratingsOrder=${ratingsOrder}&search=${search}`,
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
  }, [
    products,
    priceOrder,
    dateOrder,
    ratingsOrder,
    currentPage,
    limit,
    location,
    search,
  ]);
  // useEffect(() => {
  //   setCurrentPage(0);
  // }, [limit, priceOrder, dateOrder]);
  console.log("isFetching", isFetching);
  // console.log(products);
  console.log("dateOrder", parseInt(dateOrder));
  console.log("priceOrder", parseInt(priceOrder));
  console.log("ratingsOrder", parseInt(ratingsOrder));

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
    <div className="min-h-screen pt-20 px-5  transition-all duration-300 ease-in-out">
      <div
        className={`mx-auto mt-5 flex max-w-7xl flex-col ${
          location.pathname.includes("/dashboard/myproducts/edit/") && "hidden"
        }`}
      >
        <div className="-my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {/* //! ACTION BAR */}
            <div className="mb-5 flex items-center justify-between">
              <button
                onClick={() => {
                  refetch();
                  setSearch("");
                }}
                className="flex items-center justify-between gap-x-3 rounded-md border border-zinc-300 bg-secondary-color  px-6 py-3
          text-sm font-medium uppercase tracking-wider text-gray-500 transition-all active:shadow-nm-inset
          "
              >
                Refresh <FaRedo></FaRedo>{" "}
              </button>
              <div
                className="bgred flex items-center justify-between gap-x-3 rounded-md border border-zinc-300 bg-secondary-color  px-6 py-0
          text-sm font-medium uppercase tracking-wider text-gray-500"
              >
                <div className="flex items-center justify-center ">
                  <Switch
                    checked={isImageEnabled}
                    onChange={setisImageEnabled}
                    className={`relative inline-flex h-4 w-9 items-center rounded-full shadow-nm-inset transition-all duration-200`}
                  >
                    <span
                      className={`${
                        isImageEnabled
                          ? "translate-x-5 shadow-nm"
                          : "translate-x-0 shadow-nm"
                      } inline-block h-4 w-4 transform rounded-full bg-slate-200  transition-all duration-200 `}
                    />
                  </Switch>
                  <p
                    className="py-3 px-3
          text-sm font-medium uppercase tracking-wider text-gray-500 "
                  >
                    Images
                  </p>
                </div>
                <div className="flex items-center justify-center ">
                  <Switch
                    checked={isRatingEnabled}
                    onChange={setIsRatingEnabled}
                    className={` relative inline-flex h-4 w-9 items-center rounded-full shadow-nm-inset transition-all duration-200`}
                  >
                    <span
                      className={`${
                        isRatingEnabled
                          ? "translate-x-5 shadow-nm"
                          : "translate-x-0 shadow-nm"
                      } inline-block h-4 w-4 transform rounded-full bg-slate-200  transition-all duration-200 `}
                    />
                  </Switch>
                  <p
                    className="py-3 px-3
          text-sm font-medium uppercase tracking-wider text-gray-500 "
                  >
                    Ratings
                  </p>
                </div>
                <div className="flex items-center justify-center ">
                  <Switch
                    checked={isReviewCountEnabled}
                    onChange={setIsReviewCountEnabled}
                    className={` relative inline-flex h-4 w-9 items-center rounded-full shadow-nm-inset transition-all duration-200`}
                  >
                    <span
                      className={`${
                        isReviewCountEnabled
                          ? "translate-x-5 shadow-nm"
                          : "translate-x-0 shadow-nm"
                      } inline-block h-4 w-4 transform rounded-full bg-slate-200  transition-all duration-200 `}
                    />
                  </Switch>
                  <p
                    className="py-3 px-3
          text-sm font-medium uppercase tracking-wider text-gray-500 "
                  >
                    Reviews
                  </p>
                </div>
              </div>
              {/* //! SEARCH */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center rounded-md border border-gray-300 border-gray-300/50 bg-gray-300/60 pl-2"
              >
                <span
                  className={`&& "  "
                    } mr-3 min-w-max text-center text-xs font-medium uppercase tracking-wider
                  text-gray-500`}
                >
                  Search
                </span>

                <input
                  onChange={(e) => {
                    setCurrentPage(0);
                    setSearch(e.target.value);
                  }}
                  type={"text"}
                  placeholder={"search a product"}
                  className="w-full rounded-r-md border-l border-l-gray-300 bg-secondary-color p-3 text-center  text-sm focus:shadow-nm-inset focus:outline-none disabled:placeholder:text-gray-300 "
                  disabled={products?.length === 0}
                />
              </form>
            </div>
            {/* // ! PRODUCTS TABLE */}
            <div
              className={`border-b  border-gray-200 shadow sm:rounded-none  ${
                products[products.length - 1]?.count === 0 &&
                !search &&
                "blur-sm"
              } `}
            >
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-300/60 ">
                  <tr
                    className={`select-none text-center
                  ${
                    products[products.length - 1]?.count === 0 &&
                    !search &&
                    "select-none"
                  }
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
                      className={`px-6 py-3  text-xs font-medium uppercase tracking-wider text-gray-500 ${
                        !isImageEnabled ? "hidden" : "visible"
                      } transition-all`}
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      onClick={() => {
                        if (dateOrder === -1) {
                          setPriceOrder(null);
                          setRatingsOrder(null);
                          setdateOrder(1);
                          setCurrentPage(0);
                        } else {
                          setPriceOrder(null);
                          setRatingsOrder(null);
                          setdateOrder(-1);
                          setCurrentPage(0);
                        }
                      }}
                      // title="Sort by descending"
                      className="flex cursor-pointer items-center justify-evenly px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 transition-all hover:text-blue-900"
                    >
                      <span>Date</span>
                      {isFetching && dateOrder ? (
                        <div
                          className="ml-1 inline-block h-3 w-3 animate-spin rounded-full border border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
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
                          setRatingsOrder(null);
                          setPriceOrder(1);
                          setCurrentPage(0);
                        } else {
                          setdateOrder(null);
                          setRatingsOrder(null);
                          setPriceOrder(-1);
                          setCurrentPage(0);
                        }
                      }}
                      // title="Sort by descending"
                      className="flex cursor-pointer  items-center justify-evenly px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500   transition-all hover:text-blue-900"
                    >
                      <span>Price</span>
                      {isFetching && priceOrder ? (
                        <div
                          className="ml-1 inline-block h-3 w-3 animate-spin rounded-full border border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
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
                      onClick={() => {
                        if (ratingsOrder === -1) {
                          setPriceOrder(null);
                          setdateOrder(null);
                          setRatingsOrder(1);
                          setCurrentPage(0);
                        } else {
                          setPriceOrder(null);
                          setdateOrder(null);
                          setRatingsOrder(-1);
                          setCurrentPage(0);
                        }
                      }}
                      // title="Sort by descending"
                      className={`flex cursor-pointer items-center justify-evenly px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 transition-all hover:text-blue-900 ${
                        !isRatingEnabled ? "hidden" : "visible"
                      } transition-all`}
                    >
                      <span>Ratings</span>
                      {isFetching && ratingsOrder ? (
                        <div
                          className="ml-1 inline-block h-3 w-3 animate-spin rounded-full border border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        ></div>
                      ) : ratingsOrder === -1 ? (
                        <TbSortAscending className="cursor-pointer text-xl font-extrabold text-blue-800 transition-all hover:scale-105"></TbSortAscending>
                      ) : (
                        <TbSortDescending className="cursor-pointer text-xl font-extrabold text-blue-800 transition-all hover:scale-105"></TbSortDescending>
                      )}
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-3  text-xs font-medium uppercase tracking-wider text-gray-500  ${
                        !isReviewCountEnabled ? "hidden" : "visible"
                      } transition-all `}
                    >
                      Reviews
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
                      <td className="px-6 py-3  text-sm font-medium tracking-wider  text-gray-700">
                        {idx + 1}
                      </td>
                      <td
                        className={` ${
                          !isImageEnabled ? "hidden" : "visible"
                        } transition-all`}
                      >
                        {product?.img && (
                          <PhotoProvider>
                            <PhotoView src={product?.img}>
                              <img
                                src={product?.img}
                                className={`mx-auto h-12 w-12 object-cover`}
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
                      <td
                        className={`px-6 py-3  text-sm font-medium tracking-wider  text-gray-700
                        ${
                          !isRatingEnabled ? "hidden" : "visible"
                        } transition-all
                        
                        `}
                      >
                        {product?.ratings}
                      </td>
                      <td
                        className={`px-6 py-3  text-sm font-medium tracking-wider  text-gray-700
                        ${
                          !isReviewCountEnabled ? "hidden" : "visible"
                        } transition-all
                        
                        `}
                      >
                        {product?.reviewsCount}
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

                          <FaTrashAlt
                            onClick={() => {
                              openModal(product);
                              // viewproduct(product?._id);
                            }}
                            className="active: h-8 w-8 cursor-pointer rounded-md bg-secondary-color p-2  shadow-nm transition-all hover:brightness-95 active:shadow-nm-inset"
                          ></FaTrashAlt>

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
              {search ? (
                <>
                  <hr className="mx-auto w-11/12 border border-zinc-300" />

                  <p className="px-6 py-3  text-xs font-medium uppercase tracking-wider text-gray-500 ">
                    Showing{" "}
                    {parseInt(limit?.name) <
                    products[products.length - 1]?.count
                      ? parseInt(limit?.name)
                      : products[products.length - 1]?.count}{" "}
                    of {products[products.length - 1]?.count} results
                  </p>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {products[products.length - 1]?.count === 0 && !search && (
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
          <div className="flex items-center justify-center space-y-3">
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

          <div className="flex w-44 items-center rounded-md border border-gray-300 bg-gray-300/60 pl-2">
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
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={confirmModal}
        openModal={openModal}
        data={selectedProduct}
        confirmMessage={"Are you sure to delete the following"}
        confirmButtonText={"Confirm"}
      ></Modal>
    </div>
  );
};

export default memo(MyProducts);
