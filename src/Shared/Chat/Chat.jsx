import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../contexts/ContextProvider";

function Chat() {
  const { authInfo } = useContext(Context);
  const { logOut, user, isBuyer, isSeller, userRole } = authInfo;

  const location = useLocation();
  console.log(location?.pathname);
  return (
    <div
      className={`fixed bottom-8 right-8 bg-red-500 ${
        user
          ? "block"
          : location?.pathname.includes("/products/product")
          ? "block"
          : "hidden"
      }`}
    >
      Chat
    </div>
  );
}

export default Chat;
