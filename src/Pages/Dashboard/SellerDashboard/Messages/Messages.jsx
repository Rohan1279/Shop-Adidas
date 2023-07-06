import { io } from "socket.io-client";
import { Context } from "../../../../contexts/ContextProvider";
import { Fragment, useContext, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { GrEmoji, GrSend } from "react-icons/gr";
import { FiSend, FiMenu } from "react-icons/fi";
import { FaEllipsisV } from "react-icons/fa";
import { IoIosAttach } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";
import Modal from "../../../../components/Modal/Modal";
import { toast } from "react-hot-toast";
import Loader from "../../../../components/Loader/Loader";
import Cookies from "js-cookie";
const socket = io.connect(`${import.meta.env.VITE_SERVER_URL}`);

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
  const { authInfo } = useContext(Context);
  const { user, isBuyer, isSeller, userRole } = authInfo;
  const seller_room = user?.email; //replace with seller_id
  const [messageList, setMessageList] = useState({});
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isReportModalOpen, setIsReportedModalOpen] = useState(false);
  const [isClearChatModalOpen, setIsClearChatModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentBuyer, setCurrentBuyer] = useState({});
  const [isChatLoading, setIsChatLoading] = useState(false);
  const { data: buyersList = [], refetch } = useQuery({
    queryKey: ["buyersList", user?.email],
    queryFn: () => {
      if (user?.email) {
        return fetch(
          `${import.meta.env.VITE_SERVER_URL}/seller/messages?seller=${
            user?.email
          }`
        ).then((res) => res.json());
        // .then((data) => console.log(data));
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: "always",
  });
  useEffect(() => {
    console.log(messageList?.messages?.length);
    socket.on("chat_history/seller", (chats) => {
      // console.log(chats[0]);
      setMessageList(chats[0]);
      setIsChatLoading(false);
    });
    socket.on("receive_message", (data) => {
      // console.log("receive_message", data?.room);
      refetch();
      if (data?.room === currentRoom?.room) {
        setMessageList(data);
      }
    });
    return () => socket.off("receive_message");
  }, [messageList]);
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [currentRoom]);

  const joinroom = (buyer) => {
    if (user?.email && buyer?.room) {
      setIsChatLoading(true);
      setCurrentRoom(buyer);
      setCurrentBuyer({});
      socket.emit("join_room/seller", { room: buyer?.room });
      // socket.on("chat_history/seller", (chats) => {
      //   // console.log(chats[0]);
      //   setMessageList(chats[0]);
      //   setIsChatLoading(false);
      // });
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
      // console.log(updatedMessageList);
      setCurrentMessage("");
    }
  };
  const handleConfirmReport = () => {
    setIsReportedModalOpen(false);
    toast.success("User reported");
  };
  const handleConfirmClearChat = () => {
    setIsClearChatModalOpen(false);
    toast.success("Conversation cleared successfully!");
  };
  const handleViewBuyer = () => {
    // console.log(currentRoom?.buyer);
    fetch(
      `${import.meta.env.VITE_SERVER_URL}/seller/buyerDetail?email=${
        currentRoom?.buyer
      }`,
      {
        headers: {
          authorization: `bearer ${Cookies.get('shop-adidas-token')}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setCurrentBuyer(data?.user));
  };
  window.addEventListener("mousedown", (e) => {
    if (e.target.closest(".dropdown")) {
      // when clicked inside
      return;
    } else {
      // when clicked outside
      if (!e.target.closest(".dropdown-button")) {
        setIsDropdownOpen(false);
      }
    }
  });
  return (
    <div className=" min-h-screen px-32 pt-28">
      <div className="flex gap-x-7">
        {/* //! BUYERS' LIST */}
        <div className="h-[48rem] w-96 flex-col overflow-scroll rounded-lg shadow-nm md:hidden lg:flex ">
          {/* //! SEARCH BOX */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className=" flex h-14 items-center bg-primary-color px-2 shadow-sm"
          >
            <input
              type={"text"}
              placeholder={"search a product"}
              className=" w-full rounded-full border border-zinc-300 bg-secondary-color p-2 text-center text-sm focus:shadow-nm-inset focus:outline-none disabled:placeholder:text-gray-300 "
            />
          </form>
          {buyersList?.map((buyer, idx) => (
            <div
              key={idx}
              onClick={() => joinroom(buyer)}
              className={`w-full cursor-pointer px-4 py-3  hover:bg-zinc-300 ${
                currentRoom?.room === buyer?.room ? "bg-zinc-300" : ""
              } `}
            >
              <div className="flex items-center justify-start gap-x-2 ">
                <img
                  src={
                    buyer?.buyer_image ||
                    "https://cdn0.iconfinder.com/data/icons/user-pictures/100/unknown2-256.png"
                  }
                  alt=""
                  className="h-8 w-8 rounded-full "
                />
                <div>
                  <p className=" text-sm font-thin tracking-wider text-gray-600">
                    {buyer?.buyer}
                  </p>
                  <div className="flex text-xs font-thin tracking-wider text-gray-400">
                    <p className="">
                      {buyer?.messages.author === user?.email ? (
                        <span className="mr-1">You:</span>
                      ) : (
                        ""
                      )}
                    </p>
                    <p className="w-24 truncate ">{buyer?.messages?.message}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ScrollToBottom className="relative h-[48rem] w-full overflow-hidden rounded-lg pb-16  shadow-nm">
          {/* //! CHAT BOX */}
          <div className="absolute top-0 z-50 flex w-full items-center justify-between  bg-sky-300 p-2 pl-2 shadow-sm">
            <div className="flex  items-center justify-start gap-x-2">
              <button>
                <FiMenu className="hover:text-gray-600 active:text-gray-600 md:hidden lg:block"></FiMenu>
              </button>
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
            {/* //! dropdown menu */}
            <FaEllipsisV
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className={`dropdown-button absolute right-5 select-none rounded-full p-2 text-3xl text-zinc-600 transition-all hover:bg-blue-200/50 active:scale-90 ${
                Object.keys(currentRoom).length === 0 && "hidden"
              }`}
            ></FaEllipsisV>

            <Transition
              show={isDropdownOpen}
              enter="transition ease-out duration-100 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="dropdown absolute  right-0 z-50 mt-4 w-48 select-none overflow-hidden rounded-lg bg-secondary-color shadow-lg">
                {/* //! VIEW CONTACT MODAL STARTS*/}
                <Transition appear show={isDetailModalOpen} as={Fragment}>
                  <Dialog
                    open={isDetailModalOpen}
                    className="relative z-10"
                    onClose={() => setIsDetailModalOpen(false)}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div
                        className={`fixed inset-0 bg-secondary-color ${
                          isDetailModalOpen && "opacity-40 "
                        }`}
                      />
                    </Transition.Child>
                    <div className="fixed inset-0 backdrop-blur-xl">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="mx-4 w-full rounded-lg bg-secondary-color p-6 shadow-nm md:mx-0 md:w-1/4 lg:w-1/4">
                            <div className="text-center">
                              <div className="flex w-full items-center justify-between">
                                <p className="text-center text-xs font-thin tracking-wider text-gray-500 ">
                                  Active Status
                                </p>
                                <button className="h-6 w-6 rounded-full text-gray-500 shadow-nm">
                                  X
                                </button>
                              </div>
                              <img
                                className="mx-auto mt-10 mb-5 h-32 w-32 rounded-full bg-yellow-300"
                                src={
                                  "https://img.icons8.com/?size=512&id=13042&format=png"
                                }
                                alt=""
                              />
                              <p className="text-center text-2xl font-thin tracking-wider text-gray-500 ">
                                John Doe
                              </p>
                              <p className="text-center text-xs font-thin tracking-wider text-gray-500 ">
                                {currentBuyer?.email}
                              </p>
                              <span className="text-center text-xs font-thin tracking-wider text-lime-600 ">
                                Last active: 2m ago
                              </span>
                              <div className="my-5 mx-7 text-left text-sm font-thin tracking-wider text-gray-500 ">
                                <p className="my-2 flex flex-row">
                                  <span className="basis-2/5">Address:</span>{" "}
                                  <span className="basis-3/5">
                                    3611 Buck Drive, West Valley City, Utah
                                  </span>
                                </p>
                                <p className="my-2 flex flex-row">
                                  <span className="basis-2/5">
                                    Delivery address:
                                  </span>
                                  <span className="basis-3/5">
                                    3611 Buck Drive, West Valley City, Utah
                                  </span>
                                </p>
                                <p className="my-2 flex flex-row">
                                  <span className="basis-2/5 ">Contact:</span>{" "}
                                  <span className="basis-auto ">
                                    +8801234567891
                                  </span>
                                </p>
                              </div>
                              <button className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-700 active:shadow-nm-inset">
                                Block Contact
                              </button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>

                {/* //! VIEW CONTACT MODAL ENDS*/}
                <button
                  onClick={() => {
                    setIsDetailModalOpen(!isDetailModalOpen);
                    handleViewBuyer();
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  View contact
                </button>

                <Modal
                  isOpen={isClearChatModalOpen}
                  setIsOpen={setIsClearChatModalOpen}
                  confirmButtonText={"Clear"}
                  confirmMessage={"Are you sure to clear this conversation?"}
                  // data={{ name: currentRoom?.buyer }}
                  closeModal={handleConfirmClearChat}
                />

                <button
                  onClick={() => setIsClearChatModalOpen(!isClearChatModalOpen)}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Clear chat
                </button>

                <Modal
                  isOpen={isReportModalOpen}
                  setIsOpen={setIsReportedModalOpen}
                  confirmButtonText={"Confirm"}
                  confirmMessage={"Are you sure to report this user?"}
                  data={{ name: currentRoom?.buyer }}
                  closeModal={handleConfirmReport}
                />
                <button
                  onClick={() => setIsReportedModalOpen(!isReportModalOpen)}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Report contact
                </button>
              </div>
            </Transition>
          </div>

          {isChatLoading ? (
            <div className="flex h-screen w-full items-center justify-center">
              <Loader></Loader>
            </div>
          ) : (
            <div className=" mx-auto mt-14 mb-auto  w-full  overflow-scroll bg-secondary-color">
              <Transition
                show={Object.keys(currentRoom).length === 0}
                appear={true}
                enter="transition-all duration-500 "
                enterFrom="opacity-0 "
                enterTo="opacity-100 "
                leave="transition-all duration-500 "
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div
                  className={` absolute left-1/2 top-1/2  flex  -translate-y-1/2 -translate-x-1/2 select-none flex-col items-center  justify-center ${
                    Object.keys(currentRoom).length !== 0 && "hidden"
                  }`}
                >
                  <img
                    src="https://img.icons8.com/?size=512&id=13724&format=png"
                    className="h-24 w-24"
                    alt=""
                  />
                  <p className="text-center text-base font-thin tracking-wider text-gray-500 ">
                    Select a customer to continue conversation
                  </p>
                </div>
              </Transition>
              {messageList?.messages?.map((messageContent, idx) => (
                <Transition
                  key={idx}
                  show={Object.keys(currentRoom).length !== 0}
                  appear={true}
                  enter="transition-all duration-300"
                  enterFrom="opacity-0 "
                  enterTo="opacity-100"
                  leave="transition-all duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0 "
                >
                  <div className={`X px-3`}>
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
                          style={{ wordBreak: "break-all" }}
                          className={`mt-2 w-fit max-w-md  rounded-3xl  px-3 py-2 text-sm font-thin tracking-wider text-gray-500 ${
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
                </Transition>
              ))}
            </div>
          )}
          <div
            className={`absolute right-1/2 bottom-0 mb-3 w-[95%] translate-x-1/2 rounded-full border border-gray-300 bg-secondary-color ${
              Object.keys(currentRoom).length === 0 && "hidden"
            }`}
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
                className="relative w-full rounded-full bg-secondary-color py-3 pr-12 pl-3 text-center  text-sm focus:shadow-nm-inset focus:outline-none disabled:placeholder:text-gray-300 "
              />
              {currentMessage ? (
                <button onClick={sendMessage} className="absolute right-6">
                  <FiSend className="text-lg text-zinc-500"></FiSend>
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
    </div>
  );
}
