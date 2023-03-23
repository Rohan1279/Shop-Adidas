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
import AddProduct from "../Pages/Dashboard/SellerDashboard/AddProduct/AddProduct";
import MyProducts from "../Pages/Dashboard/SellerDashboard/MyProducts/MyProducts";
import MyBuyers from "../Pages/Dashboard/SellerDashboard/MyBuyers/MyBuyers";
import DashboardLayout from "../Layout/DashboardLayout";

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
        path: "/dashboard",
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
