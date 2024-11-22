import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Nav from './Nav';

export default function Header() {
  const isLoggedIn = Cookies.get('accessToken');

  return (
    <header
      className={`pt-5 md:py-2 bg-gradient-to-b from-gray-100 to-transparent ${
        isLoggedIn ? '' : 'shadow-lg'
      } `}
    >
      <div className="flex justify-between items-center mx-5 md:mx-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 p-2 ">
          <Link to={`${isLoggedIn ? '/inicio' : '/'}`} className="mx-3 flex gap-3">
            <img src="/logos/mitra-med-logo-no-bg.webp" alt="logo" className="max-w-20 max-h-20" />
          </Link>
          <div className="hidden md:flex items-center">
            <img
              src="/logos/mitra-med-letras_no-bg1.webp"
              alt="logo-letras"
              className="max-w-44 max-h-44"
            />
          </div>
        </div>

        {!isLoggedIn && (
          <div className="flex justify-center items-center px-3 md:px-10 h-12 md:text-lg border border-gray-400 bg-gray-100">
            Tel: +9 54 999 9999 99
          </div>
        )}

        {isLoggedIn && (
          <div className="flex justify-evenly max-w-xl w-full ">
            <Nav />
          </div>
        )}
      </div>
    </header>
  );
}
