import React from "react";
import {createBrowserRouter} from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Ecomm from "../E-comm";


export const router =  createBrowserRouter([
    //landing page
    {
        path:"/",
        element: <LandingPage/>,

    },
    //e-comm - home pagenpm run dev
    {
        path:"/home",
        element: <Ecomm/>

    }
    

]);