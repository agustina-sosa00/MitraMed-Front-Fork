import { useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Nav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const nombreUsuario = localStorage.getItem("nombreUsuario") || "Usuario";

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-end w-full gap-2 ">
      <Link to="/inicio" className="">
        <button className="hidden px-4 py-2 transition-all duration-200 border-2 md:flex border-green rounded-xl text-green hover:bg-green hover:text-white">
          Inicio
        </button>
      </Link>

      <div className="relative flex items-end justify-center sm:w-autO">
        <div
          className="items-center hidden space-x-2 sm:flex hover:cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className="px-4 py-2 transition-all duration-200 border-2 border-green rounded-xl text-green hover:bg-green hover:text-white">
            Perfil
          </p>
        </div>
        <button
          className="block text-xl font-semibold text-green sm:hidden"
          onClick={toggleMenu}
        >
          <FaBars />
        </button>

        {/* Menú desplegable */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute z-10 w-40 transform -translate-x-1/2 bg-white rounded-lg shadow-lg top-full left-1/2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-col items-center mt-2">
              <FaUserCircle className="text-xl text-gray-400 xl:text-3xl" />
              <p className="mt-1 text-base font-semibold text-gray-500 transition cursor-default xl:text-xl hover:text-greenHover">
                {nombreUsuario}
              </p>
            </div>
            <div className="mt-2">
              <Link
                to="/"
                className="block px-4 pt-3 transition text-blue hover:text-greenHover"
              >
                <div className="flex items-center text-sm xl:text-base">
                  <FaHouse className="mr-2" />
                  Inicio
                </div>
              </Link>
              <Link
                to="/configuracion"
                className="block px-4 pt-3 transition text-blue hover:text-greenHover"
              >
                <div className="flex items-center text-sm xl:text-base">
                  <IoMdSettings className="mr-2" />
                  Configuración
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-4 text-left transition text-blue hover:text-greenHover"
              >
                <div className="flex items-center text-sm xl:text-base">
                  <PiSignOutBold className="mr-2" />
                  Cerrar sesión
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
