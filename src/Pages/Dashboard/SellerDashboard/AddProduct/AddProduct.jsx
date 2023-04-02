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
  const [imgFile, setImgFile] = useState(null);
  const [isImgDropped, setIsImgDropped] = useState(false);
  const fileTypes = ["JPG", "PNG", "GIF"];

  const handleChange = (imgFile) => {
    setImgFile(imgFile);
    setIsImgDropped(true);
  };

  // console.log(import.meta.env.VITE_IMGBB_KEY);
  const handleFileDrop = () => {
    // console.log("object");
    setIsImgDropped(true);
    getImageUrl(imgFile).then((imgData) => {
      console.log(imgData);
    });
  };

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
    // console.log(product);

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
        className="px-10 mt-10 grid grid-cols-2 gap-8"
      >
        {!isImgDropped ? (
          <FileUploader
            handleChange={handleChange}
            onDrop={handleFileDrop}
            name="file"
            types={fileTypes}
            children={
              <section className="flex flex-col w-full h-full p-1 overflow-auto rounded-md border-dashed border-2 border-zinc-300">
                <header className="flex flex-col items-center justify-center py-12 text-base transition duration-500 ease-in-out transform bg-inherit border border-dashed rounded-lg text-blueGray-500 focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2">
                  <p className="flex flex-wrap justify-center mb-3 text-base leading-7 text-blueGray-500">
                    <span>Drag and drop your</span>&nbsp;
                    <span>files anywhere or</span>
                  </p>
                  <button className="w-auto px-2 py-1 my-2 mr-2 transition duration-500 ease-in-out transform border rounded-md text-blueGray-500 hover:text-blueGray-600 text-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blueGray-100">
                    Upload a file
                  </button>

                  {/* <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className="mx-auto"
          required
        /> */}
                </header>
              </section>
            }
          />
        ) : (
          <div className="text-center border border-dashed rounded-md p-6">
            <h3 className="font-bold text-lg">Your image file</h3>
            <span className="text-zinc-300">{imgFile.name}</span>
          </div>
        )}
        <div className="col-span-1 flex-col space-y-5">
          {/* //! PRODUCT_NAME  */}
          {/* <div className="flex items-center border border-gray-300 rounded-full overflow-hidden"> */}
          <input
            // onBlur={(e) => setCreatedUserEmail(e?.target?.value)}
            type="text"
            maxLength={20}
            placeholder="product name"
            {...register("name", {
              required: "name is required",
            })}
            className=" focus:outline-none w-full bg-secondary-color p-3 border border-gray-300 text-lg rounded-md focus:shadow-nm-inset text-center "
            required
          />
          {/* </div> */}
          {/* //! CATEGORY  */}
          <DropDownMenu
            selected={selectedCategory}
            setSelected={setSelectedCategory}
            array={categories}
          ></DropDownMenu>

          <input
            // name="picture"
            {...register("img")}
            type="text"
            // defaultValue={product?.resale_price}
            placeholder="provide a photo URL of your product"
            className="text-center w-full bg-secondary-color border border-zinc-300 focus:outline-none"
            // required
          />
          <textarea
            {...register("description")}
            // name="description"
            className="w-full bg-secondary-color border border-zinc-300 focus:outline-none rounded-md p-2 text-center"
            placeholder="Description about the product"
          ></textarea>
          <button className="w-full border border-zinc-300 rounded-md active:shadow-nm-inset">
            {isLoading ? <Loader /> : <input type="submit" value="Submit" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
