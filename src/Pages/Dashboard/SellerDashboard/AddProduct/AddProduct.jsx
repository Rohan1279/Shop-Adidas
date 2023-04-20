import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Loader from "../../../../components/Loader/Loader";
import { Context } from "../../../../contexts/ContextProvider";
import { FaArrowDown, FaCheckCircle, FaTrash } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";
import DropDownMenu from "../../../../components/DropDownMenu/DropDownMenu";
import { FileUploader } from "react-drag-drop-files";
import { getImageUrl } from "../../../../utils/getImageUrl";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import axios from "axios";
import InputField from "../../../../components/InputField/InputField";
import { memo } from "react";
import Button from "../../../../components/Button/Button";
const productColors = [
  { id: 0, name: "Beige", hex: "#F5F5DC" },
  { id: 1, name: "Black", hex: "#000000" },
  { id: 2, name: "Blue", hex: "#0000FF" },
  { id: 3, name: "Bronze", hex: "#CD7F32" },
  { id: 4, name: "Brown", hex: "#964B00" },
  { id: 5, name: "Coral", hex: "#FF7F50" },
  { id: 6, name: "Gold", hex: "#FFD700" },
  { id: 7, name: "Gray", hex: "#808080" },
  { id: 8, name: "Green", hex: "#008000" },
  { id: 9, name: "Indigo", hex: "#4B0082" },
  { id: 10, name: "Khaki", hex: "#F0E68C" },
  { id: 11, name: "Lavender", hex: "#E6E6FA" },
  { id: 12, name: "Lime", hex: "#00FF00" },
  { id: 13, name: "Magenta", hex: "#FF00FF" },
  { id: 14, name: "Maroon", hex: "#800000" },
  { id: 15, name: "Navy", hex: "#000080" },
  { id: 16, name: "Olive", hex: "#808000" },
  { id: 17, name: "Orange", hex: "#FFA500" },
  { id: 18, name: "Peach", hex: "#FFE5B4" },
  { id: 19, name: "Pink", hex: "#FFC0CB" },
  { id: 20, name: "Purple", hex: "#800080" },
  { id: 21, name: "Red", hex: "#FF0000" },
  { id: 22, name: "Salmon", hex: "#FA8072" },
  { id: 23, name: "Silver", hex: "#C0C0C0" },
  { id: 24, name: "Slate", hex: "#708090" },
  { id: 25, name: "Sky blue", hex: "#87CEEB" },
  { id: 26, name: "Teal", hex: "#008080" },
  { id: 27, name: "Turquoise", hex: "#40E0D0" },
  { id: 28, name: "White", hex: "#FFFFFF" },
  { id: 29, name: "Yellow", hex: "#FFFF00" },
  { id: 30, name: "Ochre", hex: "#CC7722" },
];
const clothSizes = [
  { id: "0", name: "XS", quantity: "", price: "" },
  { id: "1", name: "S", quantity: "", price: "" },
  { id: "2", name: "M", quantity: "", price: "" },
  { id: "3", name: "L", quantity: "", price: "" },
  { id: "4", name: "XL", quantity: "", price: "" },
  { id: "5", name: "2XL", quantity: "", price: "" },
  { id: "6", name: "3XL", quantity: "", price: "" },
];
const AddProduct = () => {
  const { authInfo, categories } = useContext(Context);
  const { logOut, user, isBuyer, isSeller, userRole } = authInfo;
  const navigate = useNavigate();
  const fixedCategories = categories.filter((category) => category.id !== "0");
  const clothesCategories = fixedCategories.filter((category) =>
    [1, 2, 3, 5, 8].includes(parseInt(category.id))
  );
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
    watch,
  } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedClothSize, setSelectedClothSize] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const [isImgDropped, setIsImgDropped] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [imgError, setImgError] = useState(null);
  const [imgSizeError, setImgSizeError] = useState(null);
  const fileTypes = ["JPG", "WEBP"];
  const error = !selectedCategory;
  useEffect(() => {
    if (!clothesCategories.includes(selectedCategory)) {
      setSelectedClothSize([]);
    }
  }, [selectedCategory]);

  const handleChange = async (imgFile) => {
    console.log(imgFile.size / 1024);

    setImgError(false);
    setIsLoading(false);
    setImgURL(URL.createObjectURL(imgFile));
    setImgFile(imgFile);
    setIsImgDropped(true);

    new Compressor(imgFile, {
      quality: 0.6,
      success: async (compressedResult) => {
        // setImgFile(compressedResult);
        // console.log("compressedResult", compressedResult);
        // console.log("imgFile", imgFile);
        // const formData = new FormData();
        // formData.append("image", imgFile);
        // try {
        //   const response = await fetch(
        //     `${import.meta.env.VITE_SERVER_URL}/upload`,
        //     {
        //       method: "POST",
        //       body: formData,
        //     }
        //   );
        //   console.log(await response.json());
        // } catch (e) {
        //   console.log("error");
        // }
      },
      error(err) {
        console.log(err.message);
      },
    });

    const formData = new FormData();
    formData.append("image", imgFile);
    // try {
    //   const response = await fetch(
    //     `${import.meta.env.VITE_SERVER_URL}/upload`,
    //     {
    //       method: "PATCH",
    //       body: formData,
    //     }
    //   );
    //   console.log(response);
    // } catch (e) {
    //   console.log("error");
    // }
  };

  const handleFileDrop = () => {
    setIsImgDropped(true);
  };
  // console.log("selectedClothSize", selectedClothSize);

  const handleAddProduct = (data, e) => {
    // e.preventDefault();
    if (!imgFile) {
      setImgError(true);
    }
    // setImgSizeError(false);
    const form = e.target;
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

    console.log("data.selectedClothSize", data.selectedClothSize);
    const sizes = selectedClothSize.reduce((acc, size, index) => {
      return [
        ...acc,
        {
          id: size.id,
          name: size.name,
          quantity: data.selectedClothSize[index]?.quantity,
          price: data.selectedClothSize[index]?.price,
        },
      ];
    }, []);
    const product = {
      category_id: selectedCategory._id,
      category: selectedCategory.name,
      description: data.description,
      price: data.price,
      name: data.name,
      color: selectedColor.name ?? "No color information available",
      quantity: data.quantity,
      promo_price: data.promo_price,
      sizes: sizes,
      posted_on: posted_on,
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
      inStock: false,
    };
    console.log(product.sizes);

    {
      /*
    sizes: [
      {size:"XS", price:"120", quantity:1},
      {size:"S", price:"120", quantity:1},
      {size:"M", price:"120", quantity:1},
      {size:"L", price:"120", quantity:1},
    ]
  */
    }

    // console.log(product, imgFile?.size / 1024);
    // if (imgFile && imgURL && data && selectedCategory && selectedColor) {
    //   setIsLoading(true);
    //   getImageUrl(imgFile).then((imgData) => {
    //     setImgURL(imgData);

    // fetch(`${import.meta.env.VITE_SERVER_URL}/products`, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //     authorization: `bearer ${localStorage.getItem("shop-adidas-token")}`,
    //   },
    //   body: JSON.stringify({ ...product }),
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result);

    //     if (result.acknowledged) {
    //       console.log(
    //         "%Product Added successfully!",
    //         "color: blue; font-size: 24px;"
    //       );
    //       form.reset();
    //       setIsLoading(false);
    //       navigate("/dashboard/myproducts");
    //     }
    //   });
  };
  const handleRegister = () => {
    const product_price = control._fields.price._f.ref.value;
    const product_quantity = control._fields.quantity._f.ref.value;

    control._fields.selectedClothSize.map((size) => {
      size.price._f.ref.value = product_price;
      size.quantity._f.ref.value = product_quantity;
    });
    console.log(control._fields.selectedClothSize);
  };
  return (
    <div className="min-h-screen py-10">
      <h3 className="text-3xl text-center">Add a product</h3>
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="px-0 md:px-10 mt-10 "
      >
        <div className={`col-span-1 h-fit  ${imgError && "animate-shake"}`}>
          {!isImgDropped && !imgFile ? (
            <FileUploader
              handleChange={handleChange}
              onDrop={handleFileDrop}
              onSizeError={() => {
                console.log("file size should be less than 2.00MB");
                // setImgError(false);
                setImgSizeError(true);
              }}
              hoverTitle={" "}
              maxSize={"2"}
              name="file"
              types={fileTypes}
              children={
                <section className="bg-gray-300/20  flex flex-col p-1 overflow-auto rounded-md border-dashed border-2 border-zinc-400/50 focus:outline-none mb-8">
                  <header className="flex flex-col items-center justify-center py-12 text-base transition  ease-in-out transform bg-inherit  rounded-md hover:bg-gray-300 ">
                    <p className="flex flex-wrap justify-center mb-3 text-base leading-7 text-blueGray-500">
                      <span>Drag and drop your</span>&nbsp;
                      <span>files anywhere or</span>
                    </p>
                    <button className="bg-secondary-color shadow-nm px-3 py-2 rounded-md active:shadow-nm-inset border border-zinc-300 transition-all">
                      Upload a file
                    </button>

                    <span className="text-gray-500 text-sm mt-1">
                      Max size: 2.00MB
                    </span>
                    {imgError && !imgSizeError && (
                      <p className={`text-red-400 text-sm mt-2`}>
                        Please attach an image file
                      </p>
                    )}
                    {imgSizeError && (
                      <p className="text-red-400 text-sm mt-2">
                        File size should be less than 2.00MB
                      </p>
                    )}
                  </header>
                </section>
              }
            />
          ) : (
            <div className="text-center border-2 border-dashed rounded-md p-2 border-zinc-400/50 ">
              <h3 className="font-bold text-sm my-2">Your image file</h3>
              <LazyLoadImage
                effect="opacity"
                src={imgURL}
                className={"rounded-md mx-auto w-full max-w-md shadow-md"}
              ></LazyLoadImage>
              <button
                onClick={() => {
                  setImgFile(null);
                  setImgURL(null);
                  setIsImgDropped(false);
                  setImgError(null);
                  setImgSizeError(null);
                }}
                type="button"
                className="justify-center bg-secondary-color border border-zinc-300 
                rounded-md shadow-nm active:shadow-nm-inset flex  items-center mx-auto 
                w-1/2 h-10 my-2 gap-x-2 active:text-gray-500"
              >
                <FaTrash></FaTrash>
                Remove
              </button>
            </div>
          )}
        </div>
        <div className="col-span-1 flex-col space-y-5">
          <fieldset className=" border border-gray-400/50 p-5 rounded-md spay">
            <legend className="px-2 bg-secondary-color  rounded-md">
              Product Information
            </legend>
            {/* //! PRODUCT_NAME  */}
            <div className="mb-5">
              <InputField
                getValues={getValues}
                fieldName={"Name"}
                register={register}
                placeholder={"product name"}
                inputName={"name"}
                minLength={6}
                maxLength={100}
                type={"text"}
                required={true}
              ></InputField>
              {errors.name?.type === "required" && (
                <p role="alert" className="text-red-400 text-sm">
                  Product name must be included
                </p>
              )}
              {errors.name?.type === "minLength" && (
                <p role="alert" className="text-red-400 text-sm">
                  Should be more than 10 characters
                </p>
              )}
            </div>

            <div className="  gap-x-2 space-y-5 lg:space-y-5">
              {/* //! CATEGORY  */}

              <div className="col-span-1  flex items-center border border-gray-300 rounded-md pl-2   bg-gray-300/60">
                <span className="mr-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Category
                </span>
                <div className="w-full border-l border-l-gray-300 h-11">
                  <DropDownMenu
                    selected={selectedCategory}
                    setSelected={setSelectedCategory}
                    array={fixedCategories}
                    // setError={setError}
                  ></DropDownMenu>
                </div>
              </div>

              {/* //! PRODUCT_COLOR */}
              <div className="col-span-1 flex items-center border border-gray-300 rounded-md pl-2  bg-gray-300/60 ">
                <span className="mr-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Color
                </span>
                <div className="w-full border-l border-l-gray-300">
                  <DropDownMenu
                    selected={selectedColor}
                    setSelected={setSelectedColor}
                    array={productColors}
                  ></DropDownMenu>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset
            className={`border border-gray-400/50 p-5 rounded-md ${
              error && "text-zinc-300"
            }`}
          >
            <legend className={`px-2 bg-secondary-color  rounded-md`}>
              Sizes, Price, Stock
            </legend>

            {/* //! PRODUCT_SIZE*/}
            <div className="lg:flex items-start gap-x-2 mb-5">
              <div className="flex items-center w-full border rounded-md border-gray-300 bg-gray-300/60 pl-2 mb-5 lg:mb-0">
                {" "}
                <span
                  className={`mr-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center ${
                    !clothesCategories.includes(selectedCategory) &&
                    "text-gray-300"
                  }`}
                >
                  Sizes
                </span>
                <div className="w-full border-l border-l-gray-300">
                  <DropDownMenu
                    error={
                      error || !clothesCategories.includes(selectedCategory)
                    }
                    multiple={true}
                    selected={selectedClothSize}
                    setSelected={setSelectedClothSize}
                    array={clothSizes}
                  ></DropDownMenu>
                </div>
              </div>
            </div>

            <div className="lg:grid grid-cols-4 gap-x-2 space-y-5 lg:space-y-0">
              {/* //! PRODUCT_PRICE*/}
              <div className={` ${error && "text-gray-300"} col-span-1`}>
                <InputField
                  fieldName={"Price"}
                  register={register}
                  placeholder={"product price"}
                  inputName={"price"}
                  min={1}
                  type={"number"}
                  required={true}
                  pattern={/^[1-9]\d*$/}
                  error={error}
                  formErrors={errors}
                  aria_invalid={errors?.price ? "true" : "false"}
                ></InputField>
                {errors.price?.type === "min" && selectedCategory && (
                  <p role="alert" className="text-red-400 text-sm">
                    Please enter a valid input
                  </p>
                )}
                {errors.price?.type === "required" && selectedCategory && (
                  <p role="alert" className="text-red-400 text-sm">
                    Price must be included
                  </p>
                )}
              </div>
              {/* //! PRODUCT_QUANTITY */}
              <div className="col-span-1">
                <InputField
                  fieldName={"Quantity"}
                  register={register}
                  placeholder={"product quantity"}
                  inputName={"quantity"}
                  min={1}
                  type={"number"}
                  required={true}
                  pattern={/^[1-9]\d*$/}
                  error={error}
                  aria_invalid={errors?.quantity ? "true" : "false"}
                ></InputField>
                {errors.quantity?.type === "min" && selectedCategory && (
                  <p role="alert" className="text-red-400 text-sm">
                    Please enter a valid input
                  </p>
                )}
                {errors.quantity?.type === "required" && selectedCategory && (
                  <p role="alert" className="text-red-400 text-sm">
                    Price must be included
                  </p>
                )}
              </div>
              {/* //! PRODUCT_PROMOTIONAL_PRICE*/}
              <div className={`${error && "text-gray-300"} col-span-1`}>
                <InputField
                  fieldName={"Promo Price"}
                  register={register}
                  placeholder={"promo price"}
                  inputName={"promo_price"}
                  min={1}
                  type={"number"}
                  required={true}
                  pattern={/^[1-9]\d*$/}
                  error={error}
                  formErrors={errors}
                  aria-invalid={errors?.promo_price ? "true" : "false"}
                ></InputField>
                {errors.promo_price?.type === "pattern" && (
                  <p role="alert" className="text-red-400 text-sm">
                    Please enter a valid input
                  </p>
                )}
              </div>
              <div>
                <button
                  onClick={handleRegister}
                  type="button"
                  className=" p-2 border bg-inherit shadow-nm active:shadow-nm-inset transition-all rounded-md"
                >
                  Apply to all
                </button>
              </div>
            </div>
            {/* // ! TABLE */}
            {selectedCategory && selectedClothSize.length > 0 && (
              <table className="min-w-full divide-y divide-gray-200 mt-5 border border-gray-300/60 ">
                <thead className="bg-gray-300/60 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Size
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-secondary-color divide-y divide-gray-300/80 ">
                  {selectedClothSize
                    ?.sort((a, b) => {
                      // sort id wise
                      return parseInt(a.id) - parseInt(b.id);
                    })
                    .map((size, idx) => (
                      <tr key={size.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-center font-medium text-gray-900">
                            {size.name}
                          </div>
                        </td>
                        <td className="py-2 whitespace-nowrap px-2">
                          <div
                            className={` border border-gray-300 rounded-md  bg-gray-300/60 ${
                              error && "border-gray-300/50 "
                            }`}
                          >
                            {/* //!  sizeQuantity */}
                            <input
                              type="number"
                              // defaultValue={}
                              placeholder="quantity"
                              min={1}
                              {...register(
                                `selectedClothSize.${idx}.quantity`,
                                {
                                  required: true,
                                  pattern: /^[1-9]\d*$/,
                                  min: 1,
                                }
                              )}
                              aria-invalid={
                                errors?.sizeQuantity ? "true" : "false"
                              }
                              className="focus:outline-none w-full bg-secondary-color p-3 text-sm  focus:shadow-nm-inset rounded-md text-center "
                              disabled={error}
                            />
                          </div>
                          {errors.sizeQuantity?.type === "min" &&
                            selectedCategory && (
                              <p role="alert" className="text-red-400 text-sm">
                                Please enter a valid input
                              </p>
                            )}
                          {errors.sizeQuantity?.type === "required" &&
                            selectedCategory && (
                              <p role="alert" className="text-red-400 text-sm">
                                Quantity must be included
                              </p>
                            )}
                        </td>
                        <td className="pr-2">
                          <div
                            className={` border border-gray-300 rounded-md  bg-gray-300/60 ${
                              error && "border-gray-300/50"
                            }`}
                          >
                            {/* //!  sizePrice */}
                            <input
                              type="number"
                              placeholder="price"
                              min={1}
                              {...register(`selectedClothSize.${idx}.price`, {
                                required: true,
                                pattern: /^[1-9]\d*$/,
                                min: 1,
                              })}
                              aria-invalid={
                                errors?.sizePrice ? "true" : "false"
                              }
                              className="focus:outline-none w-full bg-secondary-color p-3 text-sm  focus:shadow-nm-inset rounded-md text-center "
                              disabled={error}
                            />
                          </div>
                          {errors.sizePrice?.type === "min" &&
                            selectedCategory && (
                              <p role="alert" className="text-red-400 text-sm">
                                Please enter a valid input
                              </p>
                            )}
                          {errors.sizePrice?.type === "required" &&
                            selectedCategory && (
                              <p role="alert" className="text-red-400 text-sm">
                                Price must be included
                              </p>
                            )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </fieldset>

          <fieldset
            className={`border border-gray-400/50 p-5 rounded-md ${
              error && "text-zinc-300"
            }`}
          >
            <legend className={`px-2 bg-secondary-color  rounded-md`}>
              DESCRIPTION
            </legend>
            {/* //! PRODUCT_DESCRIPTION*/}
            <textarea
              {...register("description")}
              rows="5"
              style={{ resize: "none" }}
              className={`w-full bg-secondary-color border border-zinc-300 focus:outline-none  focus:shadow-nm-inset rounded-md p-2 text-center text-sm ${
                error &&
                "text-gray-300 border-gray-300/50 disabled:placeholder:text-gray-300"
              }`}
              placeholder="Description about the product"
              disabled={error}
            ></textarea>
          </fieldset>

          {isLoading ? (
            // <Loader />
            <div className="continuous-7 my-10 mx-auto"></div>
          ) : (
            <input
              // disabled={error || selectedClothSize.length === 0 }
              type="submit"
              value="Submit"
              className="w-2/3 p-3 block mx-auto rounded-md  bg-blue-400 text-white shadow-md shadow-blue-300 active:text-black cursor-pointer active:scale-95 transition-all disabled:bg-gray-300 disabled:shadow-none disabled:active:scale-100"
            />
          )}
        </div>
      </form>

      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName")} placeholder="First Name" />

        {controlledFields.map((field, index) => {
          return <input {...register(`fieldArray.${index}.name`)} />;
        })}

        <button
          type="button"
          onClick={() =>
            append({
              name: "bill",
            })
          }
        >
          Append
        </button>

        <input type="submit" />
      </form> */}
    </div>
  );
};

export default memo(AddProduct);
