import { async } from "@firebase/util";
import axios from "axios";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loader from "../../../components/Loader/Loader";
import { useFieldArray, useForm } from "react-hook-form";

const Dashboard = () => {
  const [file, setFile] = useState("");
  const { register, handleSubmit, control, watch } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: "fieldArray",
  });
  const onSubmit = (data) => console.log(data);
  const watchFieldArray = watch("fieldArray");
  const controlledFields = fields.map((field, index) => {
    return {
      ...watchFieldArray[index],
    };
  });

  console.log(controlledFields);

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
    <div className="h-screen pt-20">
      <style>
        {`             
          *, *::before, *::after {
            box-sizing: border-box;
          }
          
          @keyframes rotate {
            100% {
              transform: rotate(1turn);
            }
          }        
          .conic {
            position: relative;
            z-index: 0;
            width: 400px;
            height: 300px;
            margin: 20px;
            border-radius: 10px;
            overflow: hidden;
            // padding: 2rem;
            background-color: #1a232a;
            


            
            &::before {
              content: '';
              position: absolute;
              z-index: -2;
              left: -50%;
              top: -50%;
              width: 200%;
              height: 200%;
              background-color: #1a232a;
              background-repeat: no-repeat;
              background-position: 0 0;
              background-image: conic-gradient(transparent, rgba(168, 239, 255, 1), transparent 30%);
              animation: rotate 4s linear infinite;
            }
            
            &::after {
              content: '';
              position: absolute;
              z-index: -1;
              left: 6px;
              top: 6px;
              width: calc(100% - 12px);
              height: calc(100% - 12px);
              background: #000;
              border-radius: 5px;
            }
          }
          
          .conic-demo::after {
            animation: opacityChange 5s infinite linear;
          }
          
          @keyframes opacityChange {
            50% {
              opacity:.5;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
      <h3 className="text-center text-3xl ">Dashboard Page</h3>
      {/* <div class="conic bg-blue-400">
        <div className="h-10 w-10 bg-red-500"></div>
      </div> */}
      {/* <div class="conic conic-demo"></div> */}
    </div>
  );
};

export default Dashboard;
