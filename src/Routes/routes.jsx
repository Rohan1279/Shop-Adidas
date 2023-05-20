import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Contact from "../Pages/Contact";
import Dashboard from "../Pages/Dashboard/SellerDashboard/Dashboard";
import CategoryPorducts from "../Pages/Home/CategoryPorducts";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import ProductDetail from "../Pages/Products/ProductDetail";
import Cart from "../Pages/Cart/Cart";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import SellerRoute from "./SellerRoute/SellerRoute";

const AddProduct = lazy(() =>
  import("../Pages/Dashboard/SellerDashboard/AddProduct/AddProduct")
);
const MyProducts = lazy(() =>
  import("../Pages/Dashboard/SellerDashboard/MyProducts/MyProducts")
);
const EditProduct = lazy(() =>
  import("../Pages/Dashboard/SellerDashboard/EditProduct/EditProduct")
);

import MyBuyers from "../Pages/Dashboard/SellerDashboard/MyBuyers/MyBuyers";
import DashboardLayout from "../Layout/DashboardLayout";
import Loader from "../components/Loader/Loader";

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
  {
    path: "/dashboard",
    // ! user Protected routes here if needed
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: (
          <SellerRoute>
            <Dashboard />
          </SellerRoute>
        ),
      },
      {
        path: "addproduct",
        element: (
          <SellerRoute>
            <AddProduct />
          </SellerRoute>
        ),
      },
      {
        path: "myproducts",
        element: (
          <SellerRoute>
            <MyProducts />
          </SellerRoute>
        ),
        children: [
          {
            path: "edit/:id",
            // loader
            element: <EditProduct />,
          },
        ],
      },
      {
        path: "mybuyers",
        element: (
          <SellerRoute>
            <MyBuyers />
          </SellerRoute>
        ),
      },
    ],
  },
]);
export default router;
