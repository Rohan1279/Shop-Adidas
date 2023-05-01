import React, { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../../../../contexts/ContextProvider";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaEye, FaTrash, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Dialog, Transition } from "@headlessui/react";
import Modal from "../../../../components/Modal/Modal";

const MyProducts = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setselectedProduct] = useState({});
  function closeModal() {
    setselectedProduct({});
    setIsOpen(false);
  }
  function openModal(product) {
    setselectedProduct(product);
    setIsOpen(true);
  }
  const navigate = useNavigate();
  const { authInfo } = useContext(Context);
  const { user } = authInfo;
  const url = `${import.meta.env.VITE_SERVER_URL}/seller_products?email=${
    user?.email
  }`;
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: () =>
      fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("shop-adidas-token")}`,
        },
      }).then((res) => res.json()),
  });
  useEffect(() => {
    refetch();
  }, [refetch]);
  const viewproduct = (data) => {
    console.log(data);
  };
  // console.log(products);
  return (
    <div className="min-h-screen py-10 px-5">
      <div className="flex flex-col max-w-7xl mx-auto mt-10">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-none">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-300/60 ">
                  <tr className="text-center">
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
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
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
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Brand
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
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
                  {products?.map((product, idx) => (
                    <tr key={product?._id} className="text-center h-16">
                      <th className="text-sm font-light ">{idx + 1}</th>
                      <td>
                        <LazyLoadImage
                          effect="opacity"
                          src={product?.img}
                          alt=""
                          className="w-12 h-12 mx-auto"
                        />
                      </td>
                      <td className="text-left">{product?.posted_on}</td>
                      <td className="text-left">{product?.name}</td>
                      <td>{product?.category}</td>
                      <td>{product?.brand ?? "No brand"}</td>
                      <td>{product?.price}</td>
                      <td>{product?.stock}</td>
                      <td className="text-left">
                        {product?.sizes.map((size, idx) => (
                          <span
                            key={size?.id}
                            className="inline-flex items-center border border-gray-400 gap-1.5 p-1 w-6  rounded-md text-xs text-gray-500 font-medium bg-gray-300/60 mx-1 hover:bg-gray-200/50 transition-all"
                          >
                            {size.name}
                          </span>
                        ))}
                      </td>
                      <td className="space-x-2">
                        <FaEdit className="inline-block bg-secondary-color w-8 h-8 p-2 rounded-md shadow-nm cursor-pointer active:shadow-nm-inset hover:brightness-95 transition-all"></FaEdit>
                        <Modal
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          closeModal={closeModal}
                          openModal={openModal}
                          data={selectedProduct}
                          confirmText={"Confirm"}
                        >
                          <FaTrashAlt
                            onClick={() => {
                              openModal(product);
                              // viewproduct(product?._id);
                            }}
                            className="inline-block bg-secondary-color w-8 h-8 p-2 rounded-md shadow-nm  cursor-pointer active:shadow-nm-inset hover:brightness-95 transition-all"
                          ></FaTrashAlt>
                        </Modal>
                        
                        <FaEye
                          onClick={() => {
                            navigate(`/products/product/${product._id}`, {
                              state: product,
                            });
                          }}
                          className="inline-block bg-secondary-color w-8 h-8 p-2 rounded-md shadow-nm  cursor-pointer active:shadow-nm-inset hover:brightness-95 transition-all"
                        >
                          {/* <Link to={`/products/product/${product._id}`}></Link> */}
                        </FaEye>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
