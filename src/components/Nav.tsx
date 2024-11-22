import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { TbSettings } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
  };

  return (
    <div className="flex max-w-xs w-full mx:justify-around">
      <Link
        to="/inicio"
        className="flex items-end justify-center font-semibold h-full w-full mx:text-xl hover:text-amber-400 transition"
      >
        Inicio
      </Link>

      <div
        className="flex justify-center items-end w-auto relative "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center space-x-2">
          <p className="font-semibold mx:text-xl text-gray-800 hover:text-amber-400 transition hover:cursor-default">
            Perfil
          </p>
        </div>

        {/* Menú desplegable */}
        {isMenuOpen && (
          <div className="absolute top-7 w-44 bg-white shadow-lg rounded-lg z-10">
            <div className="flex flex-col items-center mt-2">
              <FaUserCircle className="text-xl text-gray-400" />
              <p className="font-semibold text-base text-gray-500 hover:text-sky-400 transition hover:cursor-default mt-1">
                Usuario
              </p>
            </div>
            <div className="mt-2 ml-1">
              <Link
                to="/configuracion"
                className="block px-4 pt-3 text-gray-800 hover:text-amber-500 transition"
              >
                <div className="flex items-center text-sm">
                  <TbSettings className="mr-2" />
                  Configuración
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-4 text-gray-800 hover:text-amber-500 transition"
              >
                <div className="flex items-center text-sm">
                  <RiLogoutBoxLine className="mr-2" />
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
