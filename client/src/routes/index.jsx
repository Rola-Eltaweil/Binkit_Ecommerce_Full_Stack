import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Forget_password from "../pages/Forget_password";
import OTP_Verification from "../pages/OTP_Verification";
import Rest_password from "../pages/Rest_password";
import UserMenueMobile from "../pages/UserMenueMobile";
import Profile from "../pages/Loyout/Profile";
import Order from "../pages/Loyout/Order";
import Address from "../pages/Loyout/Address";
import Layout_Dashboard from "../pages/Loyout/Layout_Dashboard";
import Product from "../pages/Product";
import UploadProduct from "../pages/Product/UploadProduct";
import Category from "../pages/category/Category";
import { DataAdmin } from "./AdminRoute";
import NotFound from "../components/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";
import Subcategory from "../pages/Subcategories/Subcategory";
import CategoryDetails from '../pages/CategoryDetails'
import ProductDisplayPage from "../pages/ProductDisplayPage";
import AllproductCategory from "../pages/AllproductCategory";
import ViewCart from "../pages/ViewCart";
import Chaeckoutpage from "../pages/Chaeckoutpage";
import Sucsess from "../pages/Sucsess";
import Cancel from "../pages/Cancel";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "search",
        element: <Search />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forget-password",
        element: <Forget_password />,
      },
      {
        path: "OTP_Verification",
        element: <OTP_Verification />,
      },
      {
        path: "Reset-password",
        element: <Rest_password />,
      },
      {
        path: "user",
        element: <UserMenueMobile />,
      },

      {
        path: "/:categoryname/:categoryid",
        element: <CategoryDetails />,
      },
      {
        path: "/dashboard-profile",
        element: <Layout_Dashboard />,
        children: [
          {
            element: <ProtectedRoute />,
            children: [
              {
                index: true,
                element: <Profile />,
              },
              {
                path: "orders",
                element: <Order />,
              },
              {
                path: "address",
                element: <Address />,
              },
            ],
          },

          {
            element: <DataAdmin />,
            children: [
              {
                path: "category",
                element: <Category />,
              },
              {
                path: "subcategory",
                element: <Subcategory />,
              },
              {
                path: "products",
                element: <Product />,
              },
              {
                path: "upload_product",
                element: <UploadProduct />,
              },
            ],
          },
        ],
      },

      {
        path: "/product/:productId/:productname",
        element: <ProductDisplayPage />,
      },

      {
        path: "/product/:categoryname/:categoryId/:subcategoryname/:subcategoryID",
        element: <AllproductCategory />,
      },
      {
        path: "/cart",
        element: <ViewCart />,
      },
      {
        path: "checkout",
        element: <Chaeckoutpage />,
      },
      {
        path: "success",
        element: <Sucsess />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
    ],
  },
]);

export default router;
