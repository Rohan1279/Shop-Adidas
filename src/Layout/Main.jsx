import React, {
  Suspense,
  createContext,
  lazy,
  useContext,
  useEffect,
  useState,
} from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Context } from "../contexts/ContextProvider";
import Navbar from "../Shared/Navbar";
import { dataLoader } from "../utils/dataLoader";
import { getStoredCart } from "../utils/fakeDB";
import Footer from "../Shared/Footer";
const Chat = lazy(() => import("../Shared/Chat/Chat"));
// import Chat from "../Shared/Chat/Chat";
import { io } from "socket.io-client";
import Loader from "../components/Loader/Loader";
import Cookies from "js-cookie";
// import Chat from "../Shared/Chat/Chat";

export const CartContext = createContext();
// console.log(import.meta.env.VITE_SERVER_URL);
const socket = io.connect(`${import.meta.env.VITE_SERVER_URL}`);
const Main = () => {
  const location = useLocation();
  const { products } = dataLoader();


  const storedProducts = getStoredCart(); //! products with id
  const initialCart = [];
  for (const _id in storedProducts) {
    const foundProduct = products?.find((product) => product._id === _id);
    if (foundProduct) {
      foundProduct.quantity = storedProducts[_id][0];
      foundProduct.size = storedProducts[_id][1];
      initialCart.push(foundProduct);
    }
  }
  // console.log(initialCart);
  const [cart, setCart] = useState(initialCart);

  const [contactSeller, setContactSeller] = useState({});
  useEffect(() => {
    if (!location?.pathname.includes("/products/product")) {
      setContactSeller({});
      console.log("not in detail page");
    }
  }, [location]);

  //
  return (
    <CartContext.Provider value={[cart, setCart, initialCart]}>
      <div className="relative h-fit bg-secondary-color  ">
        <Navbar />

        {/* <Suspense
          fallback={
            <div className="flex h-screen w-full items-center">
              <Loader></Loader>
            </div>
          }
        >
          <div
            className={`z-0 w-screen  overflow-x-scroll transition-all duration-300 ease-in-out`}
          >
            <Outlet context={[contactSeller, setContactSeller]} />
          </div>
        </Suspense> */}
        <Outlet context={[contactSeller, setContactSeller]} />

        <Chat
          socket={socket}
          contactSeller={contactSeller}
          setContactSeller={setContactSeller}
        />
      </div>
    </CartContext.Provider>
  );
};

export default Main;

// q; what is ssl certificate?
// a: ssl certificate is a digital certificate that authenticates the identity of a website and encrypts information sent to the server using SSL technology. Encryption is the process of scrambling data into an undecipherable format that can only be returned to a readable format with the proper decryption key.
// q: what is ssl?
// a: SSL stands for Secure Sockets Layer, a global standard security technology that enables encrypted communication between a web browser and a web server. It is utilized by millions1 of online businesses and individuals to decrease the risk of sensitive information (e.g., credit card numbers, usernames, passwords, emails, etc.) from being stolen or tampered with by hackers and identity thieves. In essence, SSL allows for a private “conversation” just between the two intended parties.
