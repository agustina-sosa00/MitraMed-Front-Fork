import { FaUserCircle, FaChevronRight } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { useOdontogramContext } from "../../../../context/OdontogramContext";
import { useMedicalHistoryContext } from "../../../../context/MedicalHistoryContext";
import { useInformeTurnosStore } from "../informes/informeTurnos/store/informeTurnosStore";

interface ISubItem {
  key: string;
  name: string;
  link: string;
  disabled: boolean;
  description: string;
}

interface IProp {
  logo: string;
  isDisabled?: boolean; // Nueva prop para controlar si todo el sidebar está deshabilitado
  buttons: {
    key: string;
    name: string;
    icon: IconType;
    link: string;
    disabled: boolean;
    isDropdown?: boolean;
    subItems?: ISubItem[];
  }[];
}

interface DataProfessional {
  nombre?: string;
  adoctor?: string;
  ndoctor?: string;
}

export default function SideBar({ logo, buttons, isDisabled = false }: IProp) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const {
    setDniOdontogram,
    setOriginalData,
    setTeethIdsState,
    setHasConfirmed,
    setUiLoading,
    setDniInput,
  } = useOdontogramContext();
  const { setDniHistory, setDniInput: setDniHistoryInput } = useMedicalHistoryContext();
  const { clearInformeTurnosData } = useInformeTurnosStore();
  const raw = Cookies.get("dataProfessional");
  const dataUser: DataProfessional | null = raw ? JSON.parse(raw) : null;
  const tusuario = localStorage.getItem("mtm-tusuario");

  // --- Lógica de visibilidad de botones ---
  const mainButtons = buttons.filter((btn) => !["usuarios", "configuracion"].includes(btn.key));

  const usuariosButtons = buttons.filter((btn) => btn.key === "usuarios");
  const configButtons = buttons.filter((btn) => btn.key === "configuracion");

  const showUsuarios = tusuario === "4" || tusuario === "5";
  const showConfig = tusuario === "5";

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  function handleLogout() {
    setDniOdontogram("");
    setOriginalData({});
    setTeethIdsState({});
    setHasConfirmed(false);
    setUiLoading(false);
    setDniInput("");
    setDniHistory("");
    setDniHistoryInput("");
    clearInformeTurnosData(); // Limpiar store de informeTurnos
    // Limpiar localStorage desde _tu para abajo
    const keysToRemove = [
      "_tu",
      "_iddoc",
      "_idprof",
      "mtm-tusuario",
      "mtm-iddoctor",
      // Agrega aquí cualquier otra clave que quieras limpiar
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    Cookies.remove("accessProfessional");
    Cookies.remove("accessTokenDropbox");
    Cookies.remove("app_id_dropbox");
    Cookies.remove("app_secret_dropbox");
    Cookies.remove("refresh_token_dropbox");
    navigate("/");
  }

  return (
    <nav className="flex-col justify-between hidden w-56 h-screen lg:flex">
      <section className="flex flex-col items-center justify-between h-full bg-gray-200">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="logo" />
        </div>

        {/* Divider */}
        <div className="flex justify-center w-full mb-2">
          <div className="w-[80%] bg-primaryBlue h-[1px]" />
        </div>

        {/* Navegacion */}
        <div className="flex flex-col w-full gap-1.5 pl-1 h-[65%]">
          {mainButtons.map((item) => {
            if (item.isDropdown && item.subItems) {
              // Botón desplegable
              const isOpen = openDropdowns.includes(item.key);
              const hasActiveSubItem = item.subItems.some(
                (subItem) => location.pathname === subItem.link,
              );

              return (
                <div key={item.key}>
                  {/* Botón principal del desplegable */}
                  <button
                    onClick={() => toggleDropdown(item.key)}
                    disabled={item.disabled}
                    className={`group flex items-center justify-between w-[90%] text-start gap-1 pl-2 py-1 text-lg font-medium rounded ${
                      item.disabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-greenHover hover:text-white text-primaryBlue cursor-pointer transition-all duration-300"
                    } ${hasActiveSubItem ? "bg-primaryGreen text-white" : ""}`}
                  >
                    <div className="flex items-center gap-1">
                      <item.icon />
                      {item.name}
                    </div>
                    <FaChevronRight
                      className={`text-xs mr-2 transform transition-all duration-200 ${
                        isOpen ? "rotate-90" : ""
                      } ${
                        hasActiveSubItem ? "text-white" : "text-gray-500 group-hover:text-white"
                      }`}
                    />
                  </button>

                  {/* Subitems */}
                  {isOpen && (
                    <div className="mt-1 ml-4">
                      {item.subItems.map((subItem) => {
                        const isActiveSubItem = location.pathname === subItem.link;
                        return (
                          <Link key={subItem.key} to={subItem.link}>
                            <button
                              disabled={subItem.disabled}
                              className={`flex items-center w-[85%] text-start gap-1 pl-4 py-1 text-base font-medium rounded ${
                                subItem.disabled
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "hover:bg-greenHover hover:text-white text-primaryBlue cursor-pointer transition-all duration-300"
                              } ${isActiveSubItem ? "bg-primaryGreen text-white" : ""}`}
                            >
                              • {subItem.name}
                            </button>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            } else {
              // Botón normal
              const isActive = location.pathname === item.link;
              return (
                <Link key={item.name} to={item.link}>
                  <button
                    disabled={item.disabled}
                    className={`flex items-center w-[90%] text-start gap-1 pl-2 py-1  text-lg font-medium  rounded ${
                      item.disabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-greenHover hover:text-white text-primaryBlue cursor-pointer transition-all duration-300"
                    } ${isActive ? "bg-primaryGreen text-white" : ""} `}
                  >
                    <item.icon />
                    {item.name}
                  </button>
                </Link>
              );
            }
          })}
        </div>

        {/* Config - Botones de Admin */}
        {/* Usuarios - Solo para gerente y admin */}
        {showUsuarios && usuariosButtons.length > 0 && (
          <div className="w-full">
            {usuariosButtons.map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <Link key={item.name} to={item.link} className="block w-full py-1 pl-5">
                  <button
                    type="button"
                    className={`flex items-center text-start gap-2 pl-2 py-1 w-[90%] text-lg font-medium rounded transition-all duration-300 ${
                      item.disabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-primaryBlue hover:bg-greenHover hover:text-white cursor-pointer"
                    } ${isActive ? "bg-primaryGreen text-white" : ""}`}
                    disabled={item.disabled}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </button>
                </Link>
              );
            })}
          </div>
        )}

        {/* Configuración - Solo para admin */}
        {showConfig && configButtons.length > 0 && (
          <div className="w-full">
            {configButtons.map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <Link key={item.name} to={item.link} className="block w-full py-1 pl-5">
                  <button
                    type="button"
                    className={`flex items-center text-start gap-2 pl-2 py-1 w-[90%] text-lg font-medium rounded transition-all duration-300 ${
                      item.disabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-primaryBlue hover:bg-greenHover hover:text-white cursor-pointer"
                    } ${isActive ? "bg-primaryGreen text-white" : ""}`}
                    disabled={item.disabled}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </button>
                </Link>
              );
            })}
          </div>
        )}

        {/* Divider */}
        <div className="flex justify-center w-full">
          <div className="w-[80%] bg-primaryBlue h-[1px]" />
        </div>

        {/* Log Out */}
        <div className="flex flex-col items-center w-full gap-3 pt-5 h-[20%]">
          <div className="flex items-center justify-start gap-2 text-primaryBlue">
            <FaUserCircle className="text-xl xl:text-3xl" />
            {(() => {
              if (tusuario === "2" || tusuario === "5") return <p>{dataUser?.nombre}</p>;
              if (["1", "3", "4", "5"].includes(tusuario || ""))
                return (
                  <p>
                    Dr. {dataUser?.ndoctor} {dataUser?.adoctor}
                  </p>
                );
              return null;
            })()}
          </div>

          <p className="text-sm">
            ¿Quieres{" "}
            <span
              onClick={isDisabled ? undefined : handleLogout}
              className={`font-bold transition-all duration-300 ${
                isDisabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "cursor-pointer hover:text-primaryGreen"
              }`}
            >
              Cerrar Sesión
            </span>
            ?
          </p>
        </div>
      </section>
    </nav>
  );
}
