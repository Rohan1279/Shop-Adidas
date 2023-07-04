import "./Chat.css";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../contexts/ContextProvider";
import {
  GrEmoji,
  GrFormNext,
  GrSend,
  GrDown,
  GrFormPrevious,
} from "react-icons/gr";
import { TbCloudFog, TbMailOff } from "react-icons/tb";
import { IoIosAttach } from "react-icons/io";
import ScrollToBottom from "react-scroll-to-bottom";
import { Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";

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

function Chat({ socket, contactSeller, setContactSeller }) {
  const { authInfo } = useContext(Context);
  const { user, isBuyer, isSeller, userRole } = authInfo;
  const location = useLocation();
  const navigate = useNavigate();
  const product = location?.state;

  const seller = {
    seller: product?.seller,
    seller_default_image: product?.seller_default_image,
    seller_email: product?.seller_email, //replace with seller_id
    seller_id: product?.seller_id,
    seller_name: product?.seller_name,
    seller_phone: product?.seller_phone,
  };
  // ! SOCKET.IO
  const [showChat, setShowChat] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  let [messageList, setMessageList] = useState({});
  const [currentRoom, setCurrentRoom] = useState({});
  const [isSellerListVisible, setIsSellerListVisible] = useState(true);

  window.addEventListener("keydown", function (event) {
    if (showChat && event?.key === "Escape") {
      setShowChat(!showChat);
    }
  });
  window.addEventListener("mousedown", (e) => {
    if (e.target.closest(".chat-box")) {
      // when clicked inside
      return;
    } else {
      // when clicked outside
      setShowChat(false);
    }
  });
  const { data: sellerList = [], refetch } = useQuery({
    queryKey: ["sellerList", user?.email],
    queryFn: () => {
      if (user?.email) {
        return fetch(
          `${import.meta.env.VITE_SERVER_URL}/buyer/messages?buyer=${
            user?.email
          }`
        ).then((res) => res.json());
      } else {
        return []; // Add a default return value when user?.email is falsy
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: "always",
  });

  const handleContactSeller = () => {
    // console.log(object);
    console.log(contactSeller);
  };

  //! JOIN ROOM
  const joinroom = (seller) => {
    // if (location?.pathname.includes("/products/product") && showChat) {
    //   console.log(messageList);8
    // }

    console.log(seller);
    setIsSellerListVisible(false);
    if (user.email) {
      if (seller?.room) {
        setCurrentRoom(seller);
        // setCurrentBuyer({});
        socket.emit("join_room/buyer", { room: seller?.room });
      } else {
        const room = seller?.seller_email + "+" + user?.email;
        socket.emit("join_room/buyer", {
          room: room,
        });
      }
    }
  };
  useEffect(() => {
    if (Object.keys(contactSeller).length !== 0) {
      setShowChat(true);
      setCurrentRoom(contactSeller);
      setIsSellerListVisible(false);
      // add seller to sellerList
      joinroom(contactSeller);
    }
  }, [contactSeller]);

  useEffect(() => {
    // console.log(messageList);
    // if (!user?.email) {
    //   setMessageList([]);
    // }
    // console.log(currentRoom);
    socket.on("chat_history/buyer", (chats) => {
      // console.log("chat_history", chats.length);
      setMessageList(chats[0]);
    });
    socket.on("receive_message", (data) => {
      // console.log(data);
      setMessageList(data);
      console.log(data);
    });
    //* sets messageList for new user
    if (
      !messageList &&
      user?.email
      //  && location?.pathname.includes("/products/product")
    ) {
      console.log("no chat history");
      setMessageList((prevMessageList) => ({
        ...prevMessageList,
        buyer: user?.email,
        buyer_image:
          user?.photoURL ||
          "https://img.icons8.com/?size=512&id=13042&format=png",
        room: seller?.seller_email + "+" + user?.email,
        seller: seller?.seller_email,
        seller_image: seller?.seller_default_image,
        messages: [],
      }));
    }

    // return () => socket.removeListener("receive_message");
  }, [location, showChat, product, messageList]);

  // console.log(user);
  //! SEND MESSAGE
  const sendMessage = async () => {
    console.log(messageList);
    if (currentMessage !== "") {
      const messageData = {
        author: user?.email,
        time: formatAMPM(new Date()),
        message: currentMessage,
      };
      const updatedMessageList = {
        ...messageList,
        messages: [...messageList.messages, messageData],
      };
      setMessageList(updatedMessageList);
      await socket.emit("send_message", updatedMessageList);
      console.log(updatedMessageList);

      // await socket.emit("send_message", messageList);
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
      <div className="chat-box relative">
        {/* //! CHAT BUTTON */}
        <div
          onClick={() => setShowChat((prev) => !prev)}
          className={`chat-button realtive h-12 w-12 select-none overflow-hidden rounded-full  bg-primary-color p-2 shadow-nm active:shadow-nm-inset`}
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
            className={`absolute 
            bottom-20 -right-1/2 h-[26rem] w-96    
            overflow-hidden  rounded-xl
             bg-primary-color   shadow-nm  md:bottom-20 md:-right-0 `}
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
                {/* //! SELLER INFO */}
                <div
                  onClick={() => {
                    setIsSellerListVisible(true);
                    setCurrentRoom({});
                  }}
                  className={`flex w-full cursor-pointer items-center justify-start gap-x-2  bg-primary-color pl-2 pt-2 pb-2 shadow-sm
                 ${isSellerListVisible && "hidden"}
                `}
                >
                  <div className=" flex  flex-row items-center justify-between">
                    <GrFormPrevious
                      className={`ml-3 mr-1 text-lg`}
                    ></GrFormPrevious>
                    <img
                      src={currentRoom?.seller_image}
                      alt=""
                      className="h-10 w-10 rounded-full bg-yellow-200"
                    />
                  </div>

                  <div className="">
                    <p className="text-sm">{currentRoom?.seller}</p>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Active status
                    </p>
                  </div>
                </div>
                {/* //! SELLER LIST */}
                <div
                  className={` bg-primary-color  ${
                    !isSellerListVisible && "hidden"
                  } `}
                >
                  <div className="mx-4">
                    <p className="py-2 text-center text-lg  font-medium tracking-wide  text-gray-600  shadow-sm">
                      Messages
                    </p>
                  </div>
                  {sellerList?.length !== 0 ? (
                    sellerList?.map((seller, idx) => (
                      <div
                        key={idx}
                        onClick={() => joinroom(seller)}
                        className={`w-full cursor-pointer px-4 py-3  hover:bg-zinc-300
                        
                        ${!isSellerListVisible && "hidden"}
                        ${
                          Object.keys(currentRoom).length !== 0
                            ? currentRoom?.room === seller?.room &&
                              "bg-zinc-300"
                            : ""
                        } 
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center justify-center gap-x-2">
                            <img
                              src={
                                seller?.seller_image ||
                                "https://cdn0.iconfinder.com/data/icons/user-pictures/100/unknown2-256.png"
                              }
                              alt=""
                              className="h-10 w-10 rounded-full bg-yellow-200"
                            />
                            <div>
                              <p className=" text-sm font-thin tracking-wider text-gray-600">
                                {seller?.seller}
                              </p>
                              <div className="flex text-xs font-thin tracking-wider text-gray-400">
                                <p className="">
                                  {seller?.messages.author === user?.email ? (
                                    <span className="mr-1">You:</span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                                <p className="w-24 truncate ">
                                  {seller?.messages?.message}
                                </p>
                              </div>
                            </div>
                          </div>
                          <GrFormNext className="text-lg"></GrFormNext>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      onClick={() => navigate("/login")}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-3"
                    >
                      <TbMailOff className="mx-auto mb-4 text-4xl text-zinc-600"></TbMailOff>
                      <p className="text-center text-sm  font-medium tracking-wide  text-gray-700">
                        You have no messages
                      </p>
                    </div>
                  )}
                </div>
                {/* //! MESSAGE */}
                {/* <Transition
                  show={!isSellerListVisible}
                  enter="transition-opacity duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >  
                </Transition> */}
                <ScrollToBottom
                  className={`${
                    isSellerListVisible && "hidden"
                  } mx-auto mb-auto  w-full  translate-x-0 transform overflow-scroll pb-3 transition-transform duration-500 ease-in-out 
                 
                  `}
                >
                  {messageList?.messages?.map((messageContent, idx) => (
                    <div
                      key={idx}
                      className={`px-3
                    ${!isSellerListVisible && "animate-left"}
                    `}
                    >
                      <div
                        className={`w-fit ${
                          user?.email === messageContent?.author
                            ? "ml-auto"
                            : "  "
                        }`}
                      >
                        <div
                          className={` ${
                            user?.email !== messageContent?.author
                              ? "flex items-end justify-center"
                              : ""
                          }`}
                        >
                          <img
                            src={currentRoom?.seller_image}
                            alt=""
                            className={`h-4 w-4 rounded-full bg-yellow-200 ${
                              user?.email !== messageContent?.author
                                ? "block"
                                : "hidden"
                            }`}
                          />
                          <p
                            className={`mt-2 w-fit max-w-xs break-all   rounded-3xl  px-3 py-1 text-sm font-thin tracking-wider text-gray-500 ${
                              user?.email === messageContent?.author
                                ? "ml-auto bg-secondary-color"
                                : ""
                            } border border-gray-300`}
                          >
                            {messageContent?.message}
                          </p>
                        </div>
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
                <div
                  className={`sticky bottom-4 left-2 mx-auto mb-3 w-[95%] rounded-full border border-gray-300 bg-secondary-color 
                ${Object.keys(currentRoom).length === 0 && "hidden"}
                `}
                >
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

{
  /* 
    
    

  _id: "6490b69e27f9731331206b70",
  buyer: "bipil14415@meidecn.com",
  buyer_image : "",
  room: "adidas@adidas.com",
  seller_image : "",
  messages: [
     {
      author: "bipil14415@meidecn.com",
      time: "2:12 AM",
      messgae : "asdasdsad"
     },
     {
      author: "bipil14415@meidecn.com",
      time: "2:12 AM",
      messgae : "asdasdsad"
     },
     {
      author: "bipil14415@meidecn.com",
      time: "2:12 AM",
      messgae : "asdasdsad"
     },
  ],

    
    */
}
