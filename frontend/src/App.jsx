import React from 'react';
import {Outlet, RouterProvider} from "react-router-dom";
import {router} from "./routes/approutes.jsx";

function App() {
  return <RouterProvider router={router}/>
}




export default App;