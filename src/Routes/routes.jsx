import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Contact from "../Pages/Contact";
import Dashboard from "../Pages/Dashboard";
import CategoryPorducts from "../Pages/Home/CategoryPorducts";
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
        loader: () => fetch("http://localhost:5000/products"),
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
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/categories/:id",
        element: <CategoryPorducts />,
      },
    ],
  },
]);
export default router;
