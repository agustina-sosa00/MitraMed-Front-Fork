import React from "react";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";
interface IProp {
  logo: string;
  buttons: { name: string; icon: IconType; link: string }[];
}

export const SideBar: React.FC<IProp> = ({ logo, buttons }) => {
  return (
    <nav className="flex-col justify-between h-screen rounded w-60">
      <div className="h-full bg-white border-r-2 border-lightGray ">
        <div className="flex justify-center ">
          <img src={logo} alt="logo" className=" w-[90%]  " />
        </div>
        <div className="w-full border border-greenFocus "></div>
        <div className="flex flex-col w-full gap-3 px-3 py-3">
          {buttons.map((item) => (
            <Link
              to={item.link}
              className="flex items-center gap-1 px-2 py-1 text-lg font-medium capitalize rounded cursor-pointer text-blue hover:bg-green hover:text-white"
            >
              <item.icon />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
