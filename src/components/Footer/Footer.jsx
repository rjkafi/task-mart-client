import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 pt-12">
        <div className="flex justify-center items-center"></div>
        <div className="container lg:w-11/12 w-full mx-auto pt-8 pb-[72px] px-5 lg:px-16 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-48">
          <div className="left-side-content flex flex-col gap-2 items-start">
            <Link to={"/"} className="flex items-center gap-2">
              <img className="w-auto h-8" src={logo} alt="" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                TaskMart
              </h2>
            </Link>
            <div class="info flex flex-col gap-2">
              <p class="text-sm text-gray-500 font-medium">
                Location: Dhaka, Bangladesh
              </p>
              <p class="text-sm text-gray-500 font-medium">
                Phone: +8801923478835
              </p>
              <p class="text-sm text-gray-500 font-medium">
                Email: info@yourdomain.com
              </p>
            </div>
            <h3 className="font-semibold mt-2 text-gray-800">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="middle-content flex flex-col items-start lg:mr-16">
            <h3 className="text-gray-800 text-lg font-semibold mb-4">
              Useful Links
            </h3>
            <ul className="flex flex-col gap-2 list-disc ml-6">
              <li>
                <a className="hover:text-gray-800 text-gray-600 font-medium  hover:font-medium cursor-pointer">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-gray-800 text-gray-600 font-medium  hover:font-medium cursor-pointer">
                  All Tasks
                </a>
              </li>
              <li>
                <a className="hover:text-gray-800 text-gray-600 font-medium  hover:font-medium cursor-pointer">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-gray-800 text-gray-600 font-medium  hover:font-medium cursor-pointer">
                  Statistics
                </a>
              </li>
              <li>
                <a className="hover:text-gray-800 text-gray-600 font-medium  hover:font-medium cursor-pointer">
                  Task Management
                </a>
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-2 items-start">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Drop a Message
            </h2>
            <label className="input input-bordered flex items-center gap-2 bg-[#FFFFFF05] w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 text-gray-800"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                className="text-white w-full"
                type="text"
                class="grow"
                placeholder="Enter your email"
              />
            </label>
            <div className="subscribe-btn mt-2 w-full">
              <button className="w-full bg-[#0E7A81] border-none rounded-lg px-8 py-3 hover:hover:bg-[#2b6295]">
                <a className=" text-white font-bold" href="#">
                  Subscribe
                </a>
              </button>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="mt-6 text-center text-gray-600 pb-6">
          <p>
            © {new Date().getFullYear()} TaskMart - A Task Management System
            Application. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
