import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Contact from "../Pages/Contact";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
export default router;
