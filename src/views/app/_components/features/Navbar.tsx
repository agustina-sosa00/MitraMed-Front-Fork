import React, { useState } from "react";
import { IconType } from "react-icons/lib";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";

import { Link, useNavigate } from "react-router-dom";
interface IProp {
  logo: string;
  buttons: { name: string; icon: IconType; link: string }[];
}
export const Navbar: React.FC<IProp> = ({ logo, buttons }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("accessProfessional");
    navigate("/");
  };
  return (
    <div className="fixed top-0 z-50 block w-full lg:hidden ">
      <nav className="bg-gray-200 ">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-14" alt="MitraMed Logo" />
          </a>
          <button
            type="button"
            onClick={handleOpenMenu}
            className="inline-flex items-center justify-center w-10 h-10 text-sm rounded-lg text-primaryBlue lg:hidden "
          >
            {openMenu ? <IoClose className="text-4xl" /> : <FiMenu className="text-3xl" />}
          </button>
        </div>
      </nav>
      {openMenu && (
        <div
          className="absolute z-50 flex items-start justify-end w-full gap-2 "
          id="navbar-default"
        >
          <div className="flex flex-col items-start justify-start w-1/3 pt-5 pb-20 bg-gray-200 md:w-1/4 rounded-b-md ">
            {" "}
            {buttons.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="flex items-center justify-end gap-2   py-1 w-[90%] text-lg md:text-xl font-medium text-primaryBlue capitalize rounded cursor-pointer hover:text-primaryGreen"
              >
                {item.name}
              </Link>
            ))}
            <button
              className="flex items-center justify-end gap-2   py-1 w-[90%] text-lg md:text-xl font-medium text-primaryGreen capitalize rounded cursor-pointer hover:text-primaryGreen"
              onClick={handleLogout}
            >
              cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
