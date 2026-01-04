import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return(
    <div className="my-5 mx-5" >
      <Navbar/>
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </div>
  )
};

export default App;
