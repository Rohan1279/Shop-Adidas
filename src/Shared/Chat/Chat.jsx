import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../contexts/ContextProvider";
import { GrEmoji, GrAttachment } from "react-icons/gr";
import { IoIosAttach } from "react-icons/io";

// const socket = io.connect("http://localhost:5001");
function Chat({ socket }) {
  const { authInfo } = useContext(Context);
  const { user, isBuyer, isSeller, userRole } = authInfo;
  const [showChat, setShowChat] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(socket);
  // console.log(user);
  const product = location?.state;
  const seller = {
    seller: product?.seller,
    seller_default_image: product?.seller_default_image,
    seller_email: product?.seller_email,
    seller_id: product?.seller_id,
    seller_name: product?.seller_name,
    seller_phone: product?.seller_phone,
  };
  const seller_room = product?.seller_email; //replace with seller_id
  console.log(seller);

  const joinroom = () => {
    setShowChat((prev) => !prev);
    console.log("here");
    if (user?.uid && seller_room) {
      socket.emit("join_room", seller_room);
      // setShowChat(true);
    }
  };
  return (
    <div
      className={`fixed bottom-8 right-8  ${
        user
          ? "block"
          : location?.pathname.includes("/products/product")
          ? "block"
          : "hidden"
      }`}
    >
      <div className="relative ">
        <div
          onClick={() => joinroom()}
          className={`rounded-full bg-primary-color p-2 shadow-nm active:shadow-nm-inset `}
        >
          <img
            src="https://img.icons8.com/?size=512&id=3OmLPsSUeBdX&format=png"
            alt=""
            className="h-12 w-12 "
          />
        </div>
        {/* //! CHAT BOX */}
        <div
          className={`absolute bottom-20 right-0 h-[32rem]  w-96 rounded-xl   bg-primary-color  shadow-nm ${
            !showChat && "hidden"
          } overflow-hidden `}
        >
          {!user && !user?.uid ? (
            <button
              onClick={() => navigate("/login")}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md px-3 py-2 shadow-nm active:shadow-nm-inset"
            >
              Login/Register
            </button>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              className="h-full "
            >
              {" "}
              <div className="flex w-full items-center justify-start gap-x-2  bg-primary-color pl-2 pt-2 pb-2 shadow-md">
                <img
                  src={seller?.seller_default_image}
                  alt=""
                  className="h-10 w-10 rounded-full bg-yellow-200"
                />
                <div className="">
                  <p className="text-sm">{seller?.seller_name}</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Active status
                  </p>
                </div>
              </div>
              {/* <div className="mx-auto mb-3 w-[95%] rounded-full border  border-gray-300 py-2 px-2 text-sm  focus:shadow-nm-inset disabled:placeholder:text-gray-300"> */}
              <div className="mx-auto mb-3 w-[95%] rounded-full border border-gray-300 bg-secondary-color ">
                <div className="flex items-center justify-center ">
                  <input
                    type={"text"}
                    placeholder={"type a message"}
                    // className="mr-auto w-2/3 max-w-full bg-red-200 "
                    className="relative w-full rounded-full bg-secondary-color p-3 text-center  text-sm focus:shadow-nm-inset focus:outline-none disabled:placeholder:text-gray-300 "
                  />
                  <div className="absolute right-5">
                    <button className=" h-7 w-7 rounded-full shadow-nm active:shadow-nm-inset">
                      <GrEmoji className="mx-auto text-lg text-zinc-500"></GrEmoji>
                    </button>
                    <button className=" ml-2 h-7 w-7 rounded-full shadow-nm active:shadow-nm-inset">
                      <IoIosAttach className="mx-auto text-lg text-zinc-500"></IoIosAttach>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;

// border: 5px solid;
// margin: auto;
// width: 50%;
// padding: 10px;
