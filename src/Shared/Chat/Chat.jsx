import "./Chat.css";
import { Suspense, lazy, useContext, useEffect, useState } from "react";
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
import Loader from "../../components/Loader/Loader";
const ChatBox = lazy(() => import("../Chat/ChatBox"));

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
  };
  useEffect(() => {
    refetch();
    if (Object.keys(contactSeller).length !== 0) {
      setShowChat(true);
      setCurrentRoom(contactSeller);
      setIsSellerListVisible(false);
      // add seller to sellerList
      joinroom(contactSeller);
    } else {
      setCurrentRoom({});
      setIsSellerListVisible(true);
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
    <div>
      <div
        className={`chat-box
      fixed bottom-5 right-5
      md:top-auto   ${
        user
          ? "block"
          : location?.pathname.includes("/products/product")
          ? "block"
          : "hidden"
      }`}
        onClick={() => setShowChat(!showChat)}
      >
        {/* //! CHAT BUTTON */}
        <div
          className={`md:realtive h-12 w-12 select-none overflow-hidden rounded-full  bg-primary-color p-2 shadow-nm active:shadow-nm-inset`}
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
            <GrDown className="absolute translate-x-1/2 translate-y-1/2 transition-all active:scale-95"></GrDown>
          </Transition>
        </div>
      </div>
      <Suspense
        className
        fallback={
          <div className="flex h-screen w-full items-center">
            <Loader></Loader>
          </div>
        }
      >
        <div
          className="chat-box
        fixed top-0
        z-50 md:top-auto md:bottom-20 md:right-5"
        >
          <ChatBox
            showChat={showChat}
            setShowChat={setShowChat}
            user={user}
            isSellerListVisible={isSellerListVisible}
            setIsSellerListVisible={setIsSellerListVisible}
            sellerList={sellerList}
            joinroom={joinroom}
            currentRoom={currentRoom}
            setCurrentRoom={setCurrentRoom}
            messageList={messageList}
            setMessageList={setMessageList}
            sendMessage={sendMessage}
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            contactSeller={contactSeller}
            setContactSeller={setContactSeller}
            socket={socket}
          ></ChatBox>
        </div>
      </Suspense>
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
