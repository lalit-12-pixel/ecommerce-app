import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Ecomm from "../E-comm";
import LoginPage from "../components/LoginPage";
import SignInPage from "../components/SignInPage";
import AccountPage from "../components/AccountPage";
import AddProduct from "../components/addproduct";
import ComingSoonPage from "../components/ComingSoonPage";
import MyOrdersPage from "../components/Myorders";

export const router = createBrowserRouter([

    {
        path: "/",
        element: <LandingPage />,
    },

    {
        path: "/home",
        element: <Ecomm />,
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
        path: "/account",
        element: <AccountPage />,
    },
    {
        path: "/coming-soon",
        element: <ComingSoonPage />,
    },
    {
        path: "/add-products",
        element: <AddProduct />,
    },
     {
        path: "/my-orders",
        element: <MyOrdersPage />,
    },
]);