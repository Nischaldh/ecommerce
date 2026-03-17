import React from "react";
import { Button } from "@/components/ui/button"
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* logo */}
      <Link to="/">
        <p className="text-xl font-bold w-36">Logo</p>
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p className="hover:text-gray-500">Home</p>
          <hr className="w-4/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/products" className="flex flex-col items-center gap-1">
          <p className="hover:text-gray-500">Products</p>
          <hr className="w-4/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p className="hover:text-gray-500">About Us</p>
          <hr className="w-4/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p className="hover:text-gray-500">Contact</p>
          <hr className="w-4/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      {/* Right Side */}
      <div>
        <NavLink to="/login" className="flex flex-col items-center gap-1">
          <Button variant="outline" className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:text-white transition cursor-pointer">
            Login
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
