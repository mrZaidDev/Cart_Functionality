import React from "react";
import { Link } from "react-router-dom";
import {ShoppingCart} from 'lucide-react'


const Navbar = () => {
  return (
    <nav className="flex items-center justify-between  px-3 py-3 mb-7" >
      {/* Logo */}
      <h1 className="font-bold" >SToRE</h1>
      {/* Links */}
      <ul className="flex gap-5" >
        <Link to="/">
          <li className="font-semibold" >Products</li>
        </Link>
        <Link to="/cart">
          <li><ShoppingCart /></li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
