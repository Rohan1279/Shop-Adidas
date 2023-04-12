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
      {/* <img src="https://drive.google.com/uc?id=1cV8OQJ3dO81sC35nPqid-juwPsemMGyq&" alt="" /> */}
      <LazyLoadImage effect="blur" src="https://drive.google.com/uc?id=1cV8OQJ3dO81sC35nPqid-juwPsemMGyq" className="w-1/5"></LazyLoadImage>
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
