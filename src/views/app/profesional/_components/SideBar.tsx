import { FaUserCircle, FaChevronRight } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useOdontogramContext } from "../../../../context/OdontogramContext";
import { useMedicalHistoryContext } from "../../../../context/MedicalHistoryContext";
import { useInformeTurnosStore } from "../informes/informeTurnos/store/informeTurnosStore";
import { useTurnosGeneralesStore } from "../turnos/turnosGenerales/store/turnosGeneralesStore";
import { IoLogOut } from "react-icons/io5";
import SubMenuSidebar from "./SubMenuSidebar";

interface ISubItem {
  key: string;
  name: string;
  link: string;
  disabled: boolean;
  description: string;
}

interface IProp {
  logo: string;
  isDisabled?: boolean;
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
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);

  const {
    setDniOdontogram,
    setOriginalData,
    setTeethIdsState,
    setHasConfirmed: setHasConfirmedOdontogram,
    setUiLoading,
    setDniInput,
    setOdontogramaData,
  } = useOdontogramContext();

  const {
    setDniHistory,
    setDniInput: setDniHistoryInput,
    setDataPaciente,
    setHasConfirmed: setHasConfirmedHistory,
  } = useMedicalHistoryContext();

  const { setDiaSeleccionado } = useTurnosGeneralesStore();
  const { clearInformeTurnosData } = useInformeTurnosStore();

  const raw = Cookies.get("dataProfessional");
  const dataUser: DataProfessional | null = raw ? JSON.parse(raw) : null;
  const tusuario = localStorage.getItem("mtm-tusuario");

  // visibilidad por rol
  const mainButtons = buttons.filter((btn) => !["usuarios", "configuracion"].includes(btn.key));
  const usuariosButtons = buttons.filter((btn) => btn.key === "usuarios");
  const configButtons = buttons.filter((btn) => btn.key === "configuracion");
  const showUsuarios = tusuario === "4" || tusuario === "5";
  const showConfig = tusuario === "5";

  // acordeón de menús
  const toggleDropdown = (key: string) => {
    setOpenSubMenu(false);
    setOpenDropdowns((prev) => (prev[0] === key ? [] : [key]));
  };

  useEffect(() => {
    setOpenDropdowns([]);
    setOpenSubMenu(false);
  }, [location.pathname]);

  // opcional: si cambiás de ruta, cerrá submenú
  useEffect(() => {
    setOpenSubMenu(false);
  }, [location.pathname]);

  function handleLogout() {
    setDniOdontogram("");
    setOdontogramaData(null);
    setOriginalData({});
    setTeethIdsState({});
    setHasConfirmedOdontogram(false);
    setHasConfirmedHistory(false);
    setUiLoading(false);
    setDniInput("");
    setDniHistory("");
    setDniHistoryInput("");
    setDataPaciente(null);
    clearInformeTurnosData();
    setDiaSeleccionado("");

    const keysToRemove = ["_tu", "_iddoc", "_idprof", "mtm-tusuario", "mtm-iddoctor"];
    keysToRemove.forEach((key) => localStorage.removeItem(key));

    Cookies.remove("accessProfessional");
    Cookies.remove("accessTokenDropbox");
    Cookies.remove("app_id_dropbox");
    Cookies.remove("app_secret_dropbox");
    Cookies.remove("refresh_token_dropbox");

    navigate("/");
  }

  function handleOpenSubMenu() {
    setOpenDropdowns([]);
    setOpenSubMenu((prev) => !prev);
  }
  const userAreaActive = [...usuariosButtons, ...configButtons].some(
    (b) => location.pathname === b.link || location.pathname.startsWith(b.link + "/"),
  );

  return (
    <>
      {/* SIDEBAR */}
      <nav className="relative z-50 flex-col justify-between hidden w-56 h-screen lg:flex">
        <section className="flex flex-col items-center justify-between w-full h-full bg-white">
          <div className="flex flex-col items-center w-full gap-2">
            {/* Logo */}
            <div className="flex items-center">
              <img src={logo} alt="logo" />
            </div>

            {/* Divider */}
            <div className="flex justify-center w-full">
              <div className="w-[80%] bg-primaryBlue h-[1px]" />
            </div>

            {/* Navegación */}
            <div className="flex flex-col items-center w-full gap-3 h-[65%]">
              {mainButtons.map((item) => {
                if (item.isDropdown && item.subItems) {
                  const heigth = window.innerHeight;
                  const isOpen = openDropdowns.includes(item.key);
                  const hasActiveSubItem = item.subItems.some(
                    (subItem) => location.pathname === subItem.link,
                  );

                  return (
                    <div key={item.key} className="flex flex-col items-center w-full gap-2">
                      <button
                        onClick={() => toggleDropdown(item.key)}
                        disabled={item.disabled}
                        className={`group flex items-center justify-between w-[90%] text-start gap-1 pl-2 py-1 text-base font-medium rounded ${
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
                            item.disabled
                              ? "text-gray-400"
                              : hasActiveSubItem
                                ? "text-white"
                                : "text-primaryBlue group-hover:text-white"
                          }  `}
                        />
                      </button>

                      {isOpen && (
                        <SubMenuSidebar
                          setOpenSubMenu={() => toggleDropdown(item.key)}
                          menuPosition={heigth / 2}
                        >
                          <div className="flex flex-col w-[200px] py-3 gap-3 px-4 bg-white rounded rounded-tl-none rounded-bl-none ">
                            {item.subItems.map((subItem) => {
                              const isActiveSubItem = location.pathname === subItem.link;
                              return (
                                <Link
                                  key={subItem.key}
                                  to={subItem.link}
                                  onClick={() => {
                                    setOpenDropdowns([]);
                                    setOpenSubMenu(false);
                                  }}
                                  className="flex w-full "
                                >
                                  <button
                                    disabled={subItem.disabled}
                                    className={`flex items-center text-start gap-1 px-2 py-1 w-full text-base font-medium rounded ${
                                      subItem.disabled
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "hover:bg-greenHover hover:text-white text-primaryBlue cursor-pointer transition-all duration-300"
                                    } ${isActiveSubItem ? "bg-primaryGreen text-white" : ""}`}
                                  >
                                    {subItem.name}
                                  </button>
                                </Link>
                              );
                            })}
                          </div>
                        </SubMenuSidebar>
                      )}
                    </div>
                  );
                } else {
                  const isActive = location.pathname === item.link;
                  return (
                    <Link
                      key={item.name}
                      to={item.link}
                      onClick={() => setOpenDropdowns([])}
                      className="flex justify-center w-full"
                    >
                      <button
                        disabled={item.disabled}
                        className={`flex items-center w-[90%] text-start gap-1 pl-2 py-1 text-base font-medium rounded ${
                          item.disabled
                            ? "text-gray-400 cursor-not-allowed"
                            : "hover:bg-greenHover hover:text-white text-primaryBlue cursor-pointer transition-all duration-300"
                        } ${isActive ? "bg-primaryGreen text-white" : ""}`}
                      >
                        <item.icon />
                        {item.name}
                      </button>
                    </Link>
                  );
                }
              })}
            </div>
          </div>

          {/* Botón usuario (abre submenú) */}
          <div className="flex flex-col items-center w-full gap-1.5 py-3">
            <div className="flex justify-center w-full">
              <button
                type="button"
                className={`flex items-center justify-between text-start gap-2 pl-2 py-1 w-[90%] text-base font-medium rounded transition-all duration-300 ${
                  isDisabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-primaryBlue hover:bg-greenHover hover:text-white cursor-pointer"
                } ${openSubMenu || userAreaActive ? "bg-primaryGreen text-white" : ""}`}
                disabled={isDisabled}
                onClick={isDisabled ? undefined : handleOpenSubMenu}
              >
                <div className="flex items-center gap-2">
                  <FaUserCircle className="w-5 h-5" />
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
                <FaChevronRight className="mr-2 text-xs transition-all duration-200 transform" />
              </button>
            </div>
          </div>
        </section>
      </nav>

      {/* OVERLAY + SUBMENÚ (fuera del <nav>) */}
      {openSubMenu && (
        <SubMenuSidebar setOpenSubMenu={setOpenSubMenu} menuPosition={"bottom-0"}>
          <div className="w-[200px] bg-white gap-4 flex flex-col py-3 rounded-md rounded-tl-none rounded-bl-none rounded-br-none shadow-lg">
            {/* Usuarios */}
            {showUsuarios && usuariosButtons.length > 0 && (
              <div className="w-full">
                {usuariosButtons.map((item) => {
                  const isActive = location.pathname === item.link;
                  return (
                    <Link key={item.name} to={item.link} className="flex justify-center w-full">
                      <button
                        type="button"
                        className={`flex items-center text-start gap-2 pl-2 py-1 w-[90%] text-base font-medium rounded transition-all duration-300 ${
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

            {/* Config */}
            {showConfig && configButtons.length > 0 && (
              <div className="w-full">
                {configButtons.map((item) => {
                  const isActive = location.pathname === item.link;
                  return (
                    <Link key={item.name} to={item.link} className="flex justify-center w-full">
                      <button
                        type="button"
                        className={`flex items-center text-start gap-2 pl-2 py-1 w-[90%] text-base font-medium rounded transition-all duration-300 ${
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

            {/* Logout */}
            <div className="flex justify-center w-full">
              <button
                type="button"
                className={`flex items-center text-start gap-2 pl-2 py-1 w-[90%] text-base font-medium rounded transition-all duration-300 ${
                  isDisabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-primaryBlue hover:bg-greenHover hover:text-white cursor-pointer"
                }`}
                disabled={isDisabled}
                onClick={isDisabled ? undefined : handleLogout}
              >
                <IoLogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </SubMenuSidebar>
      )}
    </>
  );
}
