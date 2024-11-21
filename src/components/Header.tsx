import Logo from './Logo';
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
        <div className="">
          <Logo />
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
