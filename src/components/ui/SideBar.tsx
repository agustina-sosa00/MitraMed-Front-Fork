import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { Link, useNavigate } from "react-router-dom";
interface IProp {
  logo: string;
  buttons: { name: string; icon: IconType; link: string }[];
}

export const SideBar: React.FC<IProp> = ({ logo, buttons }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };
  return (
    <nav className="flex-col justify-between h-screen rounded w-60">
      <section className="flex flex-col justify-between h-full bg-gray-200 ">
        {/* BOX 1 */}
        <div className="flex  pl-8 items-center h-[10%] ">
          {/* <h2 className="px-2 py-5 text-lg font-bold tracking-wider uppercase text-blue">
            Panel <br /> <span className=""> Profesional </span>
          </h2> */}
          <img src={logo} alt="logo" className="" />
        </div>
        <div className="flex justify-center w-full">
          <div className="w-[80%] bg-blue h-[1px] "></div>
        </div>
        {/* BOX 2 */}

        <div className="flex flex-col  w-full gap-3 pl-5 py-5 h-[65%] ">
          {buttons.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="flex items-center gap-2 pl-5  py-1 w-[90%] text-lg font-medium text-blue capitalize rounded cursor-pointer hover:bg-green hover:text-white"
            >
              <item.icon className="" />
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex justify-center w-full">
          <div className="w-[80%] bg-blue h-[1px] "></div>
        </div>
        {/* BOX 3 */}

        <div className="flex flex-col  w-full gap-3 pl-10 py-5    h-[20%]  ">
          <div className="flex items-center justify-start gap-2 text-blue ">
            <FaUserCircle className="text-xl xl:text-3xl" />{" "}
            <p>Dr. Juan Lopez</p>
          </div>
          <p className="text-sm ">
            ¿Quieres{" "}
            <span
              onClick={handleLogout}
              className="font-bold cursor-pointer hover:text-green"
            >
              cerrar sesión{" "}
            </span>
            ?{" "}
          </p>
        </div>
      </section>
    </nav>
  );
};
