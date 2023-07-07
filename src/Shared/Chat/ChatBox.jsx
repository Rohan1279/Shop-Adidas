import { Transition } from "@headlessui/react";
import {
  GrDown,
  GrEmoji,
  GrFormNext,
  GrFormPrevious,
  GrSend,
} from "react-icons/gr";
import { IoIosAttach } from "react-icons/io";
import { TbMailOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";

export default function ChatBox({
  showChat,
  setShowChat,
  user,
  isSellerListVisible,
  setIsSellerListVisible,
  sellerList,
  joinroom,
  currentRoom,
  setCurrentRoom,
  messageList,
  setMessageList,
  sendMessage,
  currentMessage,
  setCurrentMessage,
  contactSeller,
  setContactSeller,
}) {
  const navigate = useNavigate();
  return (
    <div className="">
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
          //   className={`
          // h-screen
          //  w-screen   -translate-y-12  overflow-hidden
          // rounded-xl  bg-secondary-color  shadow-nm md:absolute
          // md:bottom-20 md:-right-0 md:h-[26rem] md:w-96 md:translate-y-0`}
          className="h-screen  w-screen  overflow-hidden rounded-xl bg-secondary-color shadow-nm
          md:h-[26rem] md:w-96"
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
                className={` flex w-full  items-center justify-start gap-x-2 bg-primary-color pl-2 pt-2 pb-2 shadow-sm
             ${isSellerListVisible && "hidden"}
            `}
              >
                <div
                  onClick={() => {
                    setIsSellerListVisible(true);
                    setCurrentRoom({});
                  }}
                  className=" flex cursor-pointer flex-row items-center justify-between"
                >
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
                <GrDown
                  onClick={() => setShowChat(false)}
                  className="ml-auto mr-3"
                ></GrDown>
              </div>
              {/* //! SELLER LIST */}
              <div
                className={` bg-primary-color  ${
                  !isSellerListVisible && "hidden"
                } `}
              >
                {/* <div className="mx-4"> */}
                <div className="flex items-center justify-evenly  py-2 shadow-sm">
                  <p className="basis-full bg-primary-color text-center  text-lg font-medium  tracking-wide text-gray-600">
                    Messages
                  </p>
                  <GrDown
                    onClick={() => setShowChat(false)}
                    className="absolute right-3 text-lg"
                  ></GrDown>
                </div>
                {/* </div> */}
                {sellerList?.length !== 0 ? (
                  sellerList?.map((seller, idx) => (
                    <div
                      key={idx}
                      onClick={() => joinroom(seller)}
                      className={`w-full cursor-pointer px-4 py-3  hover:bg-zinc-300
                    
                    ${!isSellerListVisible && "hidden"}
                    ${
                      Object.keys(currentRoom).length !== 0
                        ? currentRoom?.room === seller?.room && "bg-zinc-300"
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
                className={`fixed bottom-4 left-2 mx-auto mb-3 w-[95%] rounded-full border border-gray-300 bg-secondary-color md:sticky 
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
      </Transition>
    </div>
  );
}
