import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  { id: "0", name: "XS" },
  { id: "1", name: "S" },
  { id: "2", name: "M" },
  { id: "3", name: "L" },
  { id: "4", name: "XL" },
  { id: "5", name: "2XL" },
  { id: "6", name: "3XL" },
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
  // const [error, setError] = useState(false);
  const error = !selectedCategory;

  console.log("selectedCategory", selectedCategory);
  console.log("error", error);
  // error && () => setSelectedClothSize([]);
  // console.log(error);
  // if (!clothesCategories.includes(selectedCategory)) {
  //   setSelectedClothSize([]);
  // }
  // console.log(selectedClothSize);
  useEffect(() => {
    if (!clothesCategories.includes(selectedCategory)) {
      setSelectedClothSize([]);
    }
    // if (!selectedCategory) {
    //   setError(false);
    // }
  }, [selectedCategory]);
  // console.log(clothesCategories.includes(selectedCategory));

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
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log(response);
    } catch (e) {
      console.log("error");
    }
  };

  // console.log(import.meta.env.VITE_IMGBB_KEY);
  const handleFileDrop = () => {
    // console.log("object");
    setIsImgDropped(true);
  };
  // console.log(selectedCategory, selectedColor);
  // console.log(register);

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

    // const posted_on = new
    const product = {
      category_id: selectedCategory._id,
      category: selectedCategory.name,
      description: data.description,
      price: data.price,
      name: data.name,
      color: selectedColor.name ?? "No color information available",
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
    console.log(data);
    // console.log(product, imgFile?.size / 1034);
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
  return (
    <div className="min-h-screen py-10">
      <h3 className="text-3xl text-center">Add a product</h3>
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="px-0 md:px-10 mt-10 md:grid grid-cols-2 gap-x-8"
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
                    {/* <span className="text-gray-500 text-sm mt-1">[jpeg,webp]</span> */}
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
              {/* <div className="w-full"> */}
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
              {/* </div> */}
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
                <span className="mr-3 ">Category</span>
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
                <span className="mr-3 font-">Color</span>
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
            <div className="col-span-1 flex items-center border border-gray-300 rounded-md pl-2  mb-5  bg-gray-300/60">
              <span
                className={`mr-3 font- ${
                  !clothesCategories.includes(selectedCategory) &&
                  "text-gray-300"
                }`}
              >
                Sizes
              </span>
              <div className="w-full border-l border-l-gray-300">
                <DropDownMenu
                  error={error || !clothesCategories.includes(selectedCategory)}
                  multiple={true}
                  selected={selectedClothSize}
                  setSelected={setSelectedClothSize}
                  array={clothSizes}
                ></DropDownMenu>
              </div>
            </div>

          
            <div className="lg:grid grid-cols-2 gap-x-2 space-y-5 lg:space-y-0">
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
              <div className={`${error && "text-gray-300"} col-span-1`}>
                {/* //! PRODUCT_PROMOTIONAL_PRICE*/}
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
                {/* <div
                  className={`flex items-center border border-gray-300 rounded-md pl-2 ${
                    error && "border-gray-300/50"
                  }`}
                >
                  <span className={`mr-3 min-w-max`}>Promo Price</span>
                  <input
                    type={"text"}
                    maxLength={6}
                    minLength={1}
                    placeholder="promo price"
                    {...register("promo_price", {
                      // required: true,
                      pattern: /^[1-9]\d*$/,
                    })}
                    aria-invalid={errors.price ? "true" : "false"}
                    className="focus:outline-none w-full bg-secondary-color p-3 border-l border-l-gray-300 text-sm  focus:shadow-nm-inset text-center disabled:placeholder:text-gray-300"
                    disabled={error}
                  />
                </div> */}
                {errors.promo_price?.type === "pattern" && (
                  <p role="alert" className="text-red-400 text-sm">
                    Please enter a valid input
                  </p>
                )}
              </div>
            </div>
            {selectedCategory && selectedClothSize.length > 0 && (
              <table class="min-w-full divide-y divide-gray-200 mt-5 border border-gray-300/60 ">
                <thead class="bg-gray-300/60 ">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Size
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-secondary-color divide-y divide-gray-400/50">
                  {selectedClothSize.map((size, idx) => (
                    <tr key={idx}>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">
                          {size.name}
                        </div>
                      </td>
                      <td class="py-2 whitespace-nowrap">
                        <div
                          className={` border border-gray-300 rounded-md  bg-gray-300/60 ${
                            error && "border-gray-300/50"
                          }`}
                        >
                         

                          <input
                            type="number"
                            placeholder="quantity"
                            {...register("sizeQuantity", {
                              required: true,
                              pattern: /^[1-9]\d*$/,
                              min: 1,
                            })}
                            aria-invalid={errors?.price ? "true" : "false"}
                            className="focus:outline-none w-full bg-secondary-color p-3 text-sm  focus:shadow-nm-inset rounded-md text-center "
                            disabled={error}
                          />
                        </div>
                        {/* <InputField
                          fieldName={""}
                          register={register}
                          placeholder={"quantity"}
                          inputName={"promo_price"}
                          min={1}
                          type={"number"}
                          required={true}
                          pattern={/^[1-9]\d*$/}
                          error={error}
                          formErrors={errors}
                          aria-invalid={errors?.promo_price ? "true" : "false"}
                        ></InputField> */}
                      </td>
                      <td class="">
                        <InputField
                          fieldName={""}
                          register={register}
                          placeholder={"price"}
                          inputName={"promo_price"}
                          min={1}
                          type={"number"}
                          required={true}
                          pattern={/^[1-9]\d*$/}
                          error={error}
                          formErrors={errors}
                          aria-invalid={errors?.promo_price ? "true" : "false"}
                        ></InputField>
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
              // name="description"
              className={`w-full bg-secondary-color border border-zinc-300 focus:outline-none  focus:shadow-nm-inset rounded-md p-2 text-center text-sm ${
                error &&
                "text-gray-300 border-gray-300/50 disabled:placeholder:text-gray-300"
              }`}
              placeholder="Description about the product"
              disabled={error}
            ></textarea>
          </fieldset>
          {/* <button className="w-full p-3 mx-auto rounded-md  bg-blue-400 text-white shadow-md shadow-blue-300 active:text-black"> */}
          {isLoading ? (
            // <Loader />
            <div className="continuous-7 my-10 mx-auto"></div>
          ) : (
            <input
              type="submit"
              value="Submit"
              className="w-2/3 p-3 block mx-auto rounded-md  bg-blue-400 text-white shadow-md shadow-blue-300 active:text-black cursor-pointer active:scale-95 transition-all"
            />
          )}
          {/* <div className="continuous-7"></div> */}
          {/* </button> */}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
