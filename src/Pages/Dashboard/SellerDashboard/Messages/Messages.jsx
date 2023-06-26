import { io } from "socket.io-client";
import { Context } from "../../../../contexts/ContextProvider";
import { useContext, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { GrEmoji, GrSend } from "react-icons/gr";
import { IoIosAttach } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
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
  const [messageList, setMessageList] = useState({});
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [messages, setMessages] = useState("");

  const { data: buyersList = [], isInitialLoading } = useQuery({
    queryKey: ["buyersList", user?.email],
    queryFn: () => {
      if (user?.email) {
        return fetch(
          `${import.meta.env.VITE_SERVER_URL}/seller/messages?seller=${
            user?.email
          }`
        )
          .then((res) => res.json())
          .then((data) => {
            // console.log(buyersList);
            // setCurrentRoom(buyersList[0]?.room);
            // socket.emit("join_room", { room: buyersList[0]?.room });
            return data;
          });
      }
    },
  });

  useEffect(() => {
    // console.log(buyersList);
    
    // if (user?.email) {
    //   fetch(
    //     `${import.meta.env.VITE_SERVER_URL}/seller/messages?buyers=${user?.email}`
    //   )
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setBuyersList(data);
    //       console.log(data);
    //     });
    // }
    // socket.on("chat_history", (chats) => {
    //   console.log(chats[0]);
    //   setMessageList(chats[0]);
    // });
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList(data);
      // console.log(data);
    });
    // return () => socket.removeListener("join_room");
  }, [socket]);

  const joinroom = (buyer) => {
    if (user?.email && buyer?.room) {
      setCurrentRoom(buyer);
      console.log(buyer?.room);
      socket.emit("join_room/seller", { room: buyer?.room });
      socket.on("chat_history/seller", (chats) => {
        // console.log(chats[0]);
        setMessageList(chats[0]);
      });
    }
  };
  const sendMessage = async () => {
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
      setCurrentMessage("");
    }
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
        {buyersList?.map((buyer) => (
          <div
            key={buyer?._id}
            onClick={() => joinroom(buyer)}
            className="w-full cursor-pointer border border-zinc-300 px-4 py-3 hover:brightness-90"
          >
            <div className="flex items-center justify-start gap-x-2">
              <img
                src={
                  buyer?.buyer_image ||
                  "https://cdn0.iconfinder.com/data/icons/user-pictures/100/unknown2-256.png"
                }
                alt=""
                className="h-8 w-8 rounded-full "
              />
              <p className=" text-sm font-thin tracking-wider text-gray-500">
                {buyer?.buyer}
              </p>
            </div>
          </div>
        ))}
      </div>
      <ScrollToBottom className="relative w-full overflow-hidden rounded-lg py-16 shadow-nm">
        {/* //! CHAT BOX */}
        <div className="absolute top-0 flex w-full items-center justify-start gap-x-2  bg-sky-300 p-2 pl-2 shadow-sm">
          <img
            src={
              currentRoom?.buyer_image ||
              "https://img.icons8.com/?size=512&id=13042&format=png"
            } // TODO: add buyer displayURL
            alt=""
            className="h-10 w-10 rounded-full bg-yellow-200"
          />
          <div className="">
            <p className="text-sm">{currentRoom?.buyer}</p>
            {/* // TODO: add buyer displayName*/}

            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Active status
            </p>
          </div>
        </div>
        <div className=" mx-auto mb-auto  w-full  overflow-scroll bg-secondary-color">
          {messageList?.messages?.map((messageContent, idx) => (
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
        </div>
        <div className="absolute right-1/2 bottom-0 mb-3 w-[95%] translate-x-1/2 rounded-full border border-gray-300 bg-secondary-color ">
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
      </ScrollToBottom>
    </div>
  );
}
