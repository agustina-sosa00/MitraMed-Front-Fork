import { FaUserCircle } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { IoSettingsSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import Cookies from "js-cookie";
import { useOdontogramContext } from "../../context/OdontogramContext";
import TextAlert from "./TextAlert";
import { useMedicalHistoryContext } from "../../context/MedicalHistoryContext";

interface IProp {
  logo: string;
  buttons: { name: string; icon: IconType; link: string; disabled: boolean }[];
}

interface DataProfessional {
  nombre?: string;
  adoctor?: string;
  ndoctor?: string;
}

export const SideBar: React.FC<IProp> = ({ logo, buttons }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    setDniOdontogram,
    setOriginalData,
    setTeethIdsState,
    setHasConfirmed,
    setUiLoading,
    setDniInput,
  } = useOdontogramContext();
  const { setDniHistory, setDniInput: setDniHistoryInput } =
    useMedicalHistoryContext();
  const raw = Cookies.get("dataProfessional");
  const dataUser: DataProfessional | null = raw ? JSON.parse(raw) : null;
  const usuario = Cookies.get("usuario");
  const idProfesional = Cookies.get("idProfesional");

  const handleLogout = () => {
    setDniOdontogram("");
    setOriginalData({});
    setTeethIdsState({});
    setHasConfirmed(false);
    setUiLoading(false);
    setDniInput("");
    setDniHistory("");
    setDniHistoryInput("");
    Cookies.remove("accessProfessional");
    Cookies.remove("accessTokenDropbox");
    Cookies.remove("app_id_dropbox");
    Cookies.remove("app_secret_dropbox");
    Cookies.remove("refresh_token_dropbox");
    navigate("/");
  };

  return (
    <nav className="flex-col justify-between hidden w-56 h-screen lg:flex">
      <section className="flex flex-col items-center justify-between h-full bg-gray-200">
        {/* BOX 1 */}
        <div className="flex items-center  h-[10%]">
          <img src={logo} alt="logo" />
        </div>

        <div className="flex justify-center w-full">
          <div className="w-[80%] bg-blue h-[1px]" />
        </div>

        {/* BOX 2 */}
        <div className="flex flex-col w-full gap-3 pl-5 py-5 h-[65%]">
          {buttons.map((item) => {
            const isActive = location.pathname === item.link;
            return (
              <Link key={item.name} to={item.link}>
                <button
                  disabled={item.disabled}
                  className={`flex items-center gap-2 pl-5 py-1 w-[90%] text-lg font-medium capitalize rounded ${
                    item.disabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-green hover:text-white text-blue cursor-pointer transition-all duration-300"
                  } ${isActive ? "bg-green text-white" : ""} `}
                >
                  <item.icon />
                  {item.name}
                </button>
              </Link>
            );
          })}
          {idProfesional && (
            <Link to={"/profesionales/configuracion"}>
              <button
                className={`flex items-center gap-2 pl-5 py-1 w-[90%] text-lg font-medium capitalize rounded 
                
                  hover:bg-green hover:text-white text-blue cursor-pointer transition-all duration-300 `}
              >
                {" "}
                <IoSettingsSharp /> Configuración{" "}
              </button>
            </Link>
          )}
        </div>

        <TextAlert />

        <div className="flex justify-center w-full">
          <div className="w-[80%] bg-blue h-[1px]" />
        </div>

        {/* BOX 3 */}
        <div className="flex flex-col items-center w-full gap-3 py-5 h-[20%]">
          <div className="flex items-center justify-start gap-2 text-blue">
            <FaUserCircle className="text-xl xl:text-3xl" />
            {usuario ? (
              <p>Sta. {dataUser?.nombre}</p>
            ) : (
              <p>
                Dr. {dataUser?.ndoctor} {dataUser?.adoctor}
              </p>
            )}
          </div>
          <p className="text-sm">
            ¿Quieres{" "}
            <span
              onClick={handleLogout}
              className="font-bold transition-all duration-300 cursor-pointer hover:text-green"
            >
              Cerrar Sesión
            </span>
            ?
          </p>
        </div>
      </section>
    </nav>
  );
};
