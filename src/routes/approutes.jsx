import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Ecomm from "../E-comm";
import LoginPage from "../components/LoginPage";
import SignInPage from "../components/SignInPage";
import AccountPage from "../components/AccountPage";

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
]);
