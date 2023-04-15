import { async } from "@firebase/util";
import axios from "axios";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loader from "../../../components/Loader/Loader";

const Dashboard = () => {
  const [file, setFile] = useState("");
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    // console.log(e.target.files[0]);
    // console.log("formData before append->", formData);
    // console.log(formData);
    // fetch(`${import.meta.env.VITE_SERVER_URL}/upload`, {
    //   method: "POST",
    //   body: formData,
    // });
  };
  const handleUpload = async () => {
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData);
    // fetch(`${import.meta.env.VITE_SERVER_URL}/upload`, {
    //   method: "POST",
    //   // 👇 Set headers manually for single file upload
    //   headers: {
    //     "content-type": file.type,
    //     "content-length": `${file.size}`, // 👈 Headers need to be a string
    //   },
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));
    // try {
    //   let response = await axios.post(
    //     `${import.meta.env.VITE_SERVER_URL}/upload`,
    //     formData
    //   );
    //   console.log(response);
    // } catch (e) {
    //   console.log("error");
    // }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/upload`,
        {
          method: "POST",
          body: formData,
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        }
      );
      console.log(await response.json());
    } catch (e) {
      console.log("error");
    }
  };
  return (
    <div className="h-screen">
      <h3 className="text-3xl text-center ">Dashboard Page</h3>
      <span className="inline-flex items-center gap-1.5 py-1.5 pl-3 pr-2 rounded-full text-xs font-medium bg-blue-200 text-blue-800">
        Badge
        <button
          type="button"
          className="flex-shrink-0 h-4 w-4 inline-flex items-center justify-center rounded-full text-blue-600 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-200 focus:text-blue-500"
        >
          <span className="sr-only">Remove badge</span>
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </span>
      <img
        src="https://img.icons8.com/color/256/chat--v3.png"
        alt=""
        className="w-28 h-28"
      />
      {/* <img src="https://drive.google.com/uc?id=1cV8OQJ3dO81sC35nPqid-juwPsemMGyq&" alt="" /> */}
      <LazyLoadImage
        effect="blur"
        src="https://drive.google.com/uc?id=1cV8OQJ3dO81sC35nPqid-juwPsemMGyq"
        className="w-1/5"
      ></LazyLoadImage>
      <div className="ml-28 bg-red-200">
        <input
          onChange={handleChange}
          id="fileupload"
          type="file"
          name="image"
        />
        <button
          onClick={handleUpload}
          id="upload-button"
          className="w-36 bg-red-400"
        >
          {" "}
          Upload{" "}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
