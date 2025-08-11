import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface IProp {
  logo: string;
  buttons: { name: string; icon: IconType; link: string; disabled: boolean }[];
}

export const SideBar: React.FC<IProp> = ({ logo, buttons }) => {
  const navigate = useNavigate();
  const data = Cookies.get("dataProfessional");
  const dataUser = data ? JSON.parse(data) : null;
  const usuario = Cookies.get("usuario");
  const handleLogout = () => {
    Cookies.remove("accessProfessional");
    navigate("/");
  };
  return (
    <nav className="flex-col justify-between hidden w-56 h-screen lg:flex">
      <section className="flex flex-col justify-between h-full bg-gray-200 ">
        {/* BOX 1 */}
        <div className="flex  pl-8 items-center h-[10%] ">
          <img src={logo} alt="logo" className="" />
        </div>
        <div className="flex justify-center w-full">
          <div className="w-[80%] bg-blue h-[1px] "></div>
        </div>
        {/* BOX 2 */}

        <div className="flex flex-col  w-full gap-3 pl-5 py-5 h-[65%] ">
          {buttons.map((item) => (
            <Link key={item.name} to={item.link}>
              <button
                disabled={item.disabled}
                className={`flex items-center gap-2 pl-5  py-1 w-[90%] text-lg font-medium  capitalize rounded ${
                  item.disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-green hover:text-white text-blue cursor-pointer transition-all duration-300 "
                } `}
              >
                <item.icon className="" />
                {item.name}
              </button>
            </Link>
          ))}
        </div>
        <div className="flex justify-center w-full">
          <div className="w-[80%] bg-blue h-[1px] "></div>
        </div>
        {/* BOX 3 */}

        <div className="flex flex-col  w-full gap-3  items-center py-5    h-[20%]  ">
          <div className="flex items-center justify-start gap-2 text-blue ">
            <FaUserCircle className="text-xl xl:text-3xl" />{" "}
            {usuario ? (
              <p>Sta. {dataUser?.nombre}</p>
            ) : (
              <p>
                Dr. {dataUser?.ndoctor} {dataUser?.adoctor}
              </p>
            )}
          </div>
          <p className="text-sm ">
            ¿Quieres{" "}
            <span
              onClick={handleLogout}
              className="font-bold transition-all duration-300 cursor-pointer hover:text-green "
            >
              cerrar sesión
            </span>
            ?{" "}
          </p>
        </div>
      </section>
    </nav>
  );
};
