import { useState } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { TbSettings } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function Nav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-end sm:justify-between items-center max-w-xs w-full mx:justify-around py-4 px-6 ">
      <div className="sm:flex max-w-xs w-full mx:justify-around">
        <Link
          to="/inicio"
          className="hidden sm:flex items-end justify-center font-semibold h-full w-full sm:text-xl hover:text-amber-400 transition"
        >
          Inicio
        </Link>

        <div className="relative flex justify-center items-end sm:w-autO">
          <div
            className="hidden sm:flex items-center space-x-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <p className="font-semibold sm:text-xl text-gray-800 hover:text-amber-400 transition cursor-default">
              Perfil
            </p>
          </div>
          <button
            className="block sm:hidden font-semibold text-xl text-gray-800"
            onClick={toggleMenu}
          >
            <FaBars />
          </button>

          {/* Menú desplegable */}
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute top-full left-1/2 transform -translate-x-1/2 w-40 bg-white shadow-lg rounded-lg z-10"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col items-center mt-2">
                <FaUserCircle className="text-xl text-gray-400" />
                <p className="font-semibold text-base text-gray-500 hover:text-sky-400 transition cursor-default mt-1">
                  Usuario
                </p>
              </div>
              <div className="mt-2">
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
    </div>
  );
}
