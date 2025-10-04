// Styles
import "tailwindcss/tailwind.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { createRoot } from "react-dom/client";
import React, { Children } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Ecomm from "./E-comm";
import LoginPage from "./components/LoginPage";
import SignInPage from "./components/SignInPage";
import Checkout from "./components/Checkout";
import AccountPage from "./components/AccountPage";
import AddProduct from "./components/addproduct";
import ComingSoonPage from "./components/ComingSoonPage";
import MyOrdersPage from "./components/Myorders";

import App from "./App";
import Wishlist from "./components/wishlistpage";
import AddressBook from "./components/AddressPage";
import Cart from "./components/Cart";
import AboutUs from "./components/AboutUs";
import FAQPage from "./components/FAQPage";
import ContactUsPage from "./components/ContactUsPage";

export const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/home",
    element: <App />,
    children: [
      {
        path: "",
        element: <Ecomm />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "my-wishlist",
        element: <Wishlist />,
      },
      {
        path: "coming-soon",
        element: <ComingSoonPage />,
      },

      {
        path: "my-orders",
        element: <MyOrdersPage />,
      },
      {
        path: "my-addresses",
        element: <AddressBook />,
      },
      {
        path: "check-out",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "add-products",
    element: <AddProduct />,
  },
  {
    path: "about-us",
    element: <AboutUs />,
  },
  {
    path: "faq",
    element: <FAQPage />,
  },
  {
    path: "contact",
    element: <ContactUsPage />,
  },
  {
    path: "coming-soon",
    element: <ComingSoonPage />,
  },
];

const router = createBrowserRouter(routes);
const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
