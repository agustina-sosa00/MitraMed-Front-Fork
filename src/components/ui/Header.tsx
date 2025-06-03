import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { Drawer } from "../features/DrawerLogin/Drawer";

interface IProp {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Header({ state, setState }: IProp) {
  const isLoggedIn = Cookies.get("accessToken") && Cookies.get("refreshToken");
  const isDevelopment = import.meta.env.VITE_ENV === "development";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenDrawer = () => {
    setState(!state);
  };

  return (
    <header
      className={` md:py-2  flex justify-center items-center bg-gray-100 h-20 sticky top-0 z-30  ${
        scrolled ? "shadow-md shadow-black/20" : ""
      } `}
    >
      <div className="relative flex items-center justify-between w-full px-5">
        <div className="flex flex-col items-center justify-center p-2 gap md:flex-row">
          <Link
            to={`${isLoggedIn ? "/inicio" : "/"}`}
            className="flex gap-3 mx-3"
          >
            <img
              src="/logos/mitra-med-logo-no-bg.webp"
              alt="logo"
              className="max-w-20 xl:max-w-32 max-h-16 xl:max-h-16"
            />
          </Link>
          <div className="items-center hidden md:flex">
            <img
              src="/logos/mitra-med-letras_no-bg1.webp"
              alt="logo-letras"
              className="max-w-44 max-h-44 xl:max-w-lg xl:max-h-lg xl:w-56 xl:h-14"
            />
          </div>
        </div>

        {isDevelopment && (
          <span className="px-2 py-1 font-semibold text-blue-500 rounded-md bg-slate-300">
            Estás en <span className="italic font-bold">Desarrollo</span>
          </span>
        )}

        {!isLoggedIn ? (
          // <div className="flex items-center justify-center h-12 px-3 bg-gray-100 border border-gray-400 md:px-10 xl:h-16 md:text-lg xl:text-xl">
          //   Tel: +54 9 351 633-0700
          // </div>
          <button
            onClick={handleOpenDrawer}
            className="px-4 py-2 transition-all duration-200 border-2 border-green rounded-xl text-green hover:bg-green hover:text-white"
          >
            Iniciar sesión
          </button>
        ) : (
          <div className="flex w-40 justify-evenly sm:w-80 lg:mr-20">
            <Nav />
          </div>
        )}

        <Drawer handle={handleOpenDrawer} open={state} />
      </div>
    </header>
  );
}
