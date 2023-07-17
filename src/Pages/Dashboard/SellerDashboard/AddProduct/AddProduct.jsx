import React, { Fragment, useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Loader from "../../../../components/Loader/Loader";
import { Context } from "../../../../contexts/ContextProvider";
import { FaImage, FaImages, FaTrash } from "react-icons/fa";
import DropDownMenu from "../../../../components/DropDownMenu/DropDownMenu";
import { FileUploader } from "react-drag-drop-files";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import axios from "axios";
import InputField from "../../../../components/InputField/InputField";
import { memo } from "react";
import Button from "../../../../components/Button/Button";
import { toast } from "react-hot-toast";
import { dataLoader } from "../../../../utils/dataLoader";
import Cookies from "js-cookie";
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
  { id: "0", name: "XS", stock: "", price: "" },
  { id: "1", name: "S", stock: "", price: "" },
  { id: "2", name: "M", stock: "", price: "" },
  { id: "3", name: "L", stock: "", price: "" },
  { id: "4", name: "XL", stock: "", price: "" },
  { id: "5", name: "2XL", stock: "", price: "" },
  { id: "6", name: "3XL", stock: "", price: "" },
];
const footSizes = [
  { id: "0", name: "39", stock: "", price: "" },
  { id: "1", name: "40", stock: "", price: "" },
  { id: "2", name: "41", stock: "", price: "" },
  { id: "3", name: "42", stock: "", price: "" },
  { id: "4", name: "43", stock: "", price: "" },
  { id: "5", name: "44", stock: "", price: "" },
];
const pantsSizes = [
  { id: "1", name: "29", stock: "", price: "" },
  { id: "2", name: "30", stock: "", price: "" },
  { id: "3", name: "31", stock: "", price: "" },
  { id: "4", name: "32", stock: "", price: "" },
  { id: "5", name: "34", stock: "", price: "" },
];

const AddProduct = () => {
  const { authInfo, categories } = useContext(Context);
  // const { categories } = dataLoader();
  const { logOut, user, isBuyer, isSeller, userRole } = authInfo;
  const navigate = useNavigate();
  const fixedCategories = categories?.filter((category) => category.id !== "0");
  const clothesCategories = fixedCategories?.filter((category) =>
    // add category id here
    [8]?.includes(parseInt(category.id))
  );
  const footWearCategories = fixedCategories?.filter((category) =>
    // add category id here
    [1, 3]?.includes(parseInt(category.id))
  );
  const pantsCategories = fixedCategories?.filter((category) =>
    // add category id here
    [2]?.includes(parseInt(category.id))
  );

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedProductSize, setSelectedProductSize] = useState([]);
  const [selectedCategorySizes, setselectedCategorySizes] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const [isImgDropped, setIsImgDropped] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [imgError, setImgError] = useState(null);
  const [imgSizeError, setImgSizeError] = useState(null);
  const [uploadError, setUploadError] = useState(false);
  const fileTypes = ["JPG", "WEBP"];
  const error = !selectedCategory;
  const getDate = () => {
    // const date = new Date();
    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();

    // let hour = date.getHours();
    // let minute = date.getMinutes();
    // let second = date.getSeconds();

    // console.log(posted_on);

    const now = new Date();
    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    const hour = ("0" + now.getHours()).slice(-2);
    const minute = ("0" + now.getMinutes()).slice(-2);
    const second = ("0" + now.getSeconds()).slice(-2);
    let posted_on = `${day}-${month}-${year} ${hour}:${minute}:${second}`;

    return posted_on;
  };
  useEffect(() => {
    if (
      !clothesCategories?.includes(selectedCategory) ||
      !footWearCategories?.includes(selectedCategory) ||
      !pantsCategories?.includes(selectedCategory)
    ) {
      setSelectedProductSize([]);
    }
    if (clothesCategories?.includes(selectedCategory)) {
      setselectedCategorySizes(clothSizes);
    } else if (footWearCategories?.includes(selectedCategory)) {
      setselectedCategorySizes(footSizes);
    } else if (pantsCategories?.includes(selectedCategory)) {
      setselectedCategorySizes(pantsSizes);
    } else {
      setselectedCategorySizes([]);
    }
  }, [selectedCategory]);
  const handleChange = async (imgFile) => {
    // console.log(imgFile.size / 1024);

    setImgError(false);
    // setIsLoading(false);
    setImgURL(URL.createObjectURL(imgFile));
    setIsImgDropped(true);

    new Compressor(imgFile, {
      quality: 0.4,
      success: async (compressedResult) => {
        // console.log("compressedResult", compressedResult.size / 1024);
        const formData = new FormData();
        formData.append("image", compressedResult);

        // sets blob name
        formData.set("image", compressedResult, imgFile.name);
        setImgFile(formData);
      },
      error(err) {
        console.log(err.message);
      },
    });

    // const formData = new FormData();
    // formData.append("image", imgFile);
    // try {
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_SERVER_URL}/upload`,
    //     formData
    //   );
    //   setUploadUrl(response.data.imgUrl);
    //   console.log(response.data);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const handleFileDrop = () => {
    setIsImgDropped(true);
  };
  // console.log("selectedProductSize", selectedProductSize);

  const handleAddProduct = async (data, e) => {
    // e.preventDefault();
    if (!imgFile) {
      setImgError(true);
    }
    // setImgSizeError(false);
    const form = e.target;

    const filteredClothSize = selectedProductSize.map((size) => {
      const index = parseInt(size.id);
      return data.selectedProductSize[index];
    });
    // combine filtered cloth sizes with selectedData cloth sizes from form
    const sizes = selectedProductSize.reduce((acc, size, index) => {
      return [
        ...acc,
        {
          ...size,
          stock: parseInt(filteredClothSize[index]?.stock),
          price: parseInt(filteredClothSize[index]?.price),
        },
      ];
    }, []);
    if (imgFile && imgURL && data && selectedCategory) {
      setIsLoading(true);

      try {
        // Create a route to create a new folder
        //? take username if user creates a profile with phone no and such...
        const folderName = `${user?.email}`;
        const response = await axios.put(
          `${import.meta.env.VITE_SERVER_URL}/createFolder`,
          { folderName }
        );
        const folderId = response.data.folderId;
        // Upload file
        try {
          imgFile.append("folderId", folderId);
          // const config = {
          //   onUploadProgress: function (progressEvent) {
          //     const percentCompleted =
          //       (progressEvent.loaded / progressEvent.total) * 100;
          //     bar.setAttribute("value", percentCompleted);
          //     bar.previousElementSibling.textContent = `${percentCompleted}%`;
          //     if (percentCompleted === 100) {
          //       bar.previousElementSibling.textContent = `Upload complete!`;
          //     }
          //   },
          // };
          // const bar = document.getElementById("progress-bar");
          const uploadResponse = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/upload`,
            imgFile
          );
          const imgId = uploadResponse.data.fileId;
          const imgUrl = uploadResponse.data.imgUrl;
          console.log(imgId, imgUrl);
          const product = {
            category_id: selectedCategory._id,
            category: selectedCategory.name,
            description: /^\s*$/.test(data?.description)
              ? "No description available"
              : data?.description,
            price: parseInt(data.price),
            name: data.name,
            color: /^\s*$/.test(selectedColor?.name) // check if the string is only whitespace
              ? "No color information available"
              : selectedColor.name,
            brand: /^\s*$/.test(data?.brand) ? "No brand" : data?.brand,
            stock: data.stock,
            promo_price: data.promo_price,
            sizes: sizes || "No sizes avaiable",
            imgId: imgId,
            img: imgUrl,
            googleFolderId: folderId,
            posted_on: getDate(),
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
          console.log(product);
          // ! post using toast
          toast.promise(
            fetch(`${import.meta.env.VITE_SERVER_URL}/products`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `bearer ${Cookies.get("shop-adidas-token")}`,
              },
              body: JSON.stringify({ ...product }),
            })
              .then((res) => {
                if (!res.ok) {
                  setIsLoading(false);
                  setUploadError(true);
                  throw new Error(res.statusText);
                }
                return res.json();
              })
              .then((result) => {
                if (result.acknowledged) {
                  setUploadError(false);

                  // toast.success("Product Added successfully!");

                  form.reset();
                  setIsLoading(false);
                  navigate("/dashboard/myproducts");
                }
              })
              .catch((err) => toast.error(err)),
            {
              loading: "Loading",
              success: "Product Added successfully!",
            }
          );
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          // toast.error(e);
        }
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        toast.error(e.message);
      }
    }
  };
  const handleApply = () => {
    // console.log(selectedProductSize);

    const product_price = control._formValues.price;
    const product_stock = control._formValues.stock;

    // remove input field data
    control._formValues.selectedProductSize?.map((size) => {
      size.price = product_price;
      size.stock = product_stock;
    });
    // remove input field value
    control._fields.selectedProductSize?.map((size) => {
      size.price._f.ref.value = product_price;
      size.stock._f.ref.value = product_stock;
    });
  };
  return (
    <div className="min-h-screen py-20 px-5">
      <h3 className="text-center text-3xl">Add a product</h3>
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className=" mx-auto mt-10 max-w-7xl "
      >
        <div className={` mb-5 h-fit ${imgError && "animate-shake"}`}>
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
                <section className="mb-8 flex flex-col overflow-auto rounded-md border-2 border-dashed border-zinc-400/50 bg-gray-300/20 p-1 focus:outline-none ">
                  <header className="flex transform flex-col items-center justify-center rounded-md bg-inherit  py-12 text-base transition  ease-in-out hover:bg-gray-200 ">
                    <p className="text-blueGray-500 mb-3 flex flex-wrap justify-center text-base leading-7">
                      <span>Drag and drop your</span>&nbsp;
                      <span>files anywhere or</span>
                    </p>
                    <button className="flex items-center justify-center gap-x-1 rounded-md border border-zinc-300 bg-secondary-color px-3 py-2 shadow-nm transition-all active:shadow-nm-inset">
                      Upload an image<FaImages></FaImages>
                    </button>

                    <span className="mt-1 text-sm text-gray-500">
                      Max size: 2.00MB
                    </span>
                    {imgError && !imgSizeError && (
                      <p className={`mt-2 text-sm text-red-400`}>
                        Please attach an image file
                      </p>
                    )}
                    {imgSizeError && (
                      <p className="mt-2 text-sm text-red-400">
                        File size should be less than 2.00MB
                      </p>
                    )}
                  </header>
                </section>
              }
            />
          ) : (
            <div className="rounded-md border-2 border-dashed border-zinc-400/50 p-2 text-center ">
              <h3 className="my-2 text-sm font-bold">Your image file</h3>
              <LazyLoadImage
                effect="opacity"
                src={imgURL}
                className={"mx-auto w-full max-w-md rounded-md shadow-md"}
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
                className="mx-auto my-2 flex h-10 
                w-1/2 items-center justify-center gap-x-2  rounded-md border 
                border-zinc-300 bg-secondary-color shadow-nm active:text-gray-500 active:shadow-nm-inset"
              >
                <FaTrash></FaTrash>
                Remove
              </button>
            </div>
          )}
        </div>
        <div className="col-span-1 flex-col space-y-5">
          <fieldset className=" spay rounded-md border border-gray-400/50 p-5">
            <legend className="rounded-md bg-secondary-color  px-2">
              Product Information
            </legend>
            {/* //! PRODUCT_NAME  */}
            <div className="mb-5">
              <InputField
                // // getValues={getValues}
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
                <p role="alert" className="text-sm text-red-400">
                  Product name must be included
                </p>
              )}
              {errors.name?.type === "minLength" && (
                <p role="alert" className="text-sm text-red-400">
                  Should be more than 10 characters
                </p>
              )}
            </div>

            <div className="gap-x-2 space-y-5 lg:space-y-5">
              {/* //! CATEGORY  */}

              <div className="col-span-1  flex items-center rounded-md border border-gray-300 bg-gray-300/60   pl-2">
                <span className="mr-3  text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  Category
                </span>
                <div className="h-11 w-full border-l border-l-gray-300">
                  <DropDownMenu
                    selectedData={selectedCategory}
                    setSelectedData={setSelectedCategory}
                    array={fixedCategories}
                    // setError={setError}
                  ></DropDownMenu>
                </div>
              </div>

              {/* //! PRODUCT_COLOR */}
              <div className="col-span-1 flex items-center rounded-md border border-gray-300 bg-gray-300/60  pl-2 ">
                <span className="mr-3  text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  Color
                </span>
                <div className="w-full border-l border-l-gray-300">
                  <DropDownMenu
                    selectedData={selectedColor}
                    setSelectedData={setSelectedColor}
                    array={productColors}
                  ></DropDownMenu>
                </div>
              </div>
              {/* //! BRAND */}
              <InputField
                // // getValues={getValues}
                fieldName={"Brand"}
                register={register}
                placeholder={"brand name"}
                inputName={"brand"}
                minLength={3}
                maxLength={100}
                type={"text"}
                required={false}
              ></InputField>
              {errors.name?.type === "minLength" && (
                <p role="alert" className="text-sm text-red-400">
                  Should be more than 10 characters
                </p>
              )}
            </div>
          </fieldset>
          <fieldset
            className={`rounded-md border border-gray-400/50 p-5 ${
              error && "text-zinc-300"
            }`}
          >
            <legend className={`rounded-md bg-secondary-color  px-2`}>
              Sizes, Price, Stock
            </legend>

            {/* //! PRODUCT_SIZE*/}
            <div className="mb-5 items-start gap-x-2 lg:flex">
              <div className="mb-5 flex w-full items-center rounded-md border border-gray-300 bg-gray-300/60 pl-2 lg:mb-0">
                {" "}
                <span
                  className={`mr-3  text-center text-xs font-medium uppercase tracking-wider text-gray-500 ${
                    !clothesCategories?.includes(selectedCategory) &&
                    !footWearCategories?.includes(selectedCategory) &&
                    !pantsCategories?.includes(selectedCategory) &&
                    "text-gray-300"
                  }`}
                >
                  Sizes
                </span>
                <div className="w-full border-l border-l-gray-300">
                  <DropDownMenu
                    formControl={control}
                    error={
                      error ||
                      (!clothesCategories?.includes(selectedCategory) &&
                        !footWearCategories?.includes(selectedCategory) &&
                        !pantsCategories?.includes(selectedCategory))
                    }
                    multiple={true}
                    selectedData={selectedProductSize}
                    setSelectedData={setSelectedProductSize}
                    array={selectedCategorySizes}
                  ></DropDownMenu>
                </div>
              </div>
            </div>

            <div className="grid-cols-4 gap-x-2 space-y-5 lg:grid lg:space-y-0">
              {/* //! PRODUCT_PRICE*/}
              <div className={` ${error && "text-gray-300"} col-span-1`}>
                <InputField
                  fieldName={"Price"}
                  register={register}
                  placeholder={"product price"}
                  inputName={"price"}
                  min={1}
                  type={"number"}
                  required={false}
                  pattern={/^[1-9]\d*$/}
                  error={error}
                  formErrors={errors}
                  aria_invalid={errors?.price ? "true" : "false"}
                ></InputField>
                {errors.price?.type === "min" && selectedCategory && (
                  <p role="alert" className="text-sm text-red-400">
                    Please enter a valid input
                  </p>
                )}
                {errors.price?.type === "required" && selectedCategory && (
                  <p role="alert" className="text-sm text-red-400">
                    Price must be included
                  </p>
                )}
              </div>
              {/* //! PRODUCT_STOCK */}
              <div className="col-span-1">
                <InputField
                  fieldName={"Stock"}
                  register={register}
                  placeholder={"product stock"}
                  inputName={"stock"}
                  min={1}
                  type={"number"}
                  required={false}
                  pattern={/^[1-9]\d*$/}
                  error={error}
                  aria_invalid={errors?.stock ? "true" : "false"}
                ></InputField>
                {errors.stock?.type === "min" && selectedCategory && (
                  <p role="alert" className="text-sm text-red-400">
                    Please enter a valid input
                  </p>
                )}
                {errors.stock?.type === "required" && selectedCategory && (
                  <p role="alert" className="text-sm text-red-400">
                    Price must be included
                  </p>
                )}
              </div>
              {/* //! PRODUCT_PROMOTIONAL_PRICE*/}
              <div className={`${error && "text-gray-300"} col-span-1 text-sm`}>
                <InputField
                  fieldName={"Promo Price"}
                  register={register}
                  placeholder={"promo price"}
                  inputName={"promo_price"}
                  min={1}
                  type={"number"}
                  required={false}
                  pattern={/^[1-9]\d*$/}
                  error={error}
                  formErrors={errors}
                  aria-invalid={errors?.promo_price ? "true" : "false"}
                ></InputField>
                {errors.promo_price?.type === "pattern" && (
                  <p role="alert" className="text-sm text-red-400">
                    Please enter a valid input
                  </p>
                )}
              </div>
              <div className="">
                <button
                  onClick={handleApply}
                  type="button"
                  className={`${
                    error ? "bg-secondary-color" : "bg-blue-50/50"
                  } w-full rounded-md border border-zinc-300 p-2 transition-all active:shadow-nm-inset `}
                >
                  Apply to all
                </button>
              </div>
            </div>
            {/* // ! TABLE */}
            {selectedCategory && selectedProductSize.length > 0 && (
              <table className="mt-5 min-w-full divide-y divide-gray-200 border border-gray-300/60 ">
                <thead className="bg-gray-300/60 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Size
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Stock
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300/80 bg-secondary-color ">
                  {selectedProductSize
                    ?.sort((a, b) => {
                      // sort id wise
                      return parseInt(a.id) - parseInt(b.id);
                    })
                    .map((size, idx) => (
                      <tr key={size.id}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-center text-sm font-medium text-gray-900">
                            {size.name}
                          </div>
                        </td>
                        <td className="pr-2">
                          <div
                            className={` rounded-md border border-gray-300  bg-gray-300/60 ${
                              error && "border-gray-300/50"
                            }`}
                          >
                            {/* //!  sizePrice */}
                            <input
                              defaultValue={"0"}
                              type="number"
                              placeholder="price"
                              min={1}
                              {...register(
                                `selectedProductSize.${size.id}.price`,
                                {
                                  required: true,
                                  pattern: /^[1-9]\d*$/,
                                  min: 1,
                                }
                              )}
                              aria-invalid={
                                errors?.sizePrice ? "true" : "false"
                              }
                              className="w-full rounded-md bg-secondary-color p-3 text-center  text-sm focus:shadow-nm-inset focus:outline-none "
                              disabled={error}
                            />
                          </div>
                          {(errors.sizePrice?.type === "min" ||
                            errors.sizePrice?.type === "pattern") &&
                            selectedCategory && (
                              <p role="alert" className="text-sm text-red-400">
                                Please enter a valid input
                              </p>
                            )}
                          {errors.sizePrice?.type === "required" &&
                            selectedCategory && (
                              <p role="alert" className="text-sm text-red-400">
                                Price must be included
                              </p>
                            )}
                        </td>
                        <td className="whitespace-nowrap py-2 px-2">
                          <div
                            className={` rounded-md border border-gray-300  bg-gray-300/60 ${
                              error && "border-gray-300/50 "
                            }`}
                          >
                            {/* //!  sizeQuantity */}
                            <input
                              type="number"
                              defaultValue={"0"}
                              placeholder="stock"
                              min={1}
                              {...register(
                                `selectedProductSize.${size.id}.stock`,
                                {
                                  required: true,
                                  pattern: /^[1-9]\d*$/,
                                  min: 1,
                                }
                              )}
                              aria-invalid={
                                errors?.sizeQuantity ? "true" : "false"
                              }
                              className="w-full rounded-md bg-secondary-color p-3 text-center  text-sm focus:shadow-nm-inset focus:outline-none "
                              disabled={error}
                            />
                          </div>
                          {(errors.selectedProductSize?.type === "min" ||
                            errors.selectedProductSize?.type === "pattern") &&
                            selectedCategory && (
                              <p role="alert" className="text-sm text-red-400">
                                Please enter a valid input
                              </p>
                            )}
                          {errors.selectedProductSize?.type === "required" &&
                            selectedCategory && (
                              <p role="alert" className="text-sm text-red-400">
                                Quantity must be included
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
            className={`rounded-md border border-gray-400/50 p-5 ${
              error && "text-zinc-300"
            }`}
          >
            <legend className={`rounded-md bg-secondary-color  px-2`}>
              DESCRIPTION
            </legend>
            {/* //! PRODUCT_DESCRIPTION*/}
            <textarea
              {...register("description")}
              rows="5"
              style={{ resize: "none" }}
              className={`w-full rounded-md border border-zinc-300 bg-secondary-color  p-2 text-center text-sm focus:shadow-nm-inset focus:outline-none ${
                error &&
                "border-gray-300/50 text-gray-300 disabled:placeholder:text-gray-300"
              }`}
              placeholder="Description about the product"
              disabled={error}
            ></textarea>
          </fieldset>
          {/* <div>
            <label htmlFor="progress-bar">0%</label>
            <progress id="progress-bar" value={0} max={100}></progress>
          </div> */}
          {isLoading ? (
            // <Loader />
            <>
              <div className="continuous-7 my-10 mx-auto"></div>
            </>
          ) : (
            <input
              // disabled={error || selectedProductSize.length === 0 }

              type="submit"
              value="Submit"
              className="mx-auto block w-2/3 cursor-pointer rounded-md  bg-blue-400 p-3 text-white shadow-md shadow-blue-300 transition-all active:scale-95 active:text-black disabled:bg-gray-300 disabled:shadow-none disabled:active:scale-100"
            />
          )}
        </div>
      </form>
      {uploadError && (
        <p className="my-4 px-6 py-3 text-center  text-sm font-medium tracking-wider  text-gray-500">
          Please{" "}
          <span
            onClick={() => {
              logOut();
              navigate("/login");
            }}
            className="inline-block cursor-pointer text-blue-400  hover:underline "
          >
            login
          </span>{" "}
          again if error persists.
        </p>
      )}
    </div>
  );
};

export default memo(AddProduct);
