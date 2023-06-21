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
  const [buyersList, setBuyersList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [messages, setMessages] = useState("");
  console.log(currentRoom);
  useEffect(() => {
    if (user?.email) {
      fetch(
        `${import.meta.env.VITE_SERVER_URL}/seller/messages?room=${user?.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          const extractedData = data.map((obj) => {
            return {
              _id: obj._id,
              buyer: obj.buyer,
              room: obj.room,
              buyer_image: obj.buyer_image,
            };
          });
          setBuyersList(extractedData);
          // console.log(extractedData);
        });
    }

    socket.on("chat_history", (chats) => {
      // console.log(chats[0]);
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
  // console.log(user);
  return (
    <div className="flex h-screen gap-x-10 bg-secondary-color px-20 pb-32 pt-8">
      <div className="flex w-96 flex-col overflow-scroll rounded-lg shadow-nm">
        {/* <button className=" w-60 bg-red-300 px-4 py-4 drop-shadow-sm">Search</button> */}
        {/* //! SEARCH BOX */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" flex h-14 items-center bg-primary-color px-2 shadow-sm"
        >
          {/* <span
            className={`&& "  "
                    } mr-3 min-w-max text-center text-xs font-medium uppercase tracking-wider
                  text-gray-500`}
          >
            Search
          </span> */}

          <input
            onChange={(e) => {
              // setSearch(e.target.value);
            }}
            type={"text"}
            placeholder={"search a product"}
            className=" w-full rounded-full border border-zinc-300 bg-secondary-color p-2 text-center text-sm focus:shadow-nm-inset focus:outline-none disabled:placeholder:text-gray-300 "
            // disabled={products?.length === 0}
          />
        </form>
        {buyersList?.map((content) => (
          <div
            key={content?._id}
            onClick={() =>
              joinroom(content?.room, content?.buyer)
            }
            className="w-full cursor-pointer border border-zinc-300 px-4 py-3 hover:brightness-90"
          >
            <div className="flex items-center justify-start gap-x-2">
              <img
                src={
                  content?.buyer_image ||
                  "https://cdn0.iconfinder.com/data/icons/user-pictures/100/unknown2-256.png"
                }
                alt=""
                className="h-8 w-8 rounded-full "
              />
              <p className=" text-sm font-thin tracking-wider text-gray-500">
                {content?.buyer}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full overflow-hidden rounded-lg bg-secondary-color shadow-nm ">
        {/* //! CHAT BOX */}
        <div className="flex w-full items-center justify-start gap-x-2  bg-sky-300/70 p-2 pl-2  shadow-sm ">
          <img
            src={
              user?.displayURL ||
              "https://img.icons8.com/?size=512&id=13042&format=png"
            } // TODO: add user displayURL
            alt=""
            className="h-10 w-10 rounded-full bg-yellow-200"
          />
          <div className="">
            <p className="text-sm">{user?.email}</p>
            {/* // TODO: add user displayName*/}

            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Active status
            </p>
          </div>
        </div>
        <ScrollToBottom className=" mx-auto mb-auto  w-full  overflow-scroll  pb-3">
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
                    src={
                      messageContent?.buyer_image ||
                      "https://cdn0.iconfinder.com/data/icons/user-pictures/100/unknown2-256.png"
                    }
                    alt=""
                    className={`h-4 w-4 rounded-full bg-yellow-200 ${
                      user?.email !== messageContent?.author
                        ? "block"
                        : "hidden"
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
    </div>
  );
}
