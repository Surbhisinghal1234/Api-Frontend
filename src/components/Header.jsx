import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import img from "../assets/images.png"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className=" mx-auto px-2 sm:px-6 lg:px-20 py-2">
        <div className="relative flex items-center justify-between h-16">
            <div className='flex justify-between  md:hidden'>     
        <div className="flex-shrink-0">
              <Link to="/" className="text-white text-lg font-bold">
              <img src={img} alt="" className='h-12 w-12 rounded-full'/>
              </Link>
            </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none    "
              onClick={toggleMenu}
            >
                <div>
                <HiMenuAlt3   className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`} />
                </div>
                <div>
                <MdOutlineRestaurantMenu className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`} />
                </div>
            </button>
          </div>
          </div>
          <div className="flex-1 flex items-center justify-between ">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white hidden md:flex text-lg font-bold">
              <img src={img} alt="" className='h-12 w-12 rounded-full'/>
              </Link>
            </div>
            <div className="hidden sm:flex sm:ml-6 ">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-white hover:bg-white hover:text-black px-3 py-2 rounded-md  font-medium"
                >
                 Post Products
                </Link>
               
                <Link
                  to="/featuredProducts"
                  className="text-white hover:bg-white hover:text-black px-3 py-2 rounded-md font-medium"
                >
                 Featured Products
                </Link>
                <Link
                  to="/getProducts"
                  className="text-white hover:bg-white hover:text-black px-3 py-2 rounded-md  font-medium"
                >
                 Get Products
                </Link>
                <Link
                  to="/contact"
                  className="text-white hover:bg-white hover:text-black px-3 py-2 rounded-md  font-medium"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="text-white hover:bg-white hover:text-black block px-3 py-2 rounded-md text-base font-medium" >
           Post Products
          </Link>
        
          <Link
            to="/featuredProducts"
            className="text-white hover:bg-white hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Featured Products
          </Link>
          <Link
            to="/getProducts"
            className="text-white hover:bg-white hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Get Products
          </Link>
          <Link
            to="/contact"
            className="text-white hover:bg-white hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
