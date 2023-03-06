import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Contact from "../Pages/Contact";
import Dashboard from "../Pages/Dashboard";
import CategoryPorducts from "../Pages/Home/CategoryPorducts";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import ProductDetail from "../Pages/Products/ProductDetail";
import Cart from "../Pages/Cart/Cart";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

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
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/categories/:id",
        element: <CategoryPorducts />,
      },
      {
        path: "/products/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Register />,
      },
    ],
  },
]);
export default router;
