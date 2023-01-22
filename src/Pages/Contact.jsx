import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import { HiBars3BottomLeft, HiOutlineXMark } from "react-icons/hi2";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Button from "../components/Button/Button";

const Contact = () => {
  const [active, setActive] = useState(true);
  console.log(active);
  return (
    <div className="h-screen">
      <PhotoProvider>
        <PhotoView
          width={400}
          height={400}
          render={({ scale, attrs }) => {
           

            return (
              <div {...attrs}>
                <div
                  style={{
                    
                  }}
                >
                  <p className="bg-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Delectus laborum amet adipisci dolore esse modi eos
                    repudiandae, consequatur voluptatem obcaecati perferendis
                    neque quam dolorum molestiae nulla ad. Excepturi dolor
                    dolorum delectus laudantium tenetur magnam? Dicta quisquam
                    totam itaque possimus voluptatem? Deleniti quisquam dolore
                    delectus quos accusamus, voluptas aut qui omnis.
                  </p>
                </div>
              </div>
            );
          }}
        >
          <button primary>Click</button>
        </PhotoView>
      </PhotoProvider>
    </div>
  );
};

export default Contact;
