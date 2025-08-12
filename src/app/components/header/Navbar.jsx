"use client";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import Dropdown from "./Dropdown";
const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const menu = [
    { name: "Home", url: "/" },
    {
      name: "Services",
      url: "/",
      dropdown: [
        { name: "Service 1", url: "" },
        { name: "Service 2", url: "" },
        { name: "Service 3", url: "" },
      ],
    },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];
  return (
    <nav className="w-full bg-gray-800 shadow ">
      <div className="justify-between mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between px-4">
            <a href="#" className="">
              <div class="avatar logoParentDiv">
                <div class="w-16 rounded logoParent">
                  {/* <img src="" /> */}
                  <h1 className="text-3xl text-white font-bold logo">VisEng V1 </h1>
                </div>
              </div>
            </a>
            <div className="md:hidden">
              <button
                className="p-6 m-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border navButton"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <RxCross1 className="text-white navButtonIn" />
                ) : (
                  <AiOutlineMenu className="text-white navButtonIn" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3  md:block md:pb-0 md:mt-0 navDrop ${
              navbar ? "block px-4 navDropChange" : "hidden"
            }`}
          >
            <ul className={`items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 ${
              navbar ? "" : "px-8"
            }`}
            >
              {menu.map(({ name, url, dropdown }, index) => (
                <li key={index} className="text-white navDropItem">
                  {dropdown ? (
                    <Dropdown name={name} dropdownItems={dropdown} />
                  ) : (
                    <Link href={url}>{name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;