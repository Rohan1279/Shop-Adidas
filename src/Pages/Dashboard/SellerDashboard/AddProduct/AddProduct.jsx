import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../../../../components/Loader/Loader";
import { Context } from "../../../../contexts/ContextProvider";
import { FaArrowDown, FaCheckCircle } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";
import DropDownMenu from "../../../../components/DropDownMenu/DropDownMenu";

const AddProduct = () => {
  const { authInfo, categories } = useContext(Context);
  const { logOut, user, isBuyer, isSeller, userRole } = authInfo;
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedCategory, setSelectedCategory] = useState(categories[1]);

  const handleAddProduct = (data, e) => {
    // e.preventDefault();
    setIsLoading(true);

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let posted_on = `${day}-${month}-${year}`;

    // {
    //   _id: 63c417a57229a7dca8c2092d,
    //   category: Men's Sneakers,
    //   category_id: 63bc18eb473f136f0720ce09,
    //   seller: Adidas,
    //   name: Forum 84 Low AEC Shoes,
    //   price: 150,
    //   description: ,
    //   reviewsCount: 15,
    //   ratings: 4.9,
    //   img: https://assets.adidas.com/images/w_600,f_auto,q_auto/63acfb46b511445181c4ae6d0165f2e3_9366/Forum_84_Low_AEC_Shoes_White_HR0557_01_standard.jpg,
    //   color: Cloud White / Red / Cloud White,
    //   productLinkHref: https://www.adidas.com/us/forum-84-low-aec-shoes/HR0557.html
    // }

    // const posted_on = new
    const product = {
      category_id: selectedCategory._id,
      category: selectedCategory.name,
      description: data.description,
      price: data.price,
      img: data.img,
      name: data.name,
      color: data.color,
      posted_on,
      seller_phone: data.seller_phone,
      seller_id: user?.uid,
      seller_name: user?.displayName,
      seller_email: user?.email,
      seller_default_image:
        "https://static.vecteezy.com/system/resources/thumbnails/009/312/919/small/3d-render-cute-girl-sit-crossed-legs-hold-laptop-studying-at-home-png.png",
      reviewsCount: 0,
      ratings: 0.0,
      isAdvertised: false,
      isReported: false,
    };
    console.log(product);
    // console.log(product);
    // fetch(`${process.env.REACT_APP_URL}/products`, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //     authorization: `bearer ${localStorage.getItem("accessToken")}`,
    //   },
    //   body: JSON.stringify(product),
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result);
    //     if (result.acknowledged) {
    //       toast.success(`${data.product_name}'s data added successfully`);
    //       navigate("/dashboard/myproducts");
    //     }
    //   });
  };
  return (
    <div>
      <h3 className="text-3xl text-center">Add a product</h3>
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="grid grid-cols-2 gap-3 mt-10 "
      >
        {/* //! PRODUCT_NAME  */}
        <div className="flex items-center border border-gray-300 rounded-full   overflow-hidden my-6">
          <input
            // onBlur={(e) => setCreatedUserEmail(e?.target?.value)}
            type="text"
            placeholder="product name"
            {...register("name", {
              required: "name is required",
            })}
            className=" focus:outline-none w-full bg-secondary-color p-2 rounded-full focus:shadow-nm-inset text-center "
            required
          />
        </div>

        <div className="">
          <DropDownMenu
            selected={selectedCategory}
            setSelected={setSelectedCategory}
            array={categories}
          ></DropDownMenu>
          {/* <Listbox value={selected} onChange={setSelected}>
            <div className="relative ">
              <Listbox.Button className="relative w-full cursor-default rounded-full active:shadow-nm-inset bg-secondary-color border border-zinc-300 py-2 pl-3 pr-10 text-left shadow-nm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2  sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <FaArrowDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {categories.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-blue-300 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <HiCheck
                                className="h-5 w-5 text-black"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox> */}
        </div>
        <select
          {...register("category_name")}
          className="select select-bordered w-full text-base rounded-full  bg-secondary-color focus:shadow-nm-inset border border-gray-300  text-center"
        >
          <option disabled defaultChecked className="text-green-400">
            Choose a category
          </option>
          <option>Network Modules</option>
          <option>Memory & Storage</option>
          <option>Main boards</option>
        </select>

        <input
          name="year_purchased"
          {...register("year_purchased", {
            required: "year is required",
          })}
          type="text"
          placeholder="year purchased"
          className="input  w-full input-bordered text-center"
        />

        <select
          {...register("condition")}
          className="select select-bordered w-full text-base"
        >
          <option disabled defaultChecked className="text-green-400">
            Pick product condition
          </option>
          <option>excellent</option>
          <option>good</option>
          <option>fair</option>
        </select>

        <input
          // name="seller_phone"
          {...register("seller_phone", {
            required: "phone number is required",
          })}
          type="text"
          placeholder="your phone number"
          className="input  w-full input-bordered text-center"
          required
        />
        <input
          // name="location"
          {...register("location", {
            required: "location is required",
          })}
          type="text"
          placeholder="meeting location"
          className="input  w-full input-bordered"
          // required
        />
        {/* <br /> */}
        <div className="flex items-center justify-around ">
          <span className="text-lg mr-7">Price: $</span>
          <input
            // name="original_price"
            {...register("original_price")}
            type="text"
            // defaultValue={product?.resale_price}
            placeholder="original price"
            maxLength={4}
            className="input  w-32 input-bordered  text-center"
            // required
          />
          <input
            // name="resale_price"
            {...register("resale_price", {
              required: "resale price is required",
            })}
            type="text"
            // defaultValue={product?.resale_price}
            placeholder="resale price"
            maxLength={4}
            className="input  w-32 input-bordered  text-center"
            // required
          />
        </div>
        <input
          // name="usage_period"
          {...register("usage_period", {
            required: "usage period is required",
          })}
          type="text"
          // defaultValue={product?.resale_price}
          placeholder="usage period"
          maxLength={10}
          className="input  w-full input-bordered  text-center"
          // required
        />

        <textarea
          {...register("description")}
          // name="description"
          className="textarea textarea-bordered col-span-2"
          placeholder="Description about the product"
        ></textarea>
        <input
          // name="picture"
          {...register("picture")}
          type="text"
          // defaultValue={product?.resale_price}
          placeholder="provide a photo URL of your product"
          className="input  input-bordered  text-center col-span-2"
          // required
        />
        <button className="btn btn-accent col-span-2">
          {isLoading ? <Loader /> : <input type="submit" value="Submit" />}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
