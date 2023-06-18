import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../contexts/ContextProvider";
import { GrEmoji, GrAttachment, GrSend } from "react-icons/gr";
import { IoIosAttach } from "react-icons/io";
import ScrollToBottom from "react-scroll-to-bottom";

// const socket = io.connect("http://localhost:5001");
function Chat({ socket }) {
  const { authInfo } = useContext(Context);
  const { user, isBuyer, isSeller, userRole } = authInfo;
  const location = useLocation();
  const navigate = useNavigate();
  // ! SOCKET.IO
  const [showChat, setShowChat] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // console.log(currentMessage);

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
    console.log("here");
    if (user?.uid && seller_room) {
      socket.emit("join_room", seller_room);
      // setShowChat(true);
    }
  };
  const sendMessage = async () => {
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
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // console.log(data);

      setMessageList((list) => [...list, data]);
      console.log(messageList);
    });
    return () => socket.removeListener("receive_message");
  }, [socket]);
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
              {/* //! MESSAGE */}
              <div className="h-full bg-red-400">
                <ScrollToBottom className="mx-auto h-[180px] max-w-xl  overflow-scroll bg-blue-100/50">
                  {messageList?.map((messageContent, idx) => {
                    return (
                      <div className={` px-5`}>
                        <div
                          className={`w-fit ${
                            user?.email === messageContent?.author
                              ? "ml-auto"
                              : "  "
                          }`}
                        >
                          <p
                            className={`w-fit  max-w-xs break-all rounded-t-2xl px-3 py-1  text-sm font-medium tracking-wider text-gray-500 ${
                              user?.email === messageContent?.author
                                ? "ml-auto rounded-bl-2xl bg-violet-200"
                                : "rounded-br-2xl bg-blue-200"
                            }`}
                          >
                            {messageContent?.message}
                          </p>
                          <div className=" text-xs  text-gray-400">
                            <p className={``}>{messageContent?.time}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </ScrollToBottom>
              </div>
              {/* <div className="mx-auto mb-3 w-[95%] rounded-full border  border-gray-300 py-2 px-2 text-sm  focus:shadow-nm-inset disabled:placeholder:text-gray-300"> */}
              <div className="absolute bottom-0 left-2 mx-auto mb-3 w-[95%] rounded-full border border-gray-300 bg-secondary-color ">
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
