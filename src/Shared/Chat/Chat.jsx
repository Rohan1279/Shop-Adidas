import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../contexts/ContextProvider";

function Chat() {
  const { authInfo } = useContext(Context);
  const { logOut, user, isBuyer, isSeller, userRole } = authInfo;
  const [showChat, setShowChat] = useState(false);
  const location = useLocation();
  // console.log(location?.pathname);
  const joinroom = () => {
    console.log("here");
    setShowChat(!showChat);
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
          onClick={joinroom}
          className={`rounded-full bg-primary-color p-2 shadow-nm active:shadow-nm-inset `}
        >
          <img
            src="https://img.icons8.com/?size=512&id=3OmLPsSUeBdX&format=png"
            alt=""
            className="h-12 w-12 "
          />
        </div>
        <div
          className={`absolute bottom-20  right-0 h-96 w-96 bg-blue-200 ${
            showChat && "hidden"
          }`}
        >
          ads
        </div>
      </div>
    </div>
  );
}

export default Chat;
