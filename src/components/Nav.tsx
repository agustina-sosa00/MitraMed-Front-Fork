import { useState } from 'react';
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
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="flex max-w-xs w-full justify-around">
      <Link
        to="/inicio"
        className="flex items-end justify-center font-semibold h-full w-full text-2xl hover:text-amber-400 transition"
      >
        Inicio
      </Link>
      <div
        className="flex justify-center w-full h-16 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p className="flex items-end font-semibold h-full text-2xl hover:text-amber-400 transition hover:cursor-default">
          Perfil
        </p>

        {/* Menú desplegable */}
        {isMenuOpen && (
          <div className="absolute mt-16 w-44 bg-white shadow-lg rounded-lg z-10">
            <Link
              to="/configuracion"
              className="block px-4 pt-5 text-gray-800 hover:text-amber-500 transition"
            >
              <div className="flex items-center">
                <TbSettings className="mr-2" />
                Configuración
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-4 text-gray-800 hover:text-amber-500 transition"
            >
              <div className="flex items-center">
                <RiLogoutBoxLine className="mr-2" />
                Cerrar sesión
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
