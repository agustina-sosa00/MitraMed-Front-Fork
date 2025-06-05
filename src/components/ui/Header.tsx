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
  type RolType = "paciente" | "profesional";
  const [currentRol, setCurrentRol] = useState<RolType | undefined>();

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

  const handleOpenDrawer = (rol: RolType) => {
    setCurrentRol(rol);
    setState(true);
  };

  const handleCloseDrawer = () => {
    setState(false);
    setCurrentRol(undefined);
  };

  return (
    <header
      className={` md:py-2  flex justify-center items-center bg-gray-100 h-20 sticky top-0 z-50  ${
        scrolled ? "shadow-md shadow-black/20" : ""
      } `}
    >
      <div className="relative flex items-center justify-between w-full px-10 lg:px-16">
        <div className="flex flex-col items-center justify-center md:flex-row">
          <Link to={`${isLoggedIn ? "/inicio" : "/"}`} className="flex gap-3 ">
            <img
              src="/logos/mitra-med-logo-no-bg.webp"
              alt="logo"
              className="max-w-12 xl:max-w-20 max-h-16 xl:max-h-16"
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
            Estás en <span className="italic font-bold">desarrollo</span>
          </span>
        )}

        {!isLoggedIn ? (
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenDrawer("profesional")}
              className="px-2 py-1 text-xs transition-all duration-200 border rounded lg:text-base lg:px-4 border-green text-green hover:bg-green hover:text-white"
            >
              Profesionales
            </button>
            <button
              onClick={() => handleOpenDrawer("paciente")}
              className="px-2 py-1 text-xs transition-all duration-200 border rounded lg:text-base lg:px-4 border-green text-green hover:bg-green hover:text-white"
            >
              Iniciar sesión
            </button>
          </div>
        ) : (
          <div className="flex ">
            <Nav />
          </div>
        )}

        <Drawer handle={handleCloseDrawer} open={state} rol={currentRol} />
      </div>
    </header>
  );
}
