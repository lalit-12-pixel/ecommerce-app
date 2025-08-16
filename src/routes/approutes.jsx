import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Ecomm from "../E-comm";
import LoginPage from "../components/LoginPage";
import SignInPage from "../components/SignInPage";
import AccountPage from "../components/AccountPage";
// 1. Import the ComingSoonPage component
import ComingSoonPage from "../components/ComingSoonPage";

export const router = createBrowserRouter([
    //landing page
    {
        path: "/",
        element: <LandingPage />,
    },
    //e-comm - home page
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
    // 2. Add the new route for the coming soon page
    {
        path: "/coming-soon",
        element: <ComingSoonPage />,
    },
]);