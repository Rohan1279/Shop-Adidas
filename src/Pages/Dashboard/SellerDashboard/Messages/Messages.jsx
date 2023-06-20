import { io } from "socket.io-client";
import { Context } from "../../../../contexts/ContextProvider";
import { useContext, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { GrEmoji, GrSend } from "react-icons/gr";
import { IoIosAttach } from "react-icons/io";
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
export default function Messages() {
  const socket = io.connect("http://localhost:5001");
  const { authInfo } = useContext(Context);
  const { user, isBuyer, isSeller, userRole } = authInfo;
  const seller_room = user?.email; //replace with seller_id
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [messages, setMessages] = useState("");
  console.log(messageList);
  useEffect(() => {
    if (user?.email) {
      fetch(
        `${import.meta.env.VITE_SERVER_URL}/seller/messages?room=${user?.email}`
      )
        .then((res) => res.json())
        .then((data) => setMessageList(data));
    }

    socket.on("chat_history", (chats) => {
      console.log(chats[0]);
      setMessageList(chats);
    });
  }, [user]);
  const joinroom = (room, buyer) => {
    if (user?.email && room) {
      setCurrentRoom(room);
      socket.emit("join_room", { room, buyer });
    }
  };
  const sendMessage = async () => {
    // if (currentMessage !== "") {
    //   const messageData = {
    //     author: user?.email,
    //     time: formatAMPM(new Date()),
    //     message: currentMessage,
    //   };
    //   const updatedMessageList = {
    //     ...messageList,
    //     messages: [...messageList.messages, messageData],
    //   };
    //   setMessageList(updatedMessageList);
    //   await socket.emit("send_message", updatedMessageList);
    //   console.log(updatedMessageList);
    //   setCurrentMessage("");
    // }
  };

  return (
    <div className="min-h-screen py-10 px-5">
      {messageList?.map((messageContent) => (
        <div key={messageContent?._id} className="">
          <button
            onClick={() =>
              joinroom(messageContent?.room, messageContent?.buyer)
            }
            className="my-3 w-60 bg-red-300 px-4 py-3"
          >
            {messageContent?.buyer}
          </button>
        </div>
      ))}
      {/* //! CHAT BOX */}
      <ScrollToBottom className="mx-auto mb-auto  h-screen w-full  overflow-scroll bg-blue-400 pb-3">
        {messageList[0]?.messages?.map((messageContent, idx) => (
          <div key={idx} className={`px-3`}>
            <div
              className={`w-fit ${
                user?.email === messageContent?.author ? "ml-auto" : "  "
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
                  // src={seller?.seller_default_image}
                  alt=""
                  className={`h-4 w-4 rounded-full bg-yellow-200 ${
                    user?.email !== messageContent?.author ? "block" : "hidden"
                  }`}
                />
                <p
                  className={`mt-2  w-fit max-w-xs   rounded-3xl  px-3 py-1 text-sm font-thin tracking-wider text-gray-500 ${
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
            <button onClick={sendMessage} className="absolute right-6">
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
  );
}
