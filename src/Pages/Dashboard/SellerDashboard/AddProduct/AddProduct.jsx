import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../../../../components/Loader/Loader";
import { Context } from "../../../../contexts/ContextProvider";
import { FaArrowDown, FaCheckCircle } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";
import DropDownMenu from "../../../../components/DropDownMenu/DropDownMenu";
import { FileUploader } from "react-drag-drop-files";
import { getImageUrl } from "../../../../utils/getImageUrl";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { authInfo, categories } = useContext(Context);
  const { logOut, user, isBuyer, isSeller, userRole } = authInfo;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const clothColors = [
    { name: "Red" },
    { name: "Blue" },
    { name: "Green" },
    { name: "Yellow" },
    { name: "Orange" },
    { name: "Purple" },
    { name: "Pink" },
    { name: "Black" },
    { name: "White" },
    { name: "Gray" },
    { name: "Brown" },
    { name: "Beige" },
    { name: "Turquoise" },
    { name: "Magenta" },
    { name: "Navy" },
    { name: "Maroon" },
    { name: "Olive" },
    { name: "Teal" },
    { name: "Lavender" },
    { name: "Cream" },
    { name: "Charcoal" },
    { name: "Burgundy" },
    { name: "Indigo" },
    { name: "Taupe" },
    { name: "Mustard" },
    { name: "Rust" },
    { name: "Fuchsia" },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[1]);
  const [selectedClothColor, setSelectedClothColor] = useState(clothColors[0]);
  const [imgFile, setImgFile] = useState(null);
  const [isImgDropped, setIsImgDropped] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [imgLoading, setImgLoading] = useState(false);
  const fileTypes = ["JPG", "PNG"];

  const sizes = [
    { id: 1, name: "XS" },
    { id: 2, name: "S" },
    { id: 3, name: "M" },
    { id: 4, name: "L" },
    { id: 5, name: "XL" },
    { id: 6, name: "2L" },
  ];
  const [selectedSize, setSelectedSize] = useState([sizes[0]]);
  // console.log(selectedSize);

  const handleChange = (imgFile) => {
    setImgLoading(true);
    setImgFile(imgFile);
    setIsImgDropped(true);
    getImageUrl(imgFile).then((imgData) => {
      console.log(imgData);
      setImgLoading(false);
      setImgURL(imgData);
    });
  };

  // console.log(import.meta.env.VITE_IMGBB_KEY);
  const handleFileDrop = () => {
    // console.log("object");
    setIsImgDropped(true);
  };

  const handleAddProduct = (data, e) => {
    // e.preventDefault();
    const form = e.target;
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
      img: imgURL,
      name: data.name,
      color: selectedClothColor.name,
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
      inStock: false,
    };
    console.log(product);

    console.log(product);
    // fetch(`${import.meta.env.VITE_SERVER_URL}/products`, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //     authorization: `bearer ${localStorage.getItem("shop-adidas-token")}`,
    //   },
    //   body: JSON.stringify(product),
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
    //       navigate("/dashboard/myproducts");
    //     }
    //   });
  };
  return (
    <div className="h-fit ">
      <h3 className="text-3xl text-center">Add a product</h3>
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="px-10 mt-10 md:grid grid-cols-2 gap-8 "
      >
        <div className="col-span-1 h-fit">
          {!isImgDropped && !imgURL ? (
            <FileUploader
              handleChange={handleChange}
              onDrop={handleFileDrop}
              name="file"
              types={fileTypes}
              children={
                <section className="flex flex-col p-1 overflow-auto rounded-md border-dashed border-2 border-zinc-300 focus:outline-none mb-8">
                  <header className="flex flex-col items-center justify-center py-12 text-base transition duration-500 ease-in-out transform bg-inherit border border-dashed rounded-lg text-blueGray-500 focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
                    <p className="flex flex-wrap justify-center mb-3 text-base leading-7 text-blueGray-500">
                      <span>Drag and drop your</span>&nbsp;
                      <span>files anywhere or</span>
                    </p>
                    <button className="shadow-nm px-3 py-2 rounded-md active:shadow-nm-inset border border-zinc-300 transition-all">
                      Upload a file
                    </button>
                  </header>
                </section>
              }
            />
          ) : (
            <div className="text-center border-2 border-dashed rounded-md p-2 border-zinc-300 ">
              <h3 className="font-bold text-sm my-2">Your image file</h3>
              {imgLoading ? (
                <div className="continuous-7 my-10 mx-auto"></div>
              ) : (
                <>
                  <LazyLoadImage
                    effect="opacity"
                    src={imgURL}
                    className={"rounded-md mx-auto w-full max-w-md "}
                  ></LazyLoadImage>
                  <span className="text-zinc-500  underline underline-offset-2 block">
                    {imgFile.name}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
        <div className="col-span-1 flex-col space-y-5">
          {/* //! PRODUCT_NAME  */}
          <input
            type="text"
            maxLength={20}
            placeholder="product name"
            {...register("name", {
              required: "name is required",
            })}
            className=" focus:outline-none w-full bg-secondary-color p-3 border border-gray-300 text-sm rounded-md focus:shadow-nm-inset text-center "
            required
          />
          {/* //! CATEGORY  */}
          <div className="md:grid grid-cols-2 gap-x-2 space-y-5 md:space-y-0">
            <div className="col-span-1 flex items-center border border-gray-300 rounded-md pl-2  overflow- ">
              <span className="mr-3 font-">Category </span>
              <div className="w-full border-l border-l-gray-300">
                <DropDownMenu
                  selected={selectedCategory}
                  setSelected={setSelectedCategory}
                  array={categories}
                ></DropDownMenu>
              </div>
            </div>

            {/* //! PRODUCT_COLOR */}
            <div className="col-span-1 flex items-center border border-gray-300 rounded-md pl-2  overflow- ">
              <span className="mr-3 font-">Color </span>
              <div className="w-full border-l border-l-gray-300">
                <DropDownMenu
                  selected={selectedClothColor}
                  setSelected={setSelectedClothColor}
                  array={clothColors}
                ></DropDownMenu>
              </div>
            </div>
          </div>
          <div>
            {/* //! PRODUCT_PRICE  */}
            <input
              // ! add price validation
              maxLength={6}
              minLength={1}
              placeholder="product price"
              {...register("price", {
                required: true,
                pattern: /^[1-9]\d*$/,
              })}
              aria-invalid={errors.price ? "true" : "false"}
              className="focus:outline-none w-full bg-secondary-color p-3 border border-gray-300 text-sm rounded-md focus:shadow-nm-inset text-center max-h-min"
            />
            {/* {errors.price && <p role="alert">{errors.price?.message}</p>} */}
            {errors.price?.type === "pattern" && (
              <p role="alert" className="text-red-500 text-sm">
                Please enter a valid input
              </p>
            )}
            {errors.price?.type === "required" && (
              <p role="alert" className="text-red-500 text-sm">
                Price must be included
              </p>
            )}
          </div>

          {/* //! PRODUCT_DESCRIPTION  */}
          <textarea
            {...register("description")}
            rows="5"
            style={{ resize: "none" }}
            // name="description"
            className="w-full bg-secondary-color border border-zinc-300 focus:outline-none  focus:shadow-nm-inset rounded-md p-2 text-center"
            placeholder="Description about the product"
          ></textarea>
          {/* <button className="w-full p-3 mx-auto rounded-md  bg-blue-400 text-white shadow-md shadow-blue-300 active:text-black"> */}
          {isLoading ? (
            <Loader />
          ) : (
            <input
              type="submit"
              value="Submit"
              className="w-2/3 p-3 block mx-auto rounded-md  bg-blue-400 text-white shadow-md shadow-blue-300 active:text-black cursor-pointer "
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
