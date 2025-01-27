import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Nav from './Nav';

export default function Header() {
  const isLoggedIn = Cookies.get('accessToken') && Cookies.get('refreshToken');
  const isDevelopment = import.meta.env.VITE_ENV === 'development';

  return (
    <header
      className={`pt-5 md:py-2 bg-gradient-to-b from-gray-100 to-transparent ${
        isLoggedIn ? '' : 'shadow-lg'
      } `}
    >
      <div className="flex justify-around  items-center w-full">
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 p-2">
          <Link to={`${isLoggedIn ? '/inicio' : '/'}`} className="mx-3 flex gap-3">
            <img
              src="/logos/mitra-med-logo-no-bg.webp"
              alt="logo"
              className="max-w-20 xl:max-w-32 max-h-20 xl:max-h-32"
            />
          </Link>
          <div className="hidden md:flex items-center">
            <img
              src="/logos/mitra-med-letras_no-bg1.webp"
              alt="logo-letras"
              className="max-w-44 max-h-44 xl:max-w-lg xl:max-h-lg xl:w-56 xl:h-14"
            />
          </div>
        </div>

        {isDevelopment && (
          <span className="text-blue-500 font-semibold bg-slate-300 px-2 py-1 rounded-md">
            Estás en <span className="italic font-bold">Desarrollo</span>
          </span>
        )}

        {!isLoggedIn ? (
          <div className="flex justify-center items-center px-3 md:px-10 h-12 xl:h-16 md:text-lg xl:text-xl border border-gray-400 bg-gray-100">
            Tel: +54 9 351 633-0700
          </div>
        ) : (
          <div className="flex justify-evenly w-40 sm:w-80 lg:mr-20">
            <Nav />
          </div>
        )}
      </div>
    </header>
  );
}
