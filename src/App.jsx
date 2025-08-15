import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import BackToTopButton from './components/BackToTopButton';
import CategorySidebar from './components/CategorySidebar';
import ProductViewPage from './components/ProductViewPage';
import Wishlist from './components/Wishlist';
import {Outlet, RouterProvider} from "react-router-dom";
import {router} from "./routes/approutes.jsx";
import Ecomm from './E-comm';
import LandingPage from './components/LandingPage';


function App() {
  return <RouterProvider router={router}/>
}




export default App;