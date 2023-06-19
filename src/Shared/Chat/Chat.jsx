import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../contexts/ContextProvider";
import { GrEmoji, GrAttachment, GrSend, GrDown } from "react-icons/gr";
import { IoIosAttach } from "react-icons/io";
import ScrollToBottom from "react-scroll-to-bottom";
import { Transition } from "@headlessui/react";

// const socket = io.connect("http://localhost:5001");
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
function Chat({ socket }) {
  const { authInfo } = useContext(Context);
  const { user, isBuyer, isSeller, userRole } = authInfo;
  const location = useLocation();
  const navigate = useNavigate();
  // ! SOCKET.IO
  const [showChat, setShowChat] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    socket.on("chat_history", (chats) => {
      console.log(chats);
      setMessageList(chats);
    });
    socket.on("receive_message", (data) => {
      // console.log(data);
      setMessageList((list) => [...list, data]);
      console.log(data);
    });
    return () => socket.removeListener("receive_message");
  }, [socket, currentMessage]);

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
  // console.log(user);

  const joinroom = () => {
    setShowChat((prev) => !prev);
    if (user?.uid && seller_room) {
      socket.emit("join_room", seller_room);
      // setShowChat(true);
    }
  };
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: seller_room,
        author: user?.email,
        message: currentMessage,
        time: formatAMPM(new Date()),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  // messageList?.map((messageContent) => console.log(messageContent?.message));
  // console.log(messageList);

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
          className={`realtive h-12 w-12 select-none overflow-hidden rounded-full  bg-primary-color p-2 shadow-nm active:shadow-nm-inset`}
        >
          <Transition
            show={!showChat}
            enter="transition-all duration-300 "
            enterFrom="-translate-y-5"
            enterTo="translate-y-0 "
            leave="transition-all duration-300"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-10 "
          >
            <img
              src="https://img.icons8.com/?size=512&id=3OmLPsSUeBdX&format=png"
              alt=""
              className="absolute w-8"
            />
          </Transition>
          {/* <GrDown className="mx-auto mt-2"></GrDown> */}
          <Transition
            show={showChat}
            enter="transition-all duration-300"
            enterFrom="translate-y-10"
            enterTo="translate-y-0"
            leave="transition-all duration-300"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-10"
          >
            <GrDown className="absolute translate-x-1/2 translate-y-1/2"></GrDown>
          </Transition>
        </div>
        {/* //! CHAT BOX */}
        <Transition
          show={showChat}
          enter="transition-all duration-300"
          enterFrom="translate-y-10 opacity-0"
          enterTo="translate-y-0  opacity-100"
          leave="transition-all duration-300 "
          leaveFrom="translate-y-10  opacity-100"
          leaveTo="translate-y-5  opacity-0"
        >
          <div
            className={`absolute bottom-20 right-0 h-[32rem] w-96 overflow-hidden   rounded-xl  bg-primary-color shadow-nm `}
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
                <div className="flex w-full items-center justify-start gap-x-2  bg-primary-color pl-2 pt-2 pb-2 shadow-sm">
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
                {/* //! MESSAGE */}
                <ScrollToBottom className="mx-auto mb-auto  w-full  overflow-scroll pb-3 ">
                  {messageList?.map((messageContent, idx) => (
                    <div key={idx} className={`px-5`}>
                      <div
                        className={`w-fit ${
                          user?.email === messageContent?.author
                            ? "ml-auto"
                            : "  "
                        }`}
                      >
                        <p
                          className={`mt-2  w-fit max-w-xs break-all  rounded-full  px-3 py-1 text-sm font-thin tracking-wider text-gray-500 ${
                            user?.email === messageContent?.author
                              ? "ml-auto bg-secondary-color"
                              : ""
                          } border border-gray-300`}
                        >
                          {messageContent?.message}
                        </p>
                        <div className=" text-xs  text-gray-400">
                          <p
                            className={`${
                              user?.email === messageContent?.author
                                ? "pr-2 text-right"
                                : "pl-2"
                            }`}
                          >
                            {messageContent?.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollToBottom>
                {/* <div className="mx-auto mb-3 w-[95%] rounded-full border  border-gray-300 py-2 px-2 text-sm  focus:shadow-nm-inset disabled:placeholder:text-gray-300"> */}
                <div className="sticky bottom-4 left-2 mx-auto mb-3 w-[95%] rounded-full border border-gray-300 bg-secondary-color ">
                  <div className="flex items-center justify-center ">
                    <input
                      type={"text"}
                      placeholder={"type a message"}
                      value={currentMessage}
                      onChange={(e) => {
                        setCurrentMessage(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        e.key === "Enter" && sendMessage();
                        // e.target.reset();
                      }}
                      className="relative w-full rounded-full bg-secondary-color p-3 text-center  text-sm focus:shadow-nm-inset focus:outline-none disabled:placeholder:text-gray-300 "
                    />
                    {currentMessage ? (
                      <button
                        onClick={sendMessage}
                        className="absolute right-6"
                      >
                        <GrSend></GrSend>
                      </button>
                    ) : (
                      <div className="absolute right-5">
                        <button className=" h-7 w-7 rounded-full shadow-nm active:shadow-nm-inset">
                          <GrEmoji className="mx-auto text-lg text-zinc-500"></GrEmoji>
                        </button>
                        <button className=" ml-2 h-7 w-7 rounded-full shadow-nm active:shadow-nm-inset">
                          <IoIosAttach className="mx-auto text-lg text-zinc-500"></IoIosAttach>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Transition>
      </div>
    </div>
  );
}

export default Chat;

// border: 5px solid;
// margin: auto;
// width: 50%;
// padding: 10px;
